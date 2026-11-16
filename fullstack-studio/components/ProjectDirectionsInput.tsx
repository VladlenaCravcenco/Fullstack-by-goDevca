import {useEffect, useState} from 'react'
import {set, useClient, type ArrayOfObjectsInputProps} from 'sanity'

type Direction = {_id: string; title: string}
type Reference = {_type: 'reference'; _ref: string; _key: string}

export default function ProjectDirectionsInput(props: ArrayOfObjectsInputProps) {
  const client = useClient({apiVersion: '2025-01-01'})
  const [options, setOptions] = useState<Direction[]>([])
  const [name, setName] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const selected = (props.value || []) as Reference[]

  useEffect(() => {
    let active = true
    const refresh = () => client.fetch<Direction[]>(
      '*[_type == "projectDirection" && !(_id in path("drafts.**"))] | order(title asc){_id, title}',
      {}, {perspective: 'raw'},
    ).then((items) => {if (active) {setOptions(items); setLoading(false)}})
      .catch(() => {if (active) {setError('Не удалось загрузить направления. Обновите страницу.'); setLoading(false)}})
    void refresh()
    const subscription = client.listen('*[_type == "projectDirection"]').subscribe({next: refresh})
    return () => {active = false; subscription.unsubscribe()}
  }, [client])

  function toggle(id: string) {
    props.onChange(set(selected.some((item) => item._ref === id)
      ? selected.filter((item) => item._ref !== id)
      : [...selected, {_type: 'reference', _ref: id, _key: crypto.randomUUID()}]))
  }

  async function createDirection() {
    const title = name.trim().replace(/^#+/, '').trim().replace(/\s+/g, ' ')
    if (!title || saving) return
    setSaving(true)
    setError('')
    try {
      // Deterministic IDs prevent duplicate directions when editors create the same name.
      const hash = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(title.toLowerCase()))
      const id = 'projectDirection.' + Array.from(new Uint8Array(hash), (b) => b.toString(16).padStart(2, '0')).join('')
      const existing = options.find((item) => item.title.trim().toLowerCase() === title.toLowerCase())
      const direction = existing || await client.createIfNotExists({_id: id, _type: 'projectDirection', title})
      setOptions((items) => items.some((item) => item._id === direction._id) ? items : [...items, direction])
      if (!selected.some((item) => item._ref === direction._id)) {
        props.onChange(set([...selected, {_type: 'reference', _ref: direction._id, _key: crypto.randomUUID()}]))
      }
      setName('')
    } catch {
      setError('Не удалось добавить направление. Проверьте права доступа и попробуйте ещё раз.')
    } finally {setSaving(false)}
  }

  return <div>
    {loading ? <p>Загрузка направлений…</p> : null}
    <div style={{display: 'flex', flexWrap: 'wrap', gap: 12}}>
      {options.map((item) => <label key={item._id} style={{display: 'flex', alignItems: 'center', gap: 8, padding: 12, border: '1px solid #8886', borderRadius: 8, cursor: 'pointer'}}>
        <input type="checkbox" checked={selected.some((ref) => ref._ref === item._id)} disabled={props.readOnly || saving} onChange={() => toggle(item._id)} />
        {item.title}
      </label>)}
    </div>
    {!loading && !options.length ? <p>Пока нет направлений. Добавьте первое ниже.</p> : null}
    <div style={{display: 'flex', gap: 8, marginTop: 16}}>
      <input aria-label="Новое направление" placeholder="Новое направление" value={name} disabled={props.readOnly || saving} onChange={(event) => setName(event.target.value)} style={{flex: 1, minWidth: 0, padding: 10}} />
      <button type="button" disabled={props.readOnly || saving || !name.trim()} onClick={createDirection}>{saving ? 'Добавляем…' : '+ Добавить'}</button>
    </div>
    <p style={{fontSize: 12, opacity: 0.7}}>Новое направление сразу сохранится в общем списке. Выбор для проекта сохранится в его черновике.</p>
    {error ? <p role="alert">{error}</p> : null}
  </div>
}
