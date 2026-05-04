import type { Personality } from '../../../product/sections/prompt-and-personality-system/types'
import { Sparkles, Flame, Brain, Zap, Heart, Star, Cpu } from 'lucide-react'

interface PersonalityCardProps {
  personality: Personality
  isSelected?: boolean
  onSelect?: (id: string) => void
  onToggleActive?: (id: string, active: boolean) => void
  onEdit?: (id: string) => void
  onDelete?: (id: string) => void
}

const toneIcons: Record<string, typeof Sparkles> = {
  'slapstick': Flame,
  'dry-humor': Brain,
  'educational': Star,
  'hype': Zap,
  'supportive': Heart,
  'technical': Cpu,
  'custom': Sparkles,
}

const toneColors: Record<string, string> = {
  'slapstick': 'from-orange-500/20 to-red-500/20 border-orange-500/30',
  'dry-humor': 'from-blue-500/20 to-indigo-500/20 border-blue-500/30',
  'educational': 'from-emerald-500/20 to-teal-500/20 border-emerald-500/30',
  'hype': 'from-rose-500/20 to-pink-500/20 border-rose-500/30',
  'supportive': 'from-amber-500/20 to-yellow-500/20 border-amber-500/30',
  'technical': 'from-cyan-500/20 to-blue-500/20 border-cyan-500/30',
  'custom': 'from-purple-500/20 to-violet-500/20 border-purple-500/30',
}

export function PersonalityCard({
  personality,
  isSelected,
  onSelect,
  onToggleActive,
  onEdit,
  onDelete,
}: PersonalityCardProps) {
  const ToneIcon = toneIcons[personality.tone] || Sparkles
  const gradientClass = toneColors[personality.tone] || toneColors['custom']
  const previewOutput = personality.exampleOutputs?.[0]

  return (
    <div
      className={`group relative rounded-2xl border bg-zinc-900/50 backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] hover:shadow-xl ${
        isSelected
          ? 'border-rose-500/50 shadow-[0_0_30px_rgba(244,63,94,0.15)]'
          : `border-zinc-800 hover:border-zinc-700 ${gradientClass}`
      }`}
      onClick={() => onSelect?.(personality.id)}
    >
      {/* Tone gradient overlay */}
      <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br opacity-30 pointer-events-none ${gradientClass}`} />

      <div className="relative p-6 space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0 flex-1">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${
              isSelected ? 'bg-rose-500/20' : 'bg-zinc-800 group-hover:bg-zinc-700/50'
            }`}>
              <ToneIcon className={`w-5 h-5 transition-colors duration-300 ${
                isSelected ? 'text-rose-400' : 'text-zinc-400 group-hover:text-zinc-300'
              }`} />
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="text-zinc-100 font-bold font-['Space_Grotesk'] text-lg truncate">
                {personality.name}
              </h3>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-[11px] uppercase tracking-wider text-zinc-500 font-['Space_Grotesk']">
                  {personality.tone}
                </span>
                {personality.isPreset && (
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-400 border border-zinc-700">
                    Preset
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Active toggle */}
          <button
            onClick={(e) => {
              e.stopPropagation()
              onToggleActive?.(personality.id, !personality.active)
            }}
            className={`w-11 h-6 rounded-full transition-all duration-300 relative shrink-0 ${
              personality.active
                ? 'bg-rose-500'
                : 'bg-zinc-700 hover:bg-zinc-600'
            }`}
          >
            <div className={`absolute top-0.5 w-5 h-5 rounded-full bg-white transition-all duration-300 ${
              personality.active ? 'left-[22px]' : 'left-0.5'
            }`} />
          </button>
        </div>

        {/* Description */}
        <p className="text-sm text-zinc-400 leading-relaxed line-clamp-2">
          {personality.description}
        </p>

        {/* Preview Output */}
        {previewOutput && (
          <div className="bg-zinc-950/50 rounded-xl p-3 border border-zinc-800/50">
            <p className="text-xs text-zinc-500 mb-1.5 font-['Space_Grotesk'] uppercase tracking-wider">
              Preview
            </p>
            <p className="text-xs text-zinc-300 leading-relaxed line-clamp-2 italic">
              "{previewOutput.output}"
            </p>
          </div>
        )}

        {/* Stats */}
        <div className="flex items-center gap-4 text-[11px] text-zinc-500">
          <span className="flex items-center gap-1">
            <Star className="w-3 h-3 text-amber-400" fill="currentColor" />
            {personality.averageRating.toFixed(1)}
          </span>
          <span>{personality.usageCount} uses</span>
          {personality.lastUsed && (
            <span className="ml-auto">
              {new Date(personality.lastUsed).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
            </span>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 pt-2 border-t border-zinc-800/50">
          <button
            onClick={(e) => {
              e.stopPropagation()
              onSelect?.(personality.id)
            }}
            className="flex-1 py-2 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 text-xs font-medium transition-all duration-300 hover:scale-[1.02]"
          >
            Use This
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation()
              onEdit?.(personality.id)
            }}
            className="px-3 py-2 rounded-lg bg-zinc-800/50 hover:bg-zinc-700/50 text-zinc-400 hover:text-zinc-200 text-xs font-medium transition-all duration-300"
          >
            Edit
          </button>
          {!personality.isPreset && (
            <button
              onClick={(e) => {
                e.stopPropagation()
                onDelete?.(personality.id)
              }}
              className="px-3 py-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 text-xs font-medium transition-all duration-300"
            >
              Delete
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
