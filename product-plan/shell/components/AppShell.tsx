import { ReactNode } from 'react'
import MainNav from './MainNav'
import UserMenu from './UserMenu'

interface AppShellProps {
  children: ReactNode
  navigationItems: Array<{ label: string; href: string; isActive?: boolean }>
  user?: { name: string; avatarUrl?: string }
  onNavigate?: (href: string) => void
  onLogout?: () => void
}

export default function AppShell({
  children,
  navigationItems,
  user,
  onNavigate,
  onLogout,
}: AppShellProps) {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex flex-col font-['Inter']">
      <header className="h-14 border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 flex items-center justify-between px-4 shrink-0">
        <div className="flex items-center gap-8">
          <span className="text-lg font-bold font-['Space_Grotesk'] text-rose-600 dark:text-rose-400 tracking-tight">
            PeanutGallery
          </span>
          <MainNav items={navigationItems} onNavigate={onNavigate} />
        </div>
        {user && <UserMenu user={user} onLogout={onLogout} />}
      </header>
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  )
}
