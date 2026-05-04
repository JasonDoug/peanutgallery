import type { Agent, Voice } from './types'

interface AgentSelectorProps {
  agents: Agent[]
  voices: Voice[]
  selectedAgentId?: string
  onSelect?: (agentId: string) => void
}

export function AgentSelector({ agents, voices, selectedAgentId, onSelect }: AgentSelectorProps) {
  const getVoiceName = (voiceId: string) => voices.find(v => v.id === voiceId)?.name ?? 'Unknown'

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-1">
        <div className="w-4 h-4 rounded-full bg-rose-500/20 flex items-center justify-center">
          <div className="w-2 h-2 rounded-full bg-rose-400 shadow-[0_0_6px_rgba(251,113,133,0.4)]" />
        </div>
        <h3 className="text-sm font-bold font-['Space_Grotesk'] text-zinc-200 tracking-wide uppercase">
          AI Agent
        </h3>
      </div>

      <div className="grid gap-3">
        {agents.map((agent, index) => {
          const isSelected = agent.id === selectedAgentId
          return (
            <button
              key={agent.id}
              onClick={() => onSelect?.(agent.id)}
              className={`w-full text-left p-5 rounded-xl border transition-all duration-300 ${
                isSelected
                  ? 'bg-rose-950/40 border-rose-500/40 shadow-[0_0_30px_rgba(244,63,94,0.1)]'
                  : 'bg-zinc-800/40 border-zinc-700/30 hover:bg-zinc-800/70 hover:border-zinc-600/50'
              }`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className={`text-sm font-bold font-['Space_Grotesk'] transition-colors duration-300 ${
                      isSelected ? 'text-rose-300' : 'text-zinc-200 group-hover:text-white'
                    }`}>
                      {agent.name}
                    </span>
                    {agent.isDefault && (
                      <span className="text-[10px] font-['Space_Grotesk'] uppercase tracking-wider px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">
                        Default
                      </span>
                    )}
                    <span className="text-[10px] font-['Space_Grotesk'] uppercase tracking-wider px-2 py-0.5 rounded bg-zinc-700/50 text-zinc-400">
                      Temp: {agent.temperature}
                    </span>
                  </div>
                  <p className="mt-2 text-xs text-zinc-400 leading-relaxed line-clamp-2">
                    {agent.personality}
                  </p>
                </div>
                <div className={`shrink-0 w-6 h-6 rounded-full border-2 transition-all duration-300 flex items-center justify-center ${
                  isSelected
                    ? 'border-rose-400 bg-rose-500'
                    : 'border-zinc-600'
                }`}>
                  {isSelected && (
                    <div className="w-2 h-2 rounded-full bg-white" />
                  )}
                </div>
              </div>
              <div className="mt-3 flex items-center gap-1.5 text-[11px] text-zinc-500">
                <span>Voice: {getVoiceName(agent.voiceId)}</span>
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}
