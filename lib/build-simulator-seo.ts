import { BUILD_SIM_V2_NOTES, PHYSICS_PARITY_NOTE } from './build-simulator'

export const BUILD_SIM_FAQS = [
  {
    question: 'What is the Fortnite Build Simulator?',
    answer:
      'A free in-browser practice sandbox for Fortnite-style building and editing. You place walls, floors, ramps, and cones on a grid, spend wood/stone/metal (or use infinite mats), turbo-build, break pieces, edit tile patterns, and move in first person with jump, sprint, crouch, and collision. It is tuned for muscle-memory practice — not a 1:1 Creative map or Epic physics clone.',
  },
  {
    question: 'Does this match Fortnite physics and binds?',
    answer: PHYSICS_PARITY_NOTE,
  },
  {
    question: 'What are the controls?',
    answer:
      'Click the arena to lock the mouse. Hold left click to turbo-build. Q, F, C, and V select and place wall, floor, ramp, and cone. Right-click breaks the piece under your crosshair; unsupported builds cascade. Hold G to edit (blue tile grid — select tiles to remove, release G to confirm). T resets edit; Esc cancels. WASD move, Shift sprint, Ctrl crouch, Space jump. 1/2/3 mats; R or wheel rotates. Blue hologram = can place; red = cannot.',
  },
  {
    question: 'Can you edit builds like in Fortnite?',
    answer:
      'Yes. Hold G on your piece to enter edit mode — it turns into a blue tile grid. Click or drag to select tiles to remove, then release G to confirm (edit-on-release). T resets to a full piece; Esc cancels. Walls and floors are 3×3, cones 2×2, ramps L/M/R. Edits are free; selecting every tile destroys the piece.',
  },
  {
    question: 'Is the Fortnite Build Simulator free?',
    answer:
      'Yes. It runs in your browser with no download, no account, and no V-Bucks. Use it to warm up building and editing before Creative, Ranked, or pubs. Not affiliated with Epic Games.',
  },
  {
    question: 'Who is this build trainer for?',
    answer:
      'Beginners learning piece control, returning players refreshing binds, and anyone who wants a lightweight browser warm-up without loading a Creative island. If you need tournament-accurate timing, piece HP, or custom maps, use Fortnite Creative after you lock in the basics here.',
  },
  {
    question: 'What is planned for a later version?',
    answer: `Next up: ${BUILD_SIM_V2_NOTES.join('; ')}.`,
  },
]

export type BuildSimSeoSection = {
  heading: string
  paragraphs: string[]
  bullets?: string[]
}

/** Long-form copy under the tool for search / feature explanation. */
export const BUILD_SIM_SEO_SECTIONS: BuildSimSeoSection[] = [
  {
    heading: 'Practice Fortnite building in your browser',
    paragraphs: [
      'The Fortnite Build Simulator is a free browser tool for practicing Battle Royale-style building without launching the game. Place the four core pieces — wall, floor, ramp (stairs), and cone (roof/pyramid) — on a snap grid, walk the arena in first person, and train the same loop you use in fights: place, rotate, edit, break, and rebuild.',
      'Visuals stay simple on purpose. The goal is placement feel, edit speed, and piece control — not photoreal graphics. Use it as a warm-up before Creative edit courses, Ranked queues, or Chapter 7 Season sessions when you only have a few minutes and a browser tab.',
    ],
  },
  {
    heading: 'Turbo-build, mats, and placement rules',
    paragraphs: [
      'Hold left click to turbo-build while you look around — the same spam rhythm that matters for 90s, retakes, and box fights. Press Q, F, C, or V to select a piece and place it immediately. Wood, stone, and metal cost 10 materials per piece with a 500 cap (toggle infinite mats when you only care about mechanics).',
      'Placement follows Fortnite-style constraints so practice transfers better: about three tiles of build range, grid snap, a blue/red hologram for valid vs blocked spots, and support rules so floating air builds do not stick. Look up to place higher walls and ceilings; look down for floors under your feet.',
    ],
    bullets: [
      'Blue hologram = in range, affordable, and supported by ground or connected builds',
      'Red hologram = blocked slot, out of range, no mats, or would float unsupported',
      'R or mouse wheel rotates the piece 90° before you place',
      'Right-click breaks the aimed piece; unsupported structures cascade away',
    ],
  },
  {
    heading: 'Edit walls, floors, ramps, and cones',
    paragraphs: [
      'Editing is a core Fortnite skill — doors, windows, half ramps, and cone corners win piece-control fights. Aim at a piece you built, press G, then drag across the edit grid to paint tiles. Confirm with G, reset to a full piece with T, or cancel with Esc.',
      'Walls and floors use a real 3×3 edit grid. Cones use a 2×2 corner grid like pyramids/roofs in-game. Ramps expose left, middle, and right strips so you can train common half-stair edits. Edits are free; clearing every tile removes the piece, matching empty-edit behavior in Battle Royale.',
    ],
  },
  {
    heading: 'Movement for build fights and retakes',
    paragraphs: [
      'Building practice only helps if you can move while you place. The arena supports WASD movement, sprint, crouch, jump with coyote timing, and collision against floors, walls, and ramps so you can run up stairs and fight through your own boxes.',
      'A small practice counter tracks pieces placed, edits confirmed, and pieces broken so you can see volume during a warm-up. Respawn returns you to the start of the arena; Clear builds wipes the grid when you want a clean slate.',
    ],
  },
  {
    heading: 'How to use this as a Fortnite warm-up',
    paragraphs: [
      'Spend two to five minutes before you queue: lock the mouse, turn on infinite mats, and run a short routine — box yourself, edit a door and window, cone above, ramp out, break and rebuild. Then switch mats off if you want to feel the 10-mat cost pressure.',
      'This tool does not replace Fortnite Creative maps for tournament timing, piece HP, or scenario drills. It does give you a zero-friction way to rehearse binds, turbo-build, and edit paint when Creative is overkill. Pair it with our keybind guides and Creative codes when you are ready for higher-fidelity practice.',
    ],
    bullets: [
      'Warm-up: 50 turbo walls + floors, then 10 door/window edits',
      'Retake drill: ramp up, floor, wall, cone, edit out, rebuild',
      'Box fight drill: four walls, cone, edit peek, reset, repeat',
    ],
  },
]
