'use client'

import { createContext, useContext, type MutableRefObject } from 'react'
import type { BuildPiece, MatType, MatsState, PieceType, PlacementHint } from '@/lib/build-simulator'

/**
 * Fortnite edit session:
 * - baseTiles = material present when edit opened (or after reset)
 * - selected = tiles marked to REMOVE (blue → brighter when selected)
 */
export type EditSession = {
  pieceId: string
  baseTiles: boolean[]
  selected: boolean[]
}

export type PracticeStats = {
  placed: number
  edited: number
  broken: number
}

export type SimApi = {
  pieces: BuildPiece[]
  mats: MatsState
  selectedPiece: PieceType
  selectedMat: MatType
  infiniteMats: boolean
  locked: boolean
  rotOffset: number
  editSession: EditSession | null
  /** Tile under crosshair while editing (-1 if none). */
  hoverEditTile: number
  setHoverEditTile: (i: number) => void
  stats: PracticeStats
  setSelectedPiece: (t: PieceType) => void
  setSelectedMat: (m: MatType) => void
  setInfiniteMats: (v: boolean) => void
  setLocked: (v: boolean) => void
  rotatePiece: (dir?: 1 | -1) => void
  tryPlace: (draft: Omit<BuildPiece, 'id' | 'mat'>) => boolean
  destroyPiece: (pieceId: string) => boolean
  /** Pickaxe hit — returns remaining HP, or 0 if the piece (and cascade) died. */
  damagePiece: (pieceId: string, amount: number) => number
  aimedPieceId: string | null
  setAimedPieceId: (id: string | null) => void
  pickaxeToken: number
  swingPickaxe: () => void
  beginEdit: (pieceId: string) => boolean
  /** Mark/unmark tile for removal (FN select). */
  setTileSelected: (index: number, selected: boolean) => void
  resetEditDraft: () => void
  confirmEdit: () => void
  cancelEdit: () => void
  resetArena: () => void
  refillMats: () => void
  resetStats: () => void
  respawnToken: number
  requestRespawn: () => void
  piecesRef: MutableRefObject<BuildPiece[]>
  matsRef: MutableRefObject<MatsState>
  selectedPieceRef: MutableRefObject<PieceType>
  selectedMatRef: MutableRefObject<MatType>
  infiniteRef: MutableRefObject<boolean>
  rotOffsetRef: MutableRefObject<number>
  editSessionRef: MutableRefObject<EditSession | null>
  placementHintRef: MutableRefObject<PlacementHint>
}

export const SimContext = createContext<SimApi | null>(null)

export function useSim() {
  const ctx = useContext(SimContext)
  if (!ctx) throw new Error('useSim outside provider')
  return ctx
}
