'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import dynamic from 'next/dynamic'
import {
  BUILD_BINDS,
  DEFAULT_MATS,
  HUD_CONTROLS,
  MAT_COLORS,
  MAT_ICONS,
  MAT_KEYS,
  MAT_LABELS,
  PHYSICS_PARITY_NOTE,
  PIECE_KEYS,
  PIECE_LABELS,
  canAfford,
  pieceHpNow,
  pieceMaxHp,
  pieceKey,
  spendMats,
  supportedPieceKeys,
  type BuildPiece,
  type MatType,
  type MatsState,
  type PieceType,
  type PlacementHint,
} from '@/lib/build-simulator'
import {
  applyEditSelection,
  cloneTiles,
  emptySelection,
  fullEditTiles,
  hasAnyTile,
  withDefaultTiles,
} from '@/lib/build-edits'
import { SimContext, useSim, type EditSession, type PracticeStats, type SimApi } from './sim-context'

const BuildCanvas = dynamic(() => import('./build-canvas').then((m) => m.BuildCanvas), {
  ssr: false,
  loading: () => (
    <div className="flex h-full min-h-[480px] items-center justify-center bg-[#6fa8d4] text-sm text-white/80">
      Loading 3D arena…
    </div>
  ),
})

const EMPTY_STATS: PracticeStats = { placed: 0, edited: 0, broken: 0 }

export function BuildSimulatorClient() {
  const [pieces, setPieces] = useState<BuildPiece[]>([])
  const [mats, setMats] = useState<MatsState>({ ...DEFAULT_MATS })
  const [selectedPiece, setSelectedPiece] = useState<PieceType>('wall')
  const [selectedMat, setSelectedMat] = useState<MatType>('wood')
  /** Training default: infinite mats so mechanics practice isn't interrupted. */
  const [infiniteMats, setInfiniteMats] = useState(true)
  const [locked, setLocked] = useState(false)
  const [rotOffset, setRotOffset] = useState(0)
  const [editSession, setEditSession] = useState<EditSession | null>(null)
  const [hoverEditTile, setHoverEditTile] = useState(-1)
  const [stats, setStats] = useState<PracticeStats>(EMPTY_STATS)
  const [respawnToken, setRespawnToken] = useState(0)
  const [aimedPieceId, setAimedPieceId] = useState<string | null>(null)
  const [pickaxeToken, setPickaxeToken] = useState(0)

  const piecesRef = useRef(pieces)
  const matsRef = useRef(mats)
  const selectedPieceRef = useRef(selectedPiece)
  const selectedMatRef = useRef(selectedMat)
  const infiniteRef = useRef(infiniteMats)
  const rotOffsetRef = useRef(rotOffset)
  const editSessionRef = useRef(editSession)
  const placementHintRef = useRef<PlacementHint>({ strafe: 0, forward: 0, airborne: false })
  piecesRef.current = pieces
  matsRef.current = mats
  selectedPieceRef.current = selectedPiece
  selectedMatRef.current = selectedMat
  infiniteRef.current = infiniteMats
  rotOffsetRef.current = rotOffset
  editSessionRef.current = editSession

  const beginEdit = useCallback((pieceId: string) => {
    const piece = piecesRef.current.find((p) => p.id === pieceId)
    if (!piece) return false
    const withTiles = withDefaultTiles(piece)
    setEditSession({
      pieceId,
      baseTiles: cloneTiles(withTiles.tiles!),
      selected: emptySelection(piece.type),
    })
    setHoverEditTile(-1)
    return true
  }, [])

  const setTileSelected = useCallback((index: number, selected: boolean) => {
    setEditSession((prev) => {
      if (!prev || index < 0 || index >= prev.selected.length) return prev
      if (!prev.baseTiles[index]) return prev // can't select a hole
      if (prev.selected[index] === selected) return prev
      const next = prev.selected.slice()
      next[index] = selected
      return { ...prev, selected: next }
    })
  }, [])

  const resetEditDraft = useCallback(() => {
    setEditSession((prev) => {
      if (!prev) return prev
      const piece = piecesRef.current.find((p) => p.id === prev.pieceId)
      if (!piece) return prev
      return {
        pieceId: prev.pieceId,
        baseTiles: fullEditTiles(piece.type),
        selected: emptySelection(piece.type),
      }
    })
  }, [])

  const confirmEdit = useCallback(() => {
    const session = editSessionRef.current
    if (!session) return
    const tiles = applyEditSelection(session.baseTiles, session.selected)
    if (!hasAnyTile(tiles)) {
      setPieces((prev) => {
        const next = prev.filter((p) => p.id !== session.pieceId)
        const supported = supportedPieceKeys(next)
        return next.filter((p) => supported.has(pieceKey(p)))
      })
      setStats((s) => ({ ...s, broken: s.broken + 1, edited: s.edited + 1 }))
    } else {
      setPieces((prev) =>
        prev.map((p) => (p.id === session.pieceId ? { ...p, tiles: cloneTiles(tiles) } : p))
      )
      setStats((s) => ({ ...s, edited: s.edited + 1 }))
    }
    setEditSession(null)
    setHoverEditTile(-1)
  }, [])

  const cancelEdit = useCallback(() => {
    setEditSession(null)
    setHoverEditTile(-1)
  }, [])

  const tryPlace = useCallback((draft: Omit<BuildPiece, 'id' | 'mat'>) => {
    if (editSessionRef.current) return false
    const mat = selectedMatRef.current
    const infinite = infiniteRef.current
    if (!canAfford(matsRef.current, mat, infinite)) return false
    const key = pieceKey(draft)
    if (piecesRef.current.some((p) => pieceKey(p) === key)) return false
    const next: BuildPiece = {
      ...draft,
      id: key,
      mat,
      tiles: fullEditTiles(draft.type),
      placedAt: Date.now(),
      damage: 0,
    }
    setPieces((prev) => [...prev, next])
    setMats((prev) => spendMats(prev, mat, infinite))
    setStats((s) => ({ ...s, placed: s.placed + 1 }))
    return true
  }, [])

  const destroyPiece = useCallback((pieceId: string) => {
    if (editSessionRef.current?.pieceId === pieceId) {
      setEditSession(null)
      setHoverEditTile(-1)
    }
    let removed = false
    setPieces((prev) => {
      if (!prev.some((p) => p.id === pieceId)) return prev
      removed = true
      const next = prev.filter((p) => p.id !== pieceId)
      const supported = supportedPieceKeys(next)
      return next.filter((p) => supported.has(pieceKey(p)))
    })
    if (removed) setStats((s) => ({ ...s, broken: s.broken + 1 }))
    return removed
  }, [])

  const damagePiece = useCallback((pieceId: string, amount: number) => {
    const piece = piecesRef.current.find((p) => p.id === pieceId)
    if (!piece) return 0
    const nextDamage = (piece.damage ?? 0) + amount
    const hp = pieceHpNow({ ...piece, damage: nextDamage })
    if (hp <= 0) {
      destroyPiece(pieceId)
      return 0
    }
    setPieces((prev) => prev.map((p) => (p.id === pieceId ? { ...p, damage: nextDamage } : p)))
    return hp
  }, [destroyPiece])

  const swingPickaxe = useCallback(() => {
    setPickaxeToken((n) => n + 1)
  }, [])

  const rotatePiece = useCallback((dir: 1 | -1 = 1) => {
    if (editSessionRef.current) return
    setRotOffset((r) => (r + dir + 4) % 4)
  }, [])

  const resetArena = useCallback(() => {
    setEditSession(null)
    setPieces([])
  }, [])
  const refillMats = useCallback(() => setMats({ ...DEFAULT_MATS }), [])
  const resetStats = useCallback(() => setStats(EMPTY_STATS), [])
  const requestRespawn = useCallback(() => setRespawnToken((n) => n + 1), [])

  const setLockedSafe = useCallback(
    (v: boolean) => {
      if (!v) cancelEdit()
      setLocked(v)
    },
    [cancelEdit]
  )

  const api = useMemo<SimApi>(
    () => ({
      pieces,
      mats,
      selectedPiece,
      selectedMat,
      infiniteMats,
      locked,
      rotOffset,
      editSession,
      hoverEditTile,
      setHoverEditTile,
      stats,
      setSelectedPiece,
      setSelectedMat,
      setInfiniteMats,
      setLocked: setLockedSafe,
      rotatePiece,
      tryPlace,
      destroyPiece,
      damagePiece,
      aimedPieceId,
      setAimedPieceId,
      pickaxeToken,
      swingPickaxe,
      beginEdit,
      setTileSelected,
      resetEditDraft,
      confirmEdit,
      cancelEdit,
      resetArena,
      refillMats,
      resetStats,
      respawnToken,
      requestRespawn,
      piecesRef,
      matsRef,
      selectedPieceRef,
      selectedMatRef,
      infiniteRef,
      rotOffsetRef,
      editSessionRef,
      placementHintRef,
    }),
    [
      pieces,
      mats,
      selectedPiece,
      selectedMat,
      infiniteMats,
      locked,
      rotOffset,
      editSession,
      hoverEditTile,
      stats,
      setLockedSafe,
      rotatePiece,
      tryPlace,
      destroyPiece,
      damagePiece,
      aimedPieceId,
      pickaxeToken,
      swingPickaxe,
      beginEdit,
      setTileSelected,
      resetEditDraft,
      confirmEdit,
      cancelEdit,
      resetArena,
      refillMats,
      resetStats,
      respawnToken,
      requestRespawn,
    ]
  )

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space') e.preventDefault()

      if (e.repeat) return
      const tag = (e.target as HTMLElement)?.tagName
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return

      if (e.code === BUILD_BINDS.edit) {
        e.preventDefault()
        // Hold G = enter / keep editing (edit-on-release confirms on keyup).
        window.dispatchEvent(new CustomEvent('buildsim-edit-down'))
        return
      }
      if (e.code === BUILD_BINDS.editReset) {
        e.preventDefault()
        if (editSessionRef.current) resetEditDraft()
        return
      }
      if (e.code === 'Escape' && editSessionRef.current) {
        e.preventDefault()
        cancelEdit()
        return
      }

      // Utility binds work even while editing (except they cancel edit first via clear/respawn).
      if (e.code === BUILD_BINDS.respawn) {
        e.preventDefault()
        requestRespawn()
        return
      }
      if (e.code === BUILD_BINDS.refill) {
        e.preventDefault()
        refillMats()
        return
      }
      if (e.code === BUILD_BINDS.clearBuilds) {
        e.preventDefault()
        resetArena()
        return
      }
      if (e.code === BUILD_BINDS.infiniteMats) {
        e.preventDefault()
        setInfiniteMats((v) => !v)
        return
      }

      if (editSessionRef.current) return

      const placeBind = (piece: PieceType) => {
        selectedPieceRef.current = piece
        setSelectedPiece(piece)
        window.dispatchEvent(new CustomEvent('buildsim-place-key', { detail: { piece } }))
      }

      if (e.code === BUILD_BINDS.wall) placeBind('wall')
      else if (e.code === BUILD_BINDS.floor) placeBind('floor')
      else if (e.code === BUILD_BINDS.ramp) placeBind('ramp')
      else if (e.code === BUILD_BINDS.cone) placeBind('cone')
      else if (e.code === BUILD_BINDS.matWood) setSelectedMat('wood')
      else if (e.code === BUILD_BINDS.matBrick) setSelectedMat('brick')
      else if (e.code === BUILD_BINDS.matMetal) setSelectedMat('metal')
      else if (e.code === BUILD_BINDS.rotate) {
        e.preventDefault()
        rotatePiece(1)
      }
    }
    const onKeyUp = (e: KeyboardEvent) => {
      if (e.code === BUILD_BINDS.edit) {
        e.preventDefault()
        window.dispatchEvent(new CustomEvent('buildsim-edit-up'))
      }
    }
    window.addEventListener('keydown', onKeyDown, { passive: false })
    window.addEventListener('keyup', onKeyUp, { passive: false })
    return () => {
      window.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('keyup', onKeyUp)
    }
  }, [rotatePiece, resetEditDraft, cancelEdit, requestRespawn, refillMats, resetArena])

  return (
    <SimContext.Provider value={api}>
      <div
        data-build-sim
        className="relative overflow-hidden overscroll-none rounded-xl border border-border bg-[#6fa8d4]"
      >
        <div className="relative h-[min(72vh,720px)] min-h-[480px] w-full">
          <BuildCanvas />
        </div>
        <BuildHud />
      </div>

      <p className="mt-4 max-w-3xl text-xs leading-relaxed text-muted-foreground">{PHYSICS_PARITY_NOTE}</p>
    </SimContext.Provider>
  )
}

function PieceGlyph({ type, color }: { type: PieceType; color: string }) {
  if (type === 'wall') {
    return (
      <svg viewBox="0 0 40 40" className="h-9 w-9" aria-hidden>
        <rect x="7" y="5" width="26" height="30" rx="1.5" fill={color} stroke="#111" strokeWidth="1.4" />
        <rect x="10" y="8" width="20" height="24" fill="none" stroke="#000" strokeOpacity="0.28" />
        <path d="M7 20h26M20 5v30" stroke="#000" strokeOpacity="0.18" />
      </svg>
    )
  }
  if (type === 'floor') {
    return (
      <svg viewBox="0 0 40 40" className="h-9 w-9" aria-hidden>
        <rect x="5" y="12" width="30" height="16" rx="1" fill={color} stroke="#111" strokeWidth="1.4" />
        <path d="M5 20h30M20 12v16" stroke="#000" strokeOpacity="0.2" />
      </svg>
    )
  }
  if (type === 'ramp') {
    return (
      <svg viewBox="0 0 40 40" className="h-9 w-9" aria-hidden>
        <path d="M6 32 L34 8 v8 L14 32z" fill={color} stroke="#111" strokeWidth="1.4" />
        <path d="M10 32 L34 12" stroke="#000" strokeOpacity="0.22" />
      </svg>
    )
  }
  return (
    <svg viewBox="0 0 40 40" className="h-9 w-9" aria-hidden>
      <path d="M20 6 L34 32 H6z" fill={color} stroke="#111" strokeWidth="1.4" />
      <path d="M20 10 L30 30 H10z" fill="none" stroke="#000" strokeOpacity="0.22" />
    </svg>
  )
}

function MatPips({ count, infinite }: { count: number; infinite: boolean }) {
  const filled = infinite ? 10 : Math.min(10, Math.round(count / 50))
  return (
    <div className="flex gap-px">
      {Array.from({ length: 10 }, (_, i) => (
        <span
          key={i}
          className={`h-1.5 w-1.5 rounded-[1px] ${i < filled ? 'bg-white' : 'bg-white/20'}`}
        />
      ))}
    </div>
  )
}

function BuildHud() {
  const {
    mats,
    selectedPiece,
    selectedMat,
    infiniteMats,
    locked,
    rotOffset,
    editSession,
    stats,
    pieces: worldPieces,
    aimedPieceId,
    setSelectedPiece,
    setSelectedMat,
    setInfiniteMats,
    resetArena,
    refillMats,
    rotatePiece,
    resetEditDraft,
    confirmEdit,
    cancelEdit,
    resetStats,
    requestRespawn,
  } = useSim()

  const pieces: PieceType[] = ['wall', 'floor', 'ramp', 'cone']
  const matTypes: MatType[] = ['wood', 'brick', 'metal']
  const glyphColor = MAT_COLORS[selectedMat]
  const aimed = worldPieces.find((p) => p.id === aimedPieceId)
  const aimedHp = aimed ? pieceHpNow(aimed) : 0
  const aimedMax = aimed ? pieceMaxHp(aimed.mat) : 1

  return (
    <>
      {!locked && (
        <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center">
          <p className="rounded-lg bg-black/75 px-4 py-2 text-sm font-medium text-white shadow-lg">
            Click arena to lock mouse — hold click to turbo-build · RMB pickaxe · G edit
          </p>
        </div>
      )}

      {editSession && (
        <div className="pointer-events-none absolute left-1/2 top-14 z-20 -translate-x-1/2 rounded-lg border border-sky-400/50 bg-black/80 px-3 py-2 text-center text-xs text-white shadow-lg">
          <p className="font-bold uppercase tracking-wide text-sky-300">Edit mode</p>
          <p className="mt-0.5 text-white/75">
            Select blue tiles to remove · release G to confirm · T reset · Esc cancel
          </p>
          <div className="pointer-events-auto mt-2 flex justify-center gap-2">
            <button
              type="button"
              onClick={confirmEdit}
              className="rounded border border-sky-400/60 bg-sky-500/25 px-2 py-1 text-[10px] font-semibold text-sky-100"
            >
              Confirm
            </button>
            <button
              type="button"
              onClick={resetEditDraft}
              className="rounded border border-white/25 bg-white/10 px-2 py-1 text-[10px] font-semibold text-white/85"
            >
              Reset (T)
            </button>
            <button
              type="button"
              onClick={cancelEdit}
              className="rounded border border-white/25 bg-white/10 px-2 py-1 text-[10px] font-semibold text-white/85"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {locked && aimed && (
        <div className="pointer-events-none absolute left-1/2 top-[18%] z-20 w-40 -translate-x-1/2">
          <div className="mb-0.5 flex justify-between text-[10px] font-bold uppercase tracking-wide text-white/80">
            <span>{MAT_LABELS[aimed.mat]} {PIECE_LABELS[aimed.type]}</span>
            <span>
              {aimedHp}/{aimedMax}
            </span>
          </div>
          <div className="h-1.5 overflow-hidden rounded-sm bg-black/70 ring-1 ring-black/50">
            <div
              className="h-full bg-lime-400"
              style={{ width: `${Math.max(0, Math.min(100, (aimedHp / aimedMax) * 100))}%` }}
            />
          </div>
        </div>
      )}

      <div className="pointer-events-none absolute right-3 top-3 z-20 flex flex-col items-end gap-1.5">
        <div className="pointer-events-auto flex flex-wrap justify-end gap-1.5">
          <button
            type="button"
            onClick={() => rotatePiece(1)}
            className="rounded border border-white/20 bg-black/55 px-2 py-1 text-[10px] font-semibold text-white/80 hover:bg-black/70"
          >
            R · {rotOffset * 90}°
          </button>
          <button
            type="button"
            onClick={() => setInfiniteMats(!infiniteMats)}
            className={`rounded border px-2 py-1 text-[10px] font-semibold ${
              infiniteMats
                ? 'border-amber-400/60 bg-amber-400/20 text-amber-100'
                : 'border-white/20 bg-black/55 text-white/75 hover:bg-black/70'
            }`}
          >
            ∞ mats
          </button>
          <button
            type="button"
            onClick={requestRespawn}
            className="rounded border border-white/20 bg-black/55 px-2 py-1 text-[10px] font-semibold text-white/75 hover:bg-black/70"
          >
            Respawn
          </button>
          <button
            type="button"
            onClick={refillMats}
            className="rounded border border-white/20 bg-black/55 px-2 py-1 text-[10px] font-semibold text-white/75 hover:bg-black/70"
          >
            Refill
          </button>
          <button
            type="button"
            onClick={resetArena}
            className="rounded border border-white/20 bg-black/55 px-2 py-1 text-[10px] font-semibold text-white/75 hover:bg-black/70"
          >
            Clear
          </button>
        </div>
        {locked && (
          <div className="rounded border border-white/10 bg-black/55 px-2 py-1 text-[10px] text-white/80">
            <span className="text-sky-300">{stats.placed}</span>
            <span className="mx-1 text-white/25">·</span>
            <span className="text-amber-200">{stats.edited}</span>
            <span className="mx-1 text-white/25">·</span>
            <span className="text-red-300">{stats.broken}</span>
            <button
              type="button"
              onClick={resetStats}
              className="pointer-events-auto ml-2 text-white/40 underline-offset-2 hover:text-white/80 hover:underline"
            >
              reset
            </button>
          </div>
        )}
      </div>

      {!locked && (
        <div className="pointer-events-none absolute bottom-24 left-3 z-20 hidden max-w-[220px] rounded-md border border-white/10 bg-black/60 p-2 text-[10px] leading-snug text-white/80 sm:block">
          <ul className="space-y-0.5">
            {HUD_CONTROLS.slice(0, 6).map((row) => (
              <li key={row.action} className="flex gap-2">
                <span className="shrink-0 font-mono text-amber-200">{row.keys}</span>
                <span className="text-white/65">{row.action}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="pointer-events-none absolute bottom-3 left-1/2 z-20 flex -translate-x-1/2 items-end gap-2">
        <div className="flex flex-col gap-1">
          {matTypes.map((m) => {
            const active = selectedMat === m
            return (
              <button
                key={m}
                type="button"
                onClick={() => setSelectedMat(m)}
                className={`pointer-events-auto flex items-center gap-1.5 rounded-sm border px-1.5 py-1 ${
                  active
                    ? 'border-white/80 bg-black/75 ring-1 ring-white/50'
                    : 'border-white/15 bg-black/55 hover:bg-black/70'
                }`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={MAT_ICONS[m]}
                  alt={MAT_LABELS[m]}
                  width={22}
                  height={22}
                  className="h-[22px] w-[22px] object-contain drop-shadow"
                  draggable={false}
                />
                <span className="flex min-w-[2.4rem] flex-col items-start leading-none">
                  <span className="text-[9px] font-bold text-white/45">{MAT_KEYS[m]}</span>
                  <span className="text-[11px] font-bold tabular-nums text-white">
                    {infiniteMats ? '∞' : mats[m]}
                  </span>
                  <MatPips count={mats[m]} infinite={infiniteMats} />
                </span>
              </button>
            )
          })}
        </div>

        <div className="flex items-end gap-1 rounded-sm border border-white/15 bg-black/55 p-1">
          {pieces.map((p) => {
            const active = selectedPiece === p
            return (
              <button
                key={p}
                type="button"
                onClick={() => setSelectedPiece(p)}
                className={`pointer-events-auto flex w-[4.4rem] flex-col items-center rounded-sm border px-1 py-1.5 ${
                  active
                    ? 'border-white bg-white/15 shadow-[0_0_0_1px_rgba(255,255,255,0.35)]'
                    : 'border-white/10 bg-black/40 hover:bg-black/60'
                }`}
              >
                <PieceGlyph type={p} color={active ? glyphColor : '#9ca3af'} />
                <span className="mt-0.5 text-[9px] font-bold uppercase tracking-wider text-white/50">
                  {PIECE_KEYS[p]}
                </span>
              </button>
            )
          })}
        </div>
      </div>

      {locked && (
        <div className="pointer-events-none absolute left-1/2 top-1/2 z-20 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white shadow-[0_0_0_1px_rgba(0,0,0,0.6)]" />
      )}
    </>
  )
}
