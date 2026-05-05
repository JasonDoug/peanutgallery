import { useState, useEffect } from 'react'
import { PersonalityGrid } from '../components/prompt-and-personality-system/PersonalityGrid'
import { PersonalityEditor } from '../components/prompt-and-personality-system/PersonalityEditor'
import type { Personality, PersonalitySystemData } from '../components/prompt-and-personality-system/types'

export default function Prompts() {
  const [data, setData] = useState<PersonalitySystemData | null>(null)
  const [loading, setLoading] = useState(true)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [testOutput, setTestOutput] = useState<string | null>(null)
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/personalities')
        const jsonData = await response.json()
        setData({
          _meta: { models: {}, relationships: [] },
          personalities: jsonData
        })
      } catch (error) {
        console.error('Error fetching personality data:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const handleToggleActive = async (id: string, active: boolean) => {
    if (!data) return
    const personality = data.personalities.find(p => p.id === id)
    if (!personality) return

    try {
      const response = await fetch(`/api/personalities/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...personality, active })
      })
      
      if (response.ok) {
        setData({
          ...data,
          personalities: data.personalities.map(p => 
            p.id === id ? { ...p, active } : p
          )
        })
      }
    } catch (error) {
      console.error('Error updating personality:', error)
    }
  }

  const handleEdit = (id: string) => {
    setEditingId(id)
    setTestOutput(null)
  }

  const handleCreateNew = () => {
    setEditingId('new')
    setTestOutput(null)
  }

  const handleSave = async (personality: Personality) => {
    if (!data) return
    setIsSaving(true)
    
    try {
      const isNew = editingId === 'new'
      const url = isNew ? '/api/personalities' : `/api/personalities/${personality.id}`
      const method = isNew ? 'POST' : 'PUT'
      
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(personality)
      })

      if (response.ok) {
        const savedP = await response.json()
        setData({
          ...data,
          personalities: isNew 
            ? [...data.personalities, savedP]
            : data.personalities.map(p => p.id === savedP.id ? savedP : p)
        })
        setEditingId(null)
      }
    } catch (error) {
      console.error('Error saving personality:', error)
    } finally {
      setIsSaving(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!data) return
    try {
      const response = await fetch(`/api/personalities/${id}`, {
        method: 'DELETE'
      })
      if (response.ok) {
        setData({
          ...data,
          personalities: data.personalities.filter(p => p.id !== id)
        })
      }
    } catch (error) {
      console.error('Error deleting personality:', error)
    }
  }

  const handleTestRun = (personality: Personality, input: string) => {
    // Simulate AI response based on tone
    let response = ""
    switch(personality.tone) {
      case 'slapstick': response = `*HONK* Wow, ${input}? That's more chaotic than a pie fight in a wind tunnel!`; break;
      case 'dry-humor': response = `I've analyzed ${input}. It was precisely as interesting as watching a glacier race a tectonic plate. Riveting.`; break;
      case 'educational': response = `Regarding ${input}: This phenomenon occurs because the coefficient of dramatic tension exceeds the structural integrity of the plot.`; break;
      default: response = `Simulated response for ${personality.name}: I've processed "${input}" and I'm feeling very ${personality.tone} about it!`;
    }
    setTestOutput(response)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-rose-500"></div>
      </div>
    )
  }

  if (!data) return null

  if (editingId) {
    const personalityToEdit = editingId === 'new' 
      ? null 
      : data.personalities.find(p => p.id === editingId) || null

    return (
      <div className="p-8 bg-zinc-950 min-h-screen">
        <PersonalityEditor
          personality={personalityToEdit}
          onSave={handleSave}
          onCancel={() => setEditingId(null)}
          onTestRun={handleTestRun}
          testOutput={testOutput}
          isSaving={isSaving}
        />
      </div>
    )
  }

  return (
    <PersonalityGrid
      personalities={data.personalities}
      onSelect={(id) => console.log('Selected:', id)}
      onToggleActive={handleToggleActive}
      onEdit={handleEdit}
      onCreateNew={handleCreateNew}
      onDelete={handleDelete}
    />
  )
}
