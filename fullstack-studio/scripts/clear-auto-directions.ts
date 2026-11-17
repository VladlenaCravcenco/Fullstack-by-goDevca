import {getCliClient} from 'sanity/cli'
import {createHash} from 'node:crypto'
import {mkdtempSync, writeFileSync} from 'node:fs'
import {tmpdir} from 'node:os'
import {join} from 'node:path'
import assert from 'node:assert/strict'
async function main() {
 const client=getCliClient({apiVersion:'2025-01-01'}).withConfig({useCdn:false,perspective:'raw'})
 const docs=await client.fetch('*[_type=="project"]')
 const targets=docs.filter((d:any)=>{
  const refs=d.hero?.directionRefs
  if(!refs?.length || !refs.every((r:any)=>r._key===r._ref.slice(-24))) return false
  const h=d.hero
  const old=h.pills?.length?h.pills:h.pillsI18n?.ru||h.pillsI18n?.en||h.pillsI18n?.ro||[]
  const ids=[...new Set(old.filter((v:any)=>typeof v==='string' && v.trim()).map((v:string)=>'projectDirection-'+createHash('sha256').update(v.trim().replace(/^#+/,'').trim().replace(/\s+/g,' ').toLowerCase()).digest('hex')))].sort()
  return JSON.stringify(ids)===JSON.stringify(refs.map((r:any)=>r._ref).sort())
 })
 console.log('Unchanged automatic selections: '+JSON.stringify(targets.map((d:any)=>({id:d._id,title:d.title}))))
 if(process.env.APPLY_CLEAR_AUTO!=='1'||!targets.length)return
 const backup=join(mkdtempSync(join(tmpdir(),'sanity-auto-selection-')),'before.json')
 writeFileSync(backup,JSON.stringify(docs,null,2),{mode:0o600});console.log('Backup: '+backup)
 let tx=client.transaction()
 for(const d of targets)tx=tx.patch(d._id,(p)=>p.ifRevisionId(d._rev).set({'hero.directionRefs':[]}))
 await tx.commit()
 const after=await client.fetch('*[_type=="project"]')
 for(const original of docs){
  const expected=structuredClone(original)
  if(targets.some((d:any)=>d._id===original._id))expected.hero.directionRefs=[]
  const current=after.find((d:any)=>d._id===original._id)
  for(const d of [expected,current]){delete d._rev;delete d._updatedAt}
  assert.deepEqual(current,expected)
 }
 console.log('Verified: only untouched auto-selections cleared; manually changed selections and all other content preserved.')
}
main().catch(e=>{console.error(e.message);process.exitCode=1})
