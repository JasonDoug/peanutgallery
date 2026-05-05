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

  const handleStartCommentary = () => {
    if (!data) return
    setData({
      ...data,
      activeSession: {
        ...data.activeSession,
        isPlaying: true,
      },
    })
  }

  const handleTogglePlayback = () => {
    if (!data) return
    setData({
      ...data,
      activeSession: {
        ...data.activeSession,
        isPlaying: !data.activeSession.isPlaying,
      },
    })
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
