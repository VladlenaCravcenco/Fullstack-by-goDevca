import {createClient} from '@sanity/client'

const client = createClient({
  projectId: '81wvtguf',
  dataset: 'production',
  apiVersion: '2025-01-01',
  useCdn: false,
  token: process.env.SANITY_AUTH_TOKEN,
})

const pickLocalizedValue = (value) => {
  if (!value || typeof value !== 'object') return undefined
  return value.ru || value.en || value.ro
}

const pickLocalizedArray = (value) => {
  const next = pickLocalizedValue(value)
  return Array.isArray(next) ? next : undefined
}

const query = `*[_type == "project"]{
  _id,
  title,
  titleI18n,
  hero,
  mockupBlock
}`

const docs = await client.fetch(query)

const patches = docs
  .map((doc) => {
    const sets = {}

    if (!doc?.title) {
      const nextTitle = pickLocalizedValue(doc?.titleI18n)
      if (nextTitle) sets.title = nextTitle
    }

    if (!Array.isArray(doc?.hero?.pills) || doc.hero.pills.length === 0) {
      const nextPills = pickLocalizedArray(doc?.hero?.pillsI18n)
      if (nextPills?.length) sets['hero.pills'] = nextPills
    }

    if (!doc?.mockupBlock?.agency?.name) {
      const nextName = pickLocalizedValue(doc?.mockupBlock?.agency?.nameI18n)
      if (nextName) sets['mockupBlock.agency.name'] = nextName
    }

    return Object.keys(sets).length ? {id: doc._id, sets} : null
  })
  .filter(Boolean)

if (!patches.length) {
  console.log('No project documents need migration.')
  process.exit(0)
}

console.log(`Migrating ${patches.length} project documents...`)

for (const patch of patches) {
  await client.patch(patch.id).set(patch.sets).commit()
  console.log(`Updated ${patch.id}`, patch.sets)
}

console.log('Migration complete.')
