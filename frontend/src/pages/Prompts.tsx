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
        const response = await fetch('/personalities-data.json')
        const jsonData = await response.json()
        setData(jsonData)
      } catch (error) {
        console.error('Error fetching personality data:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const handleToggleActive = (id: string, active: boolean) => {
    if (!data) return
    setData({
      ...data,
      personalities: data.personalities.map(p => 
        p.id === id ? { ...p, active } : p
      )
    })
  }

  const handleEdit = (id: string) => {
    setEditingId(id)
    setTestOutput(null)
  }

  const handleCreateNew = () => {
    setEditingId('new')
    setTestOutput(null)
  }

  const handleSave = (personality: Personality) => {
    if (!data) return
    setIsSaving(true)
    
    // Simulate API call
    setTimeout(() => {
      if (editingId === 'new') {
        const newP = { ...personality, id: `p${Date.now()}`, isPreset: false }
        setData({
          ...data,
          personalities: [...data.personalities, newP]
        })
      } else {
        setData({
          ...data,
          personalities: data.personalities.map(p => 
            p.id === editingId ? personality : p
          )
        })
      }
      setIsSaving(false)
      setEditingId(null)
    }, 500)
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
      onDelete={(id) => {
        setData({
          ...data,
          personalities: data.personalities.filter(p => p.id !== id)
        })
      }}
    />
  )
}
