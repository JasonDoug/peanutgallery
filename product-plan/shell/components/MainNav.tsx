import { useState } from 'react'
import { Menu } from 'lucide-react'

interface NavItem {
  label: string
  href: string
  isActive?: boolean
}

interface MainNavProps {
  items: NavItem[]
  onNavigate?: (href: string) => void
}

export default function MainNav({ items, onNavigate }: MainNavProps) {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <>
      {/* Desktop nav */}
      <nav className="hidden sm:flex items-center gap-1">
        {items.map((item) => (
          <button
            key={item.href}
            onClick={() => onNavigate?.(item.href)}
            className={`px-3 py-1.5 rounded-md text-sm font-['Space_Grotesk'] transition-colors ${
              item.isActive
                ? 'bg-rose-50 text-rose-700 dark:bg-rose-950 dark:text-rose-300'
                : 'text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100'
            }`}
          >
            {item.label}
          </button>
        ))}
      </nav>

      {/* Mobile hamburger */}
      <div className="sm:hidden">
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-1.5 rounded-md text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
        >
          <Menu size={20} />
        </button>

        {mobileOpen && (
          <div className="absolute top-14 left-0 right-0 bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 flex flex-col py-2 px-4 gap-1 z-50">
            {items.map((item) => (
              <button
                key={item.href}
                onClick={() => {
                  onNavigate?.(item.href)
                  setMobileOpen(false)
                }}
                className={`text-left px-3 py-2 rounded-md text-sm font-['Space_Grotesk'] transition-colors ${
                  item.isActive
                    ? 'bg-rose-50 text-rose-700 dark:bg-rose-950 dark:text-rose-300'
                    : 'text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </>
  )
}
