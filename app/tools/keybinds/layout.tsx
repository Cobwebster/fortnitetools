import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Fortnite Pro Keybinds – Bugha, Clix, Mongraal & More | FortniteTools.com',
  description: 'Real keybindings used by top Fortnite pros including Bugha, Clix, Mongraal, Benjyfishy, and MrSavage. Compare building, editing, and combat binds side-by-side.',
  keywords: ['fortnite keybinds', 'best fortnite keybinds', 'fortnite pro keybinds', 'bugha keybinds', 'clix keybinds', 'mongraal keybinds', 'fortnite building keybinds'],
  openGraph: {
    title: 'Fortnite Pro Keybinds – Bugha, Clix, Mongraal & More',
    description: 'Real keybindings from top Fortnite pros. Compare building, edit, and combat binds side-by-side.',
    url: 'https://fortnitetools.com/tools/keybinds',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
