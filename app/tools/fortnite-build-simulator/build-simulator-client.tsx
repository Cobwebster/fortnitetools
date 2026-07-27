'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import dynamic from 'next/dynamic'
import {
  BUILD_BINDS,
  DEFAULT_MATS,
  HUD_CONTROLS,
  MAT_ICONS,
  MAT_KEYS,
  MAT_LABELS,
  PHYSICS_PARITY_NOTE,
  PIECE_COST,
  PIECE_KEYS,
  PIECE_LABELS,
  canAfford,
  pieceKey,
  spendMats,
  supportedPieceKeys,
  type BuildPiece,
  type MatType,
  type MatsState,
  type PieceType,
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

  const piecesRef = useRef(pieces)
  const matsRef = useRef(mats)
  const selectedPieceRef = useRef(selectedPiece)
  const selectedMatRef = useRef(selectedMat)
  const infiniteRef = useRef(infiniteMats)
  const rotOffsetRef = useRef(rotOffset)
  const editSessionRef = useRef(editSession)
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
      <div className="relative overflow-hidden rounded-xl border border-border bg-[#6fa8d4]">
        <div className="relative h-[min(72vh,720px)] min-h-[480px] w-full">
          <BuildCanvas />
        </div>
        <BuildHud />
      </div>

      <p className="mt-4 max-w-3xl text-xs leading-relaxed text-muted-foreground">{PHYSICS_PARITY_NOTE}</p>
    </SimContext.Provider>
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

  return (
    <>
      {!locked && (
        <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center">
          <p className="rounded-lg bg-black/75 px-4 py-2 text-sm font-medium text-white shadow-lg">
            Click arena to lock mouse — hold click to turbo-build · RMB break · G edit
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

      {/* Mats + tools */}
      <div className="pointer-events-none absolute left-3 top-3 right-3 z-20 flex flex-wrap items-start justify-between gap-2">
        <div className="pointer-events-auto flex flex-wrap gap-2">
          {matTypes.map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => setSelectedMat(m)}
              className={`flex items-center gap-2 rounded-md border px-2 py-1.5 text-xs font-semibold uppercase tracking-wide transition ${
                selectedMat === m
                  ? 'border-white/80 bg-black/70 text-white ring-1 ring-white/40'
                  : 'border-white/20 bg-black/55 text-white/85 hover:bg-black/70'
              }`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={MAT_ICONS[m]}
                alt=""
                width={28}
                height={28}
                className="h-7 w-7 object-contain drop-shadow"
                draggable={false}
              />
              <span className="flex flex-col items-start leading-tight">
                <span className="text-[10px] text-white/55">{MAT_KEYS[m]}</span>
                <span>
                  {MAT_LABELS[m]} {infiniteMats ? '∞' : mats[m]}
                </span>
              </span>
            </button>
          ))}
        </div>
        <div className="pointer-events-auto flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => rotatePiece(1)}
            className="rounded-md border border-white/20 bg-black/55 px-2.5 py-1.5 text-xs font-semibold text-white/85 hover:bg-black/70"
          >
            Rotate (R) · {rotOffset * 90}°
          </button>
          <button
            type="button"
            onClick={() => setInfiniteMats(!infiniteMats)}
            className={`rounded-md border px-2.5 py-1.5 text-xs font-semibold transition ${
              infiniteMats
                ? 'border-amber-400/60 bg-amber-400/20 text-amber-100'
                : 'border-white/20 bg-black/55 text-white/80 hover:bg-black/70'
            }`}
          >
            Infinite mats (I)
          </button>
          <button
            type="button"
            onClick={requestRespawn}
            className="rounded-md border border-white/20 bg-black/55 px-2.5 py-1.5 text-xs font-semibold text-white/80 hover:bg-black/70"
          >
            Respawn (B)
          </button>
          <button
            type="button"
            onClick={refillMats}
            className="rounded-md border border-white/20 bg-black/55 px-2.5 py-1.5 text-xs font-semibold text-white/80 hover:bg-black/70"
          >
            Refill (M)
          </button>
          <button
            type="button"
            onClick={resetArena}
            className="rounded-md border border-white/20 bg-black/55 px-2.5 py-1.5 text-xs font-semibold text-white/80 hover:bg-black/70"
          >
            Clear builds (X)
          </button>
        </div>
      </div>

      {/* Practice counters */}
      {locked && (
        <div className="pointer-events-none absolute right-3 top-14 z-20 rounded-md border border-white/15 bg-black/65 px-2.5 py-1.5 text-[10px] text-white/85">
          <span className="text-sky-300">{stats.placed}</span> placed
          <span className="mx-1.5 text-white/30">·</span>
          <span className="text-amber-200">{stats.edited}</span> edits
          <span className="mx-1.5 text-white/30">·</span>
          <span className="text-red-300">{stats.broken}</span> broken
          <button
            type="button"
            onClick={resetStats}
            className="pointer-events-auto ml-2 text-white/45 underline-offset-2 hover:text-white/80 hover:underline"
          >
            reset
          </button>
        </div>
      )}

      {/* On-screen controls */}
      <div className="pointer-events-none absolute bottom-20 left-3 z-20 hidden max-w-[240px] rounded-lg border border-white/15 bg-black/70 p-2.5 text-[11px] leading-snug text-white/90 sm:block">
        <p className="mb-1.5 text-[10px] font-bold uppercase tracking-wider text-sky-300">Controls</p>
        <ul className="space-y-1">
          {HUD_CONTROLS.map((row) => (
            <li key={row.action} className="flex gap-2">
              <span className="shrink-0 font-mono font-semibold text-amber-200">{row.keys}</span>
              <span className="text-white/75">{row.action}</span>
            </li>
          ))}
        </ul>
        <p className="mt-2 text-[10px] text-white/45">
          Blue hologram = place · red = blocked · {PIECE_COST} mats/piece
        </p>
      </div>

      <div className="pointer-events-none absolute bottom-20 left-3 right-3 z-20 rounded-lg border border-white/15 bg-black/70 p-2 text-[10px] text-white/85 sm:hidden">
        Hold click turbo · Q/F/C/V place · RMB break · G edit · Ctrl crouch
      </div>

      {/* Piece select */}
      <div className="pointer-events-none absolute bottom-3 left-1/2 z-20 flex -translate-x-1/2 gap-2">
        {pieces.map((p) => (
          <button
            key={p}
            type="button"
            onClick={() => setSelectedPiece(p)}
            className={`pointer-events-auto min-w-[4.25rem] rounded-lg border px-2.5 py-2 text-center transition ${
              selectedPiece === p
                ? 'border-sky-400 bg-sky-500/30 text-white'
                : 'border-white/20 bg-black/60 text-white/75 hover:bg-black/75'
            }`}
          >
            <span className="block text-[10px] font-bold text-amber-200">{PIECE_KEYS[p]}</span>
            <span className="text-xs font-bold uppercase tracking-wide">{PIECE_LABELS[p]}</span>
          </button>
        ))}
      </div>

      {locked && (
        <div className="pointer-events-none absolute left-1/2 top-1/2 z-20 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white shadow-[0_0_0_1px_rgba(0,0,0,0.6)]" />
      )}
    </>
  )
}
