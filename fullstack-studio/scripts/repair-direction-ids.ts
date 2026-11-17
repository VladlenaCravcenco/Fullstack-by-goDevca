import {getCliClient} from 'sanity/cli'
import {mkdtempSync, writeFileSync} from 'node:fs'
import {tmpdir} from 'node:os'
import {join} from 'node:path'
import assert from 'node:assert/strict'

async function main() {
  const client = getCliClient({apiVersion: '2025-01-01'}).withConfig({useCdn: false, perspective: 'raw'})
  const publicClient = client.withConfig({token: undefined, perspective: 'published'})
  const documents = await client.fetch('*[_type in ["project", "projectDirection"]]')
  const oldDirections = documents.filter((d: any) => d._type === 'projectDirection' && /^projectDirection\./.test(d._id))
  const ids = new Map<string, string>(oldDirections.map((d: any) => [d._id, d._id.replace('projectDirection.', 'projectDirection-')]))
  const projects = documents.filter((d: any) => d._type === 'project' && d.hero?.directionRefs?.some((r: any) => ids.has(r._ref)))
  const beforePublic = await publicClient.fetch('count(*[_type == "projectDirection"])')
  console.log(JSON.stringify({publicDirections: beforePublic, directionsToCopy: oldDirections.length, projectsToRelink: projects.length, apply: process.env.APPLY_DIRECTION_REPAIR === '1'}))
  if (process.env.APPLY_DIRECTION_REPAIR !== '1' || !ids.size) return
  const backupDir = mkdtempSync(join(tmpdir(), 'sanity-direction-repair-'))
  writeFileSync(join(backupDir, 'before.json'), JSON.stringify(documents, null, 2), {mode: 0o600})
  console.log('Backup: ' + join(backupDir, 'before.json'))
  let transaction = client.transaction()
  for (const original of documents.filter((d: any) => d._type === 'projectDirection')) {
    const publishedId = original._id.replace(/^drafts\./, '')
    const newId = ids.get(publishedId)
    if (!newId) continue
    const {_id, _rev, _createdAt, _updatedAt, ...content} = original
    const targetId = _id.startsWith('drafts.') ? 'drafts.' + newId : newId
    const existing = documents.find((d: any) => d._id === targetId)
    if (existing) throw new Error('Target already exists; refusing to overwrite: ' + targetId)
    transaction = transaction.create({...content, _id: targetId})
  }
  for (const project of projects) {
    const refs = project.hero.directionRefs.map((ref: any) => ({...ref, _ref: ids.get(ref._ref) || ref._ref}))
    transaction = transaction.patch(project._id, (p) => p.ifRevisionId(project._rev).set({'hero.directionRefs': refs}))
  }
  await transaction.commit()
  const after = await client.fetch('*[_type == "project"]')
  for (const original of documents.filter((d: any) => d._type === 'project')) {
    const current = after.find((d: any) => d._id === original._id)
    const expected = structuredClone(original)
    if (expected.hero?.directionRefs) expected.hero.directionRefs = expected.hero.directionRefs.map((r: any) => ({...r, _ref: ids.get(r._ref) || r._ref}))
    for (const value of [expected, current]) {delete value._rev; delete value._updatedAt}
    assert.deepEqual(current, expected, 'Unexpected project content change: ' + original._id)
  }
  const publicProjects = await publicClient.fetch('*[_type == "project"]{title, "directions": hero.directionRefs[]->{_id,title}}')
  assert(publicProjects.some((p: any) => p.directions?.some((d: any) => d?.title)), 'Public directions still unresolved')
  console.log(JSON.stringify({publicDirections: await publicClient.fetch('count(*[_type == "projectDirection"])'), projects: publicProjects}, null, 2))
  console.log('Verified: only direction references changed; project content and draft/publication states preserved. Original direction documents retained.')
}
main().catch((e) => {console.error(e.message); process.exitCode = 1})
