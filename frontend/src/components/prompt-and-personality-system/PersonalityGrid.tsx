import type { Personality } from './types'
import { PersonalityCard } from './PersonalityCard'
import { Plus, Sparkles } from 'lucide-react'

interface PersonalityGridProps {
  personalities: Personality[]
  selectedId?: string
  onSelect?: (id: string) => void
  onToggleActive?: (id: string, active: boolean) => void
  onEdit?: (id: string) => void
  onDelete?: (id: string) => void
  onCreateNew?: () => void
}

export function PersonalityGrid({
  personalities,
  selectedId,
  onSelect,
  onToggleActive,
  onEdit,
  onDelete,
  onCreateNew,
}: PersonalityGridProps) {
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

      {/* Gradient accents */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-rose-500/[0.03] rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-500/[0.03] rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-20 max-w-6xl mx-auto px-6 py-12 space-y-10">
        {/* Header */}
        <div className="text-center space-y-3 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-['Space_Grotesk'] uppercase tracking-widest">
            <Sparkles size={12} />
            AI Personalities
          </div>
          <h1 className="text-3xl font-bold font-['Space_Grotesk'] text-zinc-100 tracking-tight">
            Choose Your <span className="text-rose-400">Vibe</span>
          </h1>
          <p className="text-sm text-zinc-400 max-w-md mx-auto leading-relaxed">
            Select a personality to shape your commentary experience. Each AI agent brings a unique tone and style.
          </p>
        </div>

        {/* Create New Button */}
        <div className="animate-fade-in [animation-delay:150ms]">
          <button
            onClick={onCreateNew}
            className="w-full p-4 rounded-2xl border-2 border-dashed border-zinc-800 hover:border-rose-500/30 bg-zinc-900/30 hover:bg-zinc-900/50 transition-all duration-300 group cursor-pointer"
          >
            <div className="flex items-center justify-center gap-3 text-zinc-500 group-hover:text-rose-400 transition-colors duration-300">
              <Plus size={20} className="group-hover:rotate-90 transition-transform duration-300" />
              <span className="text-sm font-medium font-['Space_Grotesk'] uppercase tracking-wide">
                Create Custom Personality
              </span>
            </div>
          </button>
        </div>

        {/* Personality Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 animate-fade-in [animation-delay:300ms]">
          {personalities.map((personality, index) => (
            <div
              key={personality.id}
              style={{ animationDelay: `${index * 100}ms` }}
              className="animate-fade-in [animation-fill-mode:forwards]"
            >
              <PersonalityCard
                personality={personality}
                isSelected={personality.id === selectedId}
                onSelect={() => onSelect?.(personality.id)}
                onToggleActive={(active) => onToggleActive?.(personality.id, active as unknown as boolean)}
                onEdit={() => onEdit?.(personality.id)}
                onDelete={() => onDelete?.(personality.id)}
              />
            </div>
          ))}
        </div>

        {/* Footer stats */}
        <div className="text-center text-xs text-zinc-600 animate-fade-in [animation-delay:450ms]">
          {personalities.filter(p => p.active).length} active · {personalities.length} total personalities
        </div>
      </div>
    </div>
  )
}
