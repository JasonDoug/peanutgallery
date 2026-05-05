import { useState, useEffect } from 'react'
import { SetupScreen } from '../components/core-commentary-engine/SetupScreen'
import type { CoreCommentaryEngineData, VideoSource } from '../components/core-commentary-engine/types'

export default function Home() {
  const [data, setData] = useState<CoreCommentaryEngineData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/setup')
        if (response.ok) {
          const jsonData = await response.json()
          setData(jsonData)
        } else {
          console.error('Failed to fetch setup data')
        }
      } catch (error) {
        console.error('Error fetching setup data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const handleAgentSelect = (agentId: string) => {
    if (!data) return
    setData({
      ...data,
      activeSession: {
        ...data.activeSession,
        agentId,
      },
    })
  }

  const handleVoiceSelect = (voiceId: string) => {
    if (!data) return
    setData({
      ...data,
      activeSession: {
        ...data.activeSession,
        voiceId,
      },
    })
  }

  const handleVideoUrlSubmit = (url: string) => {
    if (!data) return
    const newSource: VideoSource = {
      id: `vid-${Date.now()}`,
      type: 'url',
      url,
      title: url.split('/').pop() || 'New Video',
    }
    setData({
      ...data,
      videoSources: [...data.videoSources, newSource],
      activeSession: {
        ...data.activeSession,
        videoSourceId: newSource.id,
      },
    })
  }

  const handleStartCommentary = async () => {
    if (!data || !data.activeSession.videoSourceId) return
    
    const source = data.videoSources.find(s => s.id === data.activeSession.videoSourceId)
    if (!source) return

    try {
      const response = await fetch('/api/sessions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: source.title,
          personalityId: data.activeSession.agentId,
          videoSource: source.url || source.fileName || ''
        })
      })

      if (response.ok) {
        const session = await response.json()
        setData(prev => prev ? ({
          ...prev,
          activeSession: {
            ...prev.activeSession,
            isPlaying: true,
            sessionId: session.id // Store the DB session ID
          },
        }) : prev)
      }
    } catch (error) {
      console.error('Failed to start commentary session:', error)
    }
  }

  const handleTogglePlayback = async () => {
    if (!data) return
    const isCurrentlyPlaying = data.activeSession.isPlaying
    
    if (isCurrentlyPlaying && data.activeSession.sessionId) {
      // Stop the session on the backend
      try {
        await fetch(`/api/sessions/${data.activeSession.sessionId}/stop`, { method: 'POST' })
      } catch (error) {
        console.error('Failed to stop session:', error)
      }
    }

    setData(prev => prev ? ({
      ...prev,
      activeSession: {
        ...prev.activeSession,
        isPlaying: !isCurrentlyPlaying,
      },
    }) : prev)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-rose-500"></div>
      </div>
    )
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center text-zinc-400">
        Failed to load commentary engine data.
      </div>
    )
  }

  return (
    <SetupScreen
      data={data}
      onAgentSelect={handleAgentSelect}
      onVoiceSelect={handleVoiceSelect}
      onVideoUrlSubmit={handleVideoUrlSubmit}
      onStartCommentary={handleStartCommentary}
      onTogglePlayback={handleTogglePlayback}
    />
  )
}
