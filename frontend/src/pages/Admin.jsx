import { useState, useEffect } from 'react'
import { Plus, Trash2, Edit2, Check, X, LogOut } from 'lucide-react'
import { apiUrl } from '../lib/api'

const CATEGORIES = ['bio', 'career', 'skills', 'projects', 'interests', 'contact', 'availability']

export default function Admin() {
  const [authed, setAuthed] = useState(false)
  const [keyInput, setKeyInput] = useState('')
  const [apiKey, setApiKey] = useState('')
  const [error, setError] = useState('')

  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(false)
  const [editId, setEditId] = useState(null)
  const [editData, setEditData] = useState({})
  const [addForm, setAddForm] = useState({ category: 'bio', question: '', answer: '' })
  const [addOpen, setAddOpen] = useState(false)
  const [msg, setMsg] = useState('')

  async function login() {
    setLoading(true)
    setError('')
    try {
      const res = await fetch(apiUrl('/admin/knowledge'), {
        headers: { 'x-admin-key': keyInput },
      })
      if (res.ok) {
        setApiKey(keyInput)
        setAuthed(true)
        const data = await res.json()
        setItems(data)
      } else {
        setError('Invalid admin key.')
      }
    } catch {
      setError('Could not connect to backend.')
    }
    setLoading(false)
  }

  async function fetchItems() {
    const res = await fetch(apiUrl('/admin/knowledge'), { headers: { 'x-admin-key': apiKey } })
    const data = await res.json()
    setItems(data)
  }

  async function deleteItem(id) {
    if (!confirm('Delete this entry?')) return
    await fetch(apiUrl(`/admin/knowledge/${id}`), {
      method: 'DELETE',
      headers: { 'x-admin-key': apiKey },
    })
    flash('Entry deleted.')
    fetchItems()
  }

  async function saveEdit(id) {
    await fetch(apiUrl(`/admin/knowledge/${id}`), {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', 'x-admin-key': apiKey },
      body: JSON.stringify(editData),
    })
    setEditId(null)
    flash('Entry updated.')
    fetchItems()
  }

  async function addItem() {
    if (!addForm.answer.trim()) return
    await fetch(apiUrl('/admin/knowledge'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-admin-key': apiKey },
      body: JSON.stringify(addForm),
    })
    setAddForm({ category: 'bio', question: '', answer: '' })
    setAddOpen(false)
    flash('Entry added! Your chatbot now knows this.')
    fetchItems()
  }

  function flash(m) {
    setMsg(m)
    setTimeout(() => setMsg(''), 3000)
  }

  const grouped = CATEGORIES.reduce((acc, c) => {
    acc[c] = items.filter(i => i.category === c)
    return acc
  }, {})

  if (!authed) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: '#F5F0E8' }}>
        <div className="w-full max-w-sm p-8 rounded-2xl shadow-sm" style={{ background: '#FDFAF4', border: '1px solid #E0D9CC' }}>
          <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-5" style={{ background: '#4F46E5' }}>
            <span className="text-white text-lg">🔑</span>
          </div>
          <h1 className="text-xl font-semibold mb-1" style={{ color: '#1C1917' }}>Admin Panel</h1>
          <p className="text-sm mb-6" style={{ color: '#78716C' }}>Train your AI chatbot with new knowledge.</p>
          {error && <p className="text-sm text-red-500 mb-3">{error}</p>}
          <input
            type="password"
            placeholder="Enter admin key"
            value={keyInput}
            onChange={e => setKeyInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && login()}
            className="w-full px-4 py-3 rounded-xl text-sm outline-none mb-3"
            style={{ background: '#F5F0E8', border: '1px solid #E0D9CC', color: '#1C1917' }}
          />
          <button
            onClick={login}
            disabled={loading}
            className="w-full py-3 rounded-xl text-sm font-medium text-white transition-opacity"
            style={{ background: '#4F46E5', opacity: loading ? 0.7 : 1 }}
          >
            {loading ? 'Checking…' : 'Login'}
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pb-20" style={{ background: '#F5F0E8' }}>
      {/* Header */}
      <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-4 shadow-sm" style={{ background: 'rgba(245,240,232,0.9)', backdropFilter: 'blur(12px)', borderBottom: '1px solid #E0D9CC' }}>
        <div>
          <h1 className="text-lg font-semibold" style={{ color: '#1C1917' }}>Chatbot Knowledge Base</h1>
          <p className="text-xs" style={{ color: '#78716C' }}>{items.length} entries · changes are live instantly</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => setAddOpen(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-white"
            style={{ background: '#4F46E5' }}
          >
            <Plus size={15} /> Add Knowledge
          </button>
          <button onClick={() => setAuthed(false)} className="p-2 rounded-xl" style={{ background: '#EDE8DC' }}>
            <LogOut size={16} style={{ color: '#78716C' }} />
          </button>
        </div>
      </div>

      {msg && (
        <div className="mx-6 mt-4 px-4 py-3 rounded-xl text-sm font-medium" style={{ background: '#dcfce7', color: '#166534', border: '1px solid #bbf7d0' }}>
          ✓ {msg}
        </div>
      )}

      {/* Add form modal */}
      {addOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4" style={{ background: 'rgba(0,0,0,0.3)' }}>
          <div className="w-full max-w-lg rounded-2xl p-6 shadow-xl" style={{ background: '#FDFAF4', border: '1px solid #E0D9CC' }}>
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-semibold" style={{ color: '#1C1917' }}>Add Knowledge Entry</h2>
              <button onClick={() => setAddOpen(false)}><X size={18} style={{ color: '#78716C' }} /></button>
            </div>
            <div className="flex flex-col gap-3">
              <div>
                <label className="text-xs font-medium mb-1 block" style={{ color: '#78716C' }}>Category</label>
                <select
                  value={addForm.category}
                  onChange={e => setAddForm(f => ({ ...f, category: e.target.value }))}
                  className="w-full px-3 py-2 rounded-lg text-sm outline-none"
                  style={{ background: '#F5F0E8', border: '1px solid #E0D9CC', color: '#1C1917' }}
                >
                  {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs font-medium mb-1 block" style={{ color: '#78716C' }}>Question (optional)</label>
                <input
                  type="text"
                  placeholder="e.g. What certifications do you have?"
                  value={addForm.question}
                  onChange={e => setAddForm(f => ({ ...f, question: e.target.value }))}
                  className="w-full px-3 py-2 rounded-lg text-sm outline-none"
                  style={{ background: '#F5F0E8', border: '1px solid #E0D9CC', color: '#1C1917' }}
                />
              </div>
              <div>
                <label className="text-xs font-medium mb-1 block" style={{ color: '#78716C' }}>Answer *</label>
                <textarea
                  rows={4}
                  placeholder="Enter the information your chatbot should know..."
                  value={addForm.answer}
                  onChange={e => setAddForm(f => ({ ...f, answer: e.target.value }))}
                  className="w-full px-3 py-2 rounded-lg text-sm outline-none resize-none"
                  style={{ background: '#F5F0E8', border: '1px solid #E0D9CC', color: '#1C1917' }}
                />
              </div>
              <button
                onClick={addItem}
                className="mt-1 py-2.5 rounded-xl text-sm font-medium text-white"
                style={{ background: '#4F46E5' }}
              >
                Add to Knowledge Base
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Knowledge grouped by category */}
      <div className="max-w-4xl mx-auto px-6 mt-8 flex flex-col gap-8">
        {CATEGORIES.map(cat => (
          grouped[cat].length > 0 && (
            <div key={cat}>
              <h2 className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: '#78716C' }}>
                {cat} ({grouped[cat].length})
              </h2>
              <div className="flex flex-col gap-2">
                {grouped[cat].map(item => (
                  <div key={item.id} className="rounded-xl p-4" style={{ background: '#FDFAF4', border: '1px solid #E0D9CC' }}>
                    {editId === item.id ? (
                      <div className="flex flex-col gap-2">
                        <select
                          value={editData.category}
                          onChange={e => setEditData(d => ({ ...d, category: e.target.value }))}
                          className="px-2 py-1 rounded-lg text-sm outline-none"
                          style={{ background: '#F5F0E8', border: '1px solid #E0D9CC' }}
                        >
                          {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                        </select>
                        <input
                          type="text"
                          value={editData.question || ''}
                          onChange={e => setEditData(d => ({ ...d, question: e.target.value }))}
                          placeholder="Question"
                          className="px-2 py-1 rounded-lg text-sm outline-none"
                          style={{ background: '#F5F0E8', border: '1px solid #E0D9CC' }}
                        />
                        <textarea
                          rows={3}
                          value={editData.answer}
                          onChange={e => setEditData(d => ({ ...d, answer: e.target.value }))}
                          className="px-2 py-1 rounded-lg text-sm outline-none resize-none"
                          style={{ background: '#F5F0E8', border: '1px solid #E0D9CC' }}
                        />
                        <div className="flex gap-2">
                          <button onClick={() => saveEdit(item.id)} className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium text-white" style={{ background: '#4F46E5' }}>
                            <Check size={12} /> Save
                          </button>
                          <button onClick={() => setEditId(null)} className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs" style={{ background: '#EDE8DC', color: '#78716C' }}>
                            <X size={12} /> Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          {item.question && (
                            <p className="text-xs font-medium mb-1" style={{ color: '#4F46E5' }}>Q: {item.question}</p>
                          )}
                          <p className="text-sm leading-relaxed" style={{ color: '#44403C' }}>{item.answer}</p>
                        </div>
                        <div className="flex gap-1 shrink-0">
                          <button
                            onClick={() => { setEditId(item.id); setEditData({ category: item.category, question: item.question, answer: item.answer }) }}
                            className="p-1.5 rounded-lg transition-colors"
                            style={{ background: '#EDE8DC' }}
                          >
                            <Edit2 size={13} style={{ color: '#78716C' }} />
                          </button>
                          <button onClick={() => deleteItem(item.id)} className="p-1.5 rounded-lg" style={{ background: '#fee2e2' }}>
                            <Trash2 size={13} style={{ color: '#dc2626' }} />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )
        ))}
      </div>
    </div>
  )
}
