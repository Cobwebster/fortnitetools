import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Fortnite K/D Calculator – Kill/Death Ratio & Win Rate | FortniteTools.com',
  description: 'Calculate your Fortnite Kill/Death ratio, win rate, and kills per game. Compare your stats against the average player and pro benchmarks like Bugha, Clix, and Mongraal.',
  keywords: ['fortnite kd calculator', 'fortnite kill death ratio', 'fortnite win rate', 'fortnite stats calculator', 'fortnite kd ratio'],
  openGraph: {
    title: 'Fortnite K/D Calculator – Kill/Death Ratio & Win Rate',
    description: 'Calculate your Fortnite K/D ratio and win rate. See how you compare against the average player and pro benchmarks.',
    url: 'https://fortnitetools.com/tools/kd-calculator',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
