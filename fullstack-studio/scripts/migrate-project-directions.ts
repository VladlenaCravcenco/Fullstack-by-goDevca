import {getCliClient} from 'sanity/cli'
import {createHash} from 'node:crypto'
import {projectDirections} from '../../shared/projectDirections'

async function main() {
const client = getCliClient({apiVersion: '2025-01-01'}).withConfig({useCdn: false, perspective: 'raw'})
const docs = await client.fetch('*[_type == "project"]{_id, _rev, hero}')
const existing = await client.fetch('*[_type == "projectDirection" && !(_id in path("drafts.**"))]{_id, title}')
const normalize = (value: string) => value.trim().replace(/^#+/, '').trim().replace(/\s+/g, ' ')
const catalog = new Map<string, {_id: string; _type: string; title: string}>(existing.map((d: any) => [normalize(d.title).toLowerCase(), {...d, _type: 'projectDirection'}]))
const patches: Array<{id: string; revision: string; refs: any[]}> = []
for (const doc of docs) {
  if (Array.isArray(doc.hero?.directionRefs)) continue
  const hero = doc.hero || {}
  const values = hero.directions?.length
    ? hero.directions.map((id: string) => projectDirections.find((d) => d.value === id)?.labels.ru || id)
    : (hero.pills?.length ? hero.pills : hero.pillsI18n?.ru || hero.pillsI18n?.en || hero.pillsI18n?.ro || [])
  const ids = new Set<string>()
  for (const raw of values) {
    if (typeof raw !== 'string' || !normalize(raw)) continue
    const title = normalize(raw)
    const key = title.toLowerCase()
    if (!catalog.has(key)) catalog.set(key, {_id: 'projectDirection.' + createHash('sha256').update(key).digest('hex'), _type: 'projectDirection', title})
    ids.add(catalog.get(key)!._id)
  }
  if (ids.size) patches.push({id: doc._id, revision: doc._rev, refs: [...ids].map((_ref) => ({_type: 'reference', _ref, _key: _ref.slice(-24)}))})
}
console.log(JSON.stringify({directions: [...catalog.values()].map((d) => d.title), projectsToUpdate: patches.length, apply: process.env.APPLY_PROJECT_DIRECTIONS === '1'}, null, 2))
if (process.env.APPLY_PROJECT_DIRECTIONS === '1') {
  let transaction = client.transaction()
  for (const direction of catalog.values()) transaction = transaction.createIfNotExists(direction)
  for (const patch of patches) transaction = transaction.patch(patch.id, (p) => p.ifRevisionId(patch.revision).set({'hero.directionRefs': patch.refs}))
  await transaction.commit()
  console.log('Directions saved; existing project tags and publication states preserved.')
}

}
main().catch((error) => {console.error(error.message); process.exitCode = 1})
