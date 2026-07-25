export const SENSITIVITY_FAQS = [
  {
    question: 'Will converted sensitivity feel identical in Fortnite?',
    answer:
      'cm/360 matching is the closest hipfire feel transfer between games, but Fortnite’s FOV, building, editing, and scoped sensitivities still feel different. Treat the result as a Creative warmup starting point, then nudge X/Y until tracking and 180s feel natural.',
  },
  {
    question: 'What eDPI range do Fortnite mouse players use?',
    answer:
      'Many KBM players land roughly in the 40–100 eDPI range (sensitivity × DPI). A common competitive band at 800 DPI is about 0.07–0.10 sens (eDPI ~56–80). There is no single “pro” value — comfort and consistency matter more.',
  },
  {
    question: 'How do I convert Valorant sensitivity to Fortnite?',
    answer:
      'Enter your Valorant sens and mouse DPI, set Convert From to Valorant and Convert To to Fortnite, then hit Convert. The tool matches cm/360 so a full turn uses the same mouse distance. Apply the Fortnite number in Settings → Mouse and Keyboard → Sensitivity X/Y.',
  },
  {
    question: 'How do I convert CS2 or Apex sensitivity to Fortnite?',
    answer:
      'Same flow: pick CS2 / CS:GO or Apex Legends as the source game, enter sens + DPI, convert to Fortnite. Apex and CS2 share a similar yaw scale in many converters; always keep DPI identical on both sides of the conversion.',
  },
  {
    question: 'What is cm/360 and why does this calculator use it?',
    answer:
      'cm/360 is how many centimeters your mouse moves for a full 360° turn. Games use different raw sensitivity scales, so matching cm/360 is the standard way to transfer hipfire feel instead of copying the same decimal number between titles.',
  },
  {
    question: 'Should my Fortnite X and Y sensitivity be the same?',
    answer:
      'Most players start with matching X and Y after a conversion. Some raise Y slightly for builds and edits. If you change one axis, re-test tracking in Creative before ranked.',
  },
  {
    question: 'Does this work for controller sensitivity?',
    answer:
      'No — this converter is for mouse DPI + in-game mouse sensitivity. Controller look speed, deadzones, and aim assist curves are a different system. Use in-game controller settings or Creative testing instead.',
  },
]

export const SENSITIVITY_SEO_SECTIONS = [
  {
    heading: 'How to use this Fortnite sensitivity calculator',
    body: [
      'Enter the DPI from your mouse software (Logitech G Hub, Razer Synapse, etc.), pick the game you already play, type that game’s sensitivity, and convert to Fortnite. The output is a Fortnite X/Y starting value that keeps the same physical cm/360 turn distance.',
      'After converting, open Fortnite → Settings → Mouse and Keyboard, paste the result into Sensitivity X and Sensitivity Y, then spend 10–15 minutes in a Creative aim / edit map before judging it in pubs or Ranked.',
    ],
  },
  {
    heading: 'Valorant, CS2, and Apex → Fortnite (what transfers)',
    body: [
      'Players switching from Valorant, CS2, or Apex usually want the same muscle memory for tracking and flicks. Matching cm/360 gets hipfire close. What does not transfer 1:1: scoped/ADS multipliers, Fortnite’s build camera, edit speed, and the fact that you often need faster camera work for piece control than in a pure tac shooter.',
      'If builds feel sticky after a Valorant convert, raise Fortnite sens a little (or keep hipfire and only raise building/edit multipliers if you use separate values). If sprays feel shaky, drop slightly and widen your mousepad clearance for 180s.',
    ],
  },
  {
    heading: 'Fortnite eDPI and common 800 DPI ranges',
    body: [
      'eDPI = in-game sensitivity × mouse DPI. It lets you compare settings across DPI choices. Example: 0.08 sens at 800 DPI = 64 eDPI; 0.04 sens at 1600 DPI is also 64 eDPI and the same cm/360 if the game scale matches.',
      'At 800 DPI, a practical Fortnite starting band is roughly 0.05–0.08 for steadier mid-range fights, 0.12–0.18 for very fast build/edit playstyles, and ~0.07–0.10 for many competitive KBM players. Use the calculator’s eDPI readout to sanity-check — Fortnite eDPI in the tens of thousands usually means the wrong game multiplier or a decimal typo.',
    ],
  },
  {
    heading: 'After you convert — fine-tune in Creative',
    body: [
      'Do a few 180s, track a strafing bot, and run a short edit course. Ask: can I do a full turn without lifting twice? Can I micro-correct sprays without jitter? If not, nudge sens by ~5–10% and retest. Small changes beat jumping from 0.06 to 0.15 in one night.',
      'Keep DPI fixed while you tune Fortnite sens. Changing both at once makes it hard to know what fixed the feel. Pair sens work with stable FPS — see our FPS settings guide if frame time spikes make aim feel like “bad sens.”',
    ],
  },
] as const
