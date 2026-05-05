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
    setData(prev => prev ? ({
      ...prev,
      activeSession: {
        ...prev.activeSession,
        agentId,
      },
    }) : prev)
  }

  const handleVoiceSelect = (voiceId: string) => {
    setData(prev => prev ? ({
      ...prev,
      activeSession: {
        ...prev.activeSession,
        voiceId,
      },
    }) : prev)
  }

  const handleVideoUrlSubmit = (url: string) => {
    const newSource: VideoSource = {
      id: `vid-${Date.now()}`,
      type: 'url',
      url,
      title: url.split('/').pop() || 'New Video',
    }
    setData(prev => prev ? ({
      ...prev,
      videoSources: [...prev.videoSources, newSource],
      activeSession: {
        ...prev.activeSession,
        videoSourceId: newSource.id,
      },
    }) : prev)
  }

  const handleSourceSelect = (id: string) => {
    setData(prev => prev ? ({
      ...prev,
      activeSession: {
        ...prev.activeSession,
        videoSourceId: id,
      },
    }) : prev)
  }

  const handleStartCommentary = async () => {
    if (!data || !data.activeSession.videoSourceId) return
    
    const source = data.videoSources.find(s => s.id === data.activeSession.videoSourceId)
    if (!source) return

    // Finding 2: source.url must exist (uploaded files logic disabled for now)
    if (!source.url && source.fileName) {
      console.error("Local file upload not yet implemented.")
      return
    }

    try {
      const response = await fetch('/api/sessions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: source.title,
          personalityId: data.activeSession.agentId,
          videoSource: source.url || ''
        })
      })

      if (response.ok) {
        const session = await response.json()
        setData(prev => prev ? ({
          ...prev,
          activeSession: {
            ...prev.activeSession,
            isPlaying: true,
            sessionId: session.id
          },
        }) : prev)
      } else {
        const errorData = await response.json()
        console.error('Failed to start commentary session:', errorData.detail)
      }
    } catch (error) {
      console.error('Failed to start commentary session:', error)
    }
  }

  const handleTogglePlayback = async () => {
    if (!data) return
    const isCurrentlyPlaying = data.activeSession.isPlaying
    
    if (isCurrentlyPlaying && data.activeSession.sessionId) {
      try {
        const response = await fetch(`/api/sessions/${data.activeSession.sessionId}/stop`, { method: 'POST' })
        if (response.ok) {
          setData(prev => prev ? ({
            ...prev,
            activeSession: {
              ...prev.activeSession,
              isPlaying: false,
            },
          }) : prev)
        } else {
          console.error('Failed to stop session:', await response.text())
        }
      } catch (error) {
        console.error('Failed to stop session:', error)
      }
    } else {
      // Just toggle UI if no session is active (shouldn't happen with current logic)
      setData(prev => prev ? ({
        ...prev,
        activeSession: {
          ...prev.activeSession,
          isPlaying: !isCurrentlyPlaying,
        },
      }) : prev)
    }
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
      onSourceSelect={handleSourceSelect}
      onStartCommentary={handleStartCommentary}
      onTogglePlayback={handleTogglePlayback}
    />
  )
}
