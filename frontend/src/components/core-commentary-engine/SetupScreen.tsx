import type { CoreCommentaryEngineProps } from './types'
import { VideoSourceInput } from './VideoSourceInput'
import { AgentSelector } from './AgentSelector'
import { VoiceSelector } from './VoiceSelector'
import { ActiveSessionDisplay } from './ActiveSessionDisplay'
import { PlayCircle, Sparkles } from 'lucide-react'
import { useCommentaryAudio } from '../../lib/useCommentaryAudio'

export function SetupScreen({
  data,
  onAgentSelect,
  onVoiceSelect,
  onVideoUrlSubmit,
  onVideoUpload,
  onStartCommentary,
  onTogglePlayback,
}: CoreCommentaryEngineProps) {
  const { agents, voices, activeSession, videoSources } = data
  const selectedAgentId = activeSession.agentId
  const selectedAgent = agents.find(a => a.id === selectedAgentId)
  const selectedVoiceId = selectedAgent?.voiceId ?? activeSession.voiceId

  const canStart = activeSession.videoSourceId && selectedAgentId

  // Use the commentary audio hook (FE-002)
  const { jokes } = useCommentaryAudio((activeSession as any).sessionId)

  const activeSource = videoSources.find(s => s.id === activeSession.videoSourceId)

  return (
    <div className="min-h-screen bg-zinc-950 relative overflow-hidden">
      {/* Film grain overlay */}
      <div
        className="absolute inset-0 pointer-events-none z-10 opacity-[0.035] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '256px 256px',
        }}
      />

      {/* Cinematic gradient backdrop */}
      <div className="absolute inset-0 bg-gradient-to-br from-rose-950/20 via-zinc-950 to-amber-950/10 pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-rose-500/[0.03] rounded-full blur-[120px] pointer-events-none" />

      {/* Cinematic vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_50%,transparent_50%,rgba(0,0,0,0.5)_100%)] pointer-events-none" />

      <div className="relative max-w-3xl mx-auto px-6 py-12 space-y-10">
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-['Space_Grotesk'] uppercase tracking-widest">
            <Sparkles size={12} />
            Ready to Riff
          </div>
          <h1 className="text-3xl font-bold font-['Space_Grotesk'] text-zinc-100 tracking-tight">
            Set Up Your Session
          </h1>
          <p className="text-sm text-zinc-400 max-w-md mx-auto leading-relaxed">
            Choose a video, pick your AI commentator, and let the riffing begin.
          </p>
        </div>

        {/* Video Source */}
        <section className="space-y-4">
          <VideoSourceInput
            sources={data.videoSources}
            activeSourceId={activeSession.videoSourceId}
            onUrlSubmit={(url) => onVideoUrlSubmit?.(url)}
            onUpload={(file) => onVideoUpload?.(file)}
            onSelect={(id) => {
              // This should be handled by the parent
              console.log('Select source:', id)
            }}
          />
        </section>

        {/* Divider */}
        <div className="flex items-center gap-3">
          <div className="h-px flex-1 bg-zinc-800" />
          <span className="text-[10px] font-['Space_Grotesk'] uppercase tracking-widest text-zinc-600">
            AI Personality
          </span>
          <div className="h-px flex-1 bg-zinc-800" />
        </div>

        {/* Agent Selector */}
        <section className="space-y-4">
          <AgentSelector
            agents={agents}
            voices={voices}
            selectedAgentId={selectedAgentId}
            onSelect={(id) => onAgentSelect?.(id)}
          />
        </section>

        {/* Voice Selector */}
        {selectedAgent && (
          <section className="space-y-4">
            <VoiceSelector
              voices={voices}
              selectedVoiceId={selectedVoiceId}
              onSelect={(id) => onVoiceSelect?.(id)}
            />
          </section>
        )}

        {/* Active Session Display */}
        {activeSession.isPlaying && (
          <section className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <ActiveSessionDisplay
              session={activeSession}
              agents={agents}
              voices={voices}
              onTogglePlayback={onTogglePlayback}
            />
            
            {/* Simple Video Player for Demo */}
            {activeSource && (
              <div className="relative aspect-video rounded-2xl overflow-hidden bg-black border border-zinc-800 shadow-2xl">
                <video
                  src={activeSource.url}
                  className="w-full h-full object-contain"
                  controls
                  autoPlay
                />
                
                {/* Last Joke Overlay */}
                {jokes.length > 0 && (
                  <div className="absolute bottom-12 left-0 right-0 p-4 bg-black/60 backdrop-blur-md border-t border-zinc-700/50 animate-in slide-in-from-bottom-full duration-300">
                    <p className="text-zinc-100 text-center font-['Space_Grotesk'] text-sm md:text-base leading-relaxed">
                      {jokes[jokes.length - 1].text}
                    </p>
                  </div>
                )}
              </div>
            )}
          </section>
        )}

        {/* Start Button */}
        <div className="pt-4">
          {!activeSession.isPlaying && (
            <button
              disabled={!canStart}
              onClick={() => onStartCommentary?.()}
              className={`w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-sm font-bold font-['Space_Grotesk'] tracking-wide transition-all ${
                canStart
                  ? 'bg-rose-600 hover:bg-rose-500 text-white shadow-[0_0_25px_rgba(244,63,94,0.25)] hover:shadow-[0_0_35px_rgba(244,63,94,0.35)] hover:scale-[1.01]'
                  : 'bg-zinc-800 text-zinc-500 cursor-not-allowed'
              }`}
            >
              <PlayCircle size={18} />
              Start Commentary
            </button>
          )}
          {!canStart && !activeSession.isPlaying && (
            <p className="text-center text-xs text-zinc-600 mt-2">
              Select a video and agent to begin
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
