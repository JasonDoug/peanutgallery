import type { Voice } from '../../../product/sections/core-commentary-engine/types'
import { Volume2 } from 'lucide-react'

interface VoiceSelectorProps {
  voices: Voice[]
  selectedVoiceId?: string
  onSelect?: (voiceId: string) => void
}

export function VoiceSelector({ voices, selectedVoiceId, onSelect }: VoiceSelectorProps) {
  const selectedVoice = voices.find(v => v.id === selectedVoiceId)

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-1">
        <Volume2 size={16} className="text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.3)]" />
        <h3 className="text-sm font-bold font-['Space_Grotesk'] text-zinc-200 tracking-wide uppercase">
          Voice
        </h3>
      </div>

      {selectedVoice && (
        <div className="flex items-center gap-3 p-4 bg-zinc-800/60 border border-zinc-700/50 rounded-xl hover:border-amber-500/20 transition-all duration-300 group">
          <div className="w-12 h-12 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center shrink-0 group-hover:bg-amber-500/20 transition-colors duration-300">
            <Volume2 size={20} className="text-amber-400" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-medium text-zinc-100">{selectedVoice.name}</p>
            <p className="text-xs text-zinc-400 mt-0.5">
              {selectedVoice.gender} · {selectedVoice.accent} · {selectedVoice.provider}
            </p>
          </div>
        </div>
      )}

      <div className="space-y-1.5">
        {voices.map((voice, index) => (
          <button
            key={voice.id}
            onClick={() => onSelect?.(voice.id)}
            className={`w-full flex items-center gap-3 p-3 rounded-lg transition-all duration-300 ${
              voice.id === selectedVoiceId
                ? 'bg-amber-500/10 border border-amber-500/20 shadow-[0_0_15px_rgba(251,191,36,0.1)]'
                : 'hover:bg-zinc-800/50 border border-transparent'
            }`}
            style={{ animationDelay: `${index * 75}ms` }}
          >
            <div className={`w-2 h-2 rounded-full shrink-0 transition-all duration-300 ${
              voice.id === selectedVoiceId ? 'bg-amber-400 scale-125' : 'bg-zinc-600'
            }`} />
            <span className={`text-sm flex-1 text-left transition-colors duration-300 ${
              voice.id === selectedVoiceId ? 'text-amber-200 font-medium' : 'text-zinc-300'
            }`}>
              {voice.name}
            </span>
            <span className="text-[11px] text-zinc-500">{voice.gender} · {voice.accent}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
