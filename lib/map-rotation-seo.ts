/** Shared FAQ copy for /map-rotation so the page body and FAQPage schema never drift. */

export const MAP_ROTATION_FAQS: { question: string; answer: string }[] = [
  {
    question: 'What Fortnite Reload map is on right now?',
    answer:
      'The live map depends on the current minute of the hour. Oasis is live from :00 to :20, Slurp Rush from :20 to :40, and Springfield from :40 to :00. The timer at the top of this page shows the active island and the exact minutes and seconds remaining.',
  },
  {
    question: 'How often do Fortnite Reload maps change?',
    answer:
      'Reload maps rotate every 20 minutes on a clock-aligned schedule, so each map in the pool goes live once per hour. When the timer hits zero, the next island takes over immediately.',
  },
  {
    question: 'What maps are in the Fortnite Reload rotation?',
    answer:
      'The current Reload pool is Oasis (desert island), Slurp Rush (Chapter 2 Slurp theme), and Springfield (The Simpsons). Older islands such as Venture, Elite Stronghold, Squid Grounds, Surf City, and Nitemare Island have been in the rotation before and can return in later updates.',
  },
  {
    question: 'Is the Reload map rotation the same in every region?',
    answer:
      'Yes. The rotation is synchronised globally to clock minutes, so when Oasis is live in NA East it is live in EU and OCE too. Minutes past the hour are the same in every timezone, so the schedule works no matter where you play.',
  },
  {
    question: 'Can I choose which Reload map I play?',
    answer:
      'No. Epic keeps a single Reload map live at a time so matchmaking stays fast instead of splitting players across islands. To play a specific map, check this timer and queue during that map’s 20-minute window.',
  },
  {
    question: 'How long is each Fortnite Reload map live?',
    answer:
      'Each map is live for 20 minutes. With three maps in the pool, a full rotation cycle takes 60 minutes and then repeats, 24 hours a day.',
  },
  {
    question: 'When is Springfield live in Fortnite Reload?',
    answer:
      'Springfield is the last slot every hour — :40 to :00. Queue a couple of minutes early if you want The Confidential or the John Wick Sprite; matches started in the last minute of Slurp Rush can still load into that island.',
  },
  {
    question: 'Does Fortnite Blitz Royale rotate maps?',
    answer:
      'When Epic enables more than one Blitz map they usually rotate every 10 minutes. Blitz is currently running a single island, so the Blitz tab shows the live map with no switch timer.',
  },
  {
    question: 'Is this Fortnite map rotation timer accurate?',
    answer:
      'Epic does not publish a public rotation API, so this timer uses the same clock-aligned slots community trackers use. It stays accurate as long as the pool is unchanged. If Epic swaps an island or changes the duration in a patch, we update the schedule — trust the in-game lobby if the two ever disagree.',
  },
]

/** Islands that have rotated through Reload previously and may return. */
export const PAST_RELOAD_MAPS: { name: string; note: string }[] = [
  { name: 'Venture', note: 'Original Reload island — Chapter 1 Tilted, Pleasant, Retail' },
  { name: 'Elite Stronghold', note: 'Competitive-focused Reload arena from spring 2026' },
  { name: 'Squid Grounds', note: 'Squid Game collab island with challenge-themed POIs' },
  { name: 'Surf City', note: 'Coastal summer island' },
  { name: 'Nitemare Island', note: 'Halloween / Nitemares themed island' },
]
