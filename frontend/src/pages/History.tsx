import { useState, useEffect } from 'react'
import { CommentaryGrid } from '../components/commentary-history/CommentaryGrid'
import { CommentaryDetail } from '../components/commentary-history/CommentaryDetail'
import type { CommentaryHistoryData } from '../components/commentary-history/types'

export default function History() {
  const [data, setData] = useState<CommentaryHistoryData | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedSessionId, setSelectedSessionId] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/history-data.json')
        const jsonData = await response.json()
        
        // Add placeholder thumbnails if needed
        const sessionsWithThumbnails = jsonData.sessions.map((s: any) => ({
          ...s,
          thumbnailUrl: `https://picsum.photos/seed/${s.id}/800/450`
        }))

        setData({ ...jsonData, sessions: sessionsWithThumbnails })
      } catch (error) {
        console.error('Error fetching history data:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const handleDeleteSession = (id: string) => {
    if (!data) return
    setData({
      ...data,
      sessions: data.sessions.filter(s => s.id !== id)
    })
    if (selectedSessionId === id) {
      setSelectedSessionId(null)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-rose-500"></div>
      </div>
    )
  }

  if (!data) return null

  if (selectedSessionId) {
    const selectedSession = data.sessions.find(s => s.id === selectedSessionId)
    if (selectedSession) {
      return (
        <div className="p-8 bg-zinc-950 min-h-screen">
          <CommentaryDetail
            session={selectedSession}
            onBack={() => setSelectedSessionId(null)}
            onDelete={handleDeleteSession}
          />
        </div>
      )
    }
  }

  return (
    <div className="p-8 bg-zinc-950 min-h-screen">
      < CommentaryGrid
        sessions={data.sessions}
        onSelectSession={(id: string) => setSelectedSessionId(id)}
        onDeleteSession={handleDeleteSession}
      />
    </div>
  )
}
