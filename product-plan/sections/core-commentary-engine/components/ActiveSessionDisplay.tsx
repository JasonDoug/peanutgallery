import type { ActiveSession } from '../../../product/sections/core-commentary-engine/types'
import type { Agent, Voice } from '../../../product/sections/core-commentary-engine/types'
import { Play, Pause, Clock, Volume1 } from 'lucide-react'

interface ActiveSessionDisplayProps {
  session: ActiveSession
  agents: Agent[]
  voices: Voice[]
  onTogglePlayback?: () => void
}

export function ActiveSessionDisplay({
  session,
  agents,
  voices,
  onTogglePlayback,
}: ActiveSessionDisplayProps) {
  const agent = agents.find(a => a.id === session.agentId)
  const voice = voices.find(v => v.id === session.voiceId)

  if (!agent) return null

  return (
    <div className="p-5 bg-zinc-800/30 border border-zinc-700/30 rounded-xl backdrop-blur-sm">
      <p className="text-[11px] font-['Space_Grotesk'] uppercase tracking-wider text-zinc-500 mb-4 flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-pulse" />
        Active Session
      </p>
      <div className="flex items-center gap-4">
        <button
          onClick={onTogglePlayback}
          className="w-12 h-12 rounded-full bg-rose-600 hover:bg-rose-500 flex items-center justify-center text-white shadow-[0_0_20px_rgba(244,63,94,0.3)] hover:shadow-[0_0_30px_rgba(244,63,94,0.4)] hover:scale-105 active:scale-95 transition-all duration-300"
        >
          {session.isPlaying ? <Pause size={18} /> : <Play size={18} className="ml-0.5" />}
        </button>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-medium text-zinc-100">{agent.name}</p>
          <div className="flex items-center gap-3 mt-1 text-[11px] text-zinc-400">
            <span className="flex items-center gap-1">
              <Clock size={10} />
              Delay: {session.delaySeconds}s
            </span>
            <span className="flex items-center gap-1">
              <Volume1 size={10} />
              {voice?.name ?? 'Unknown'} · {Math.round(session.volume * 100)}%
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
