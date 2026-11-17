import {getCliClient} from 'sanity/cli'
import {createHash} from 'node:crypto'
import {projectDirections} from '../../shared/projectDirections'

async function main() {
const client = getCliClient({apiVersion: '2025-01-01'}).withConfig({useCdn: false, perspective: 'raw'})
const docs = await client.fetch('*[_type == "project"]{_id, _rev, hero}')
const existing = await client.fetch('*[_type == "projectDirection" && !(_id in path("drafts.**")) && !(_id in path("projectDirection.**"))]{_id, title}')
const normalize = (value: string) => value.trim().replace(/^#+/, '').trim().replace(/\s+/g, ' ')
const catalog = new Map<string, {_id: string; _type: string; title: string}>(existing.map((d: any) => [normalize(d.title).toLowerCase(), {...d, _type: 'projectDirection'}]))
// Import available choices only. Never select directions on the user’s behalf.
for (const doc of docs) {
  const hero = doc.hero || {}
  const values = hero.directions?.length
    ? hero.directions.map((id: string) => projectDirections.find((d) => d.value === id)?.labels.ru || id)
    : (hero.pills?.length ? hero.pills : hero.pillsI18n?.ru || hero.pillsI18n?.en || hero.pillsI18n?.ro || [])
  const ids = new Set<string>()
  for (const raw of values) {
    if (typeof raw !== 'string' || !normalize(raw)) continue
    const title = normalize(raw)
    const key = title.toLowerCase()
    if (!catalog.has(key)) catalog.set(key, {_id: 'projectDirection-' + createHash('sha256').update(key).digest('hex'), _type: 'projectDirection', title})
    ids.add(catalog.get(key)!._id)
  }
}
console.log(JSON.stringify({directions: [...catalog.values()].map((d) => d.title), projectsToUpdate: 0, apply: process.env.APPLY_PROJECT_DIRECTIONS === '1'}, null, 2))
if (process.env.APPLY_PROJECT_DIRECTIONS === '1') {
  let transaction = client.transaction()
  for (const direction of catalog.values()) transaction = transaction.createIfNotExists(direction)
  await transaction.commit()
  console.log('Directions saved; existing project tags and publication states preserved.')
}

}
main().catch((error) => {console.error(error.message); process.exitCode = 1})
