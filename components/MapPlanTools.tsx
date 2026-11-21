'use client'

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type Dispatch,
  type SetStateAction,
} from 'react'
import { createPortal } from 'react-dom'
import { useMap, useMapEvents } from 'react-leaflet'
import L from 'leaflet'
import {
  Download,
  Eraser,
  Loader2,
  MapPin,
  MousePointer2,
  Pencil,
  Slash,
  Trash2,
  Undo2,
} from 'lucide-react'
import { MAP_HALF } from '@/lib/map-data'
import { cn } from '@/lib/utils'

export type PlanTool = 'pan' | 'draw' | 'line' | 'pin' | 'erase'

export type LatLngTuple = [number, number]

export type PlanShape =
  | {
      id: string
      kind: 'path'
      color: string
      width: number
      points: LatLngTuple[]
    }
  | {
      id: string
      kind: 'line'
      color: string
      width: number
      a: LatLngTuple
      b: LatLngTuple
    }
  | {
      id: string
      kind: 'pin'
      color: string
      point: LatLngTuple
      label: string
    }

export const PLAN_COLORS = [
  '#fbbf24',
  '#ef4444',
  '#22d3ee',
  '#ffffff',
  '#4ade80',
  '#a78bfa',
] as const

const MIN_PATH_POINTS = 2
const ERASE_HIT_PX = 18

function uid() {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`
}

function latLngToMapPx(ll: LatLngTuple, size: number): { x: number; y: number } {
  // CRS.Simple: lat = -worldY, lng = worldX. Image: north up.
  const lng = ll[1]
  const lat = ll[0]
  const worldX = lng
  const worldY = -lat
  return {
    x: ((worldX + MAP_HALF) / (MAP_HALF * 2)) * size,
    y: ((worldY + MAP_HALF) / (MAP_HALF * 2)) * size,
  }
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.decoding = 'async'
    img.onload = () => resolve(img)
    img.onerror = () => reject(new Error('Failed to load map image'))
    img.src = src
  })
}

function exportableMapUrl(mapUrl: string): string {
  if (mapUrl.startsWith('/')) return mapUrl
  if (mapUrl.startsWith('https://fortnite-api.com/') || mapUrl.startsWith('https://cdn.fortnite-api.com/')) {
    return `/api/fortnite-map-image?url=${encodeURIComponent(mapUrl)}`
  }
  return mapUrl
}

function dist2(a: { x: number; y: number }, b: { x: number; y: number }) {
  const dx = a.x - b.x
  const dy = a.y - b.y
  return dx * dx + dy * dy
}

function hitShape(
  map: L.Map,
  shapes: PlanShape[],
  containerPoint: L.Point
): string | null {
  const threshold = ERASE_HIT_PX * ERASE_HIT_PX
  for (let i = shapes.length - 1; i >= 0; i--) {
    const shape = shapes[i]!
    if (shape.kind === 'pin') {
      const p = map.latLngToContainerPoint(shape.point)
      if (dist2(p, containerPoint) <= threshold * 1.6) return shape.id
    } else if (shape.kind === 'line') {
      const a = map.latLngToContainerPoint(shape.a)
      const b = map.latLngToContainerPoint(shape.b)
      const steps = 24
      for (let s = 0; s <= steps; s++) {
        const t = s / steps
        const x = a.x + (b.x - a.x) * t
        const y = a.y + (b.y - a.y) * t
        if (dist2({ x, y }, containerPoint) <= threshold) return shape.id
      }
    } else {
      for (const pt of shape.points) {
        const p = map.latLngToContainerPoint(pt)
        if (dist2(p, containerPoint) <= threshold) return shape.id
      }
    }
  }
  return null
}

function paintShapes(
  ctx: CanvasRenderingContext2D,
  shapes: PlanShape[],
  size: number
) {
  for (const shape of shapes) {
    if (shape.kind === 'path' && shape.points.length >= 2) {
      ctx.beginPath()
      ctx.strokeStyle = shape.color
      ctx.lineWidth = Math.max(2, (shape.width / 900) * size)
      ctx.lineCap = 'round'
      ctx.lineJoin = 'round'
      const first = latLngToMapPx(shape.points[0]!, size)
      ctx.moveTo(first.x, first.y)
      for (let i = 1; i < shape.points.length; i++) {
        const p = latLngToMapPx(shape.points[i]!, size)
        ctx.lineTo(p.x, p.y)
      }
      ctx.stroke()
    } else if (shape.kind === 'line') {
      ctx.beginPath()
      ctx.strokeStyle = shape.color
      ctx.lineWidth = Math.max(2, (shape.width / 900) * size)
      ctx.lineCap = 'round'
      const a = latLngToMapPx(shape.a, size)
      const b = latLngToMapPx(shape.b, size)
      ctx.moveTo(a.x, a.y)
      ctx.lineTo(b.x, b.y)
      ctx.stroke()
      // arrow head
      const angle = Math.atan2(b.y - a.y, b.x - a.x)
      const head = Math.max(10, size * 0.012)
      ctx.beginPath()
      ctx.moveTo(b.x, b.y)
      ctx.lineTo(
        b.x - head * Math.cos(angle - Math.PI / 6),
        b.y - head * Math.sin(angle - Math.PI / 6)
      )
      ctx.lineTo(
        b.x - head * Math.cos(angle + Math.PI / 6),
        b.y - head * Math.sin(angle + Math.PI / 6)
      )
      ctx.closePath()
      ctx.fillStyle = shape.color
      ctx.fill()
    } else if (shape.kind === 'pin') {
      const p = latLngToMapPx(shape.point, size)
      const r = Math.max(10, size * 0.011)
      ctx.beginPath()
      ctx.fillStyle = shape.color
      ctx.strokeStyle = 'rgba(0,0,0,.75)'
      ctx.lineWidth = Math.max(2, size * 0.002)
      ctx.arc(p.x, p.y, r, 0, Math.PI * 2)
      ctx.fill()
      ctx.stroke()
      ctx.fillStyle = '#0b1220'
      ctx.font = `700 ${Math.max(11, size * 0.014)}px Barlow Condensed, Barlow, system-ui, sans-serif`
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillText(shape.label, p.x, p.y + 0.5)
    }
  }
}

export async function downloadMapPlan(opts: {
  mapUrl: string
  shapes: PlanShape[]
  filename?: string
}) {
  const src = exportableMapUrl(opts.mapUrl)
  const img = await loadImage(src)
  const size = Math.max(img.naturalWidth || 1024, img.naturalHeight || 1024)
  const canvas = document.createElement('canvas')
  canvas.width = size
  canvas.height = size
  const ctx = canvas.getContext('2d')
  if (!ctx) throw new Error('Canvas unavailable')
  ctx.fillStyle = '#07111f'
  ctx.fillRect(0, 0, size, size)
  ctx.drawImage(img, 0, 0, size, size)
  paintShapes(ctx, opts.shapes, size)

  // Watermark
  ctx.fillStyle = 'rgba(255,255,255,.55)'
  ctx.font = `600 ${Math.max(14, size * 0.016)}px system-ui, sans-serif`
  ctx.textAlign = 'left'
  ctx.textBaseline = 'bottom'
  ctx.fillText('FortniteTools.com · drop plan', 16, size - 16)

  const blob = await new Promise<Blob | null>((resolve) =>
    canvas.toBlob(resolve, 'image/png')
  )
  if (!blob) throw new Error('Export failed')
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = opts.filename ?? `fortnite-drop-plan-${Date.now()}.png`
  document.body.appendChild(a)
  a.click()
  a.remove()
  URL.revokeObjectURL(url)
}

type ToolbarProps = {
  tool: PlanTool
  setTool: Dispatch<SetStateAction<PlanTool>>
  color: string
  setColor: Dispatch<SetStateAction<string>>
  width: number
  setWidth: Dispatch<SetStateAction<number>>
  shapes: PlanShape[]
  onUndo: () => void
  onClear: () => void
  onDownload: () => void
  downloading: boolean
  className?: string
}

export function MapPlanToolbar({
  tool,
  setTool,
  color,
  setColor,
  width,
  setWidth,
  shapes,
  onUndo,
  onClear,
  onDownload,
  downloading,
  className,
}: ToolbarProps) {
  const tools: { id: PlanTool; label: string; icon: typeof Pencil }[] = [
    { id: 'pan', label: 'Pan', icon: MousePointer2 },
    { id: 'draw', label: 'Draw', icon: Pencil },
    { id: 'line', label: 'Route', icon: Slash },
    { id: 'pin', label: 'Pin', icon: MapPin },
    { id: 'erase', label: 'Erase', icon: Eraser },
  ]

  return (
    <div
      className={cn(
        'pointer-events-auto flex flex-wrap items-center gap-1.5 rounded-xl border border-border/80 bg-card/95 p-1.5 shadow-lg backdrop-blur-sm',
        className
      )}
      role="toolbar"
      aria-label="Drop plan tools"
    >
      {tools.map((t) => {
        const Icon = t.icon
        const active = tool === t.id
        return (
          <button
            key={t.id}
            type="button"
            title={t.label}
            aria-pressed={active}
            onClick={() => setTool(t.id)}
            className={cn(
              'inline-flex h-8 items-center gap-1.5 rounded-lg px-2.5 text-[11px] font-bold uppercase tracking-wider transition-colors',
              active
                ? 'bg-primary text-primary-foreground'
                : 'text-muted-foreground hover:bg-muted hover:text-foreground'
            )}
          >
            <Icon className="h-3.5 w-3.5" aria-hidden />
            <span className="hidden sm:inline">{t.label}</span>
          </button>
        )
      })}

      <span className="mx-0.5 hidden h-5 w-px bg-border sm:block" aria-hidden />

      <div className="flex items-center gap-1 px-1">
        {PLAN_COLORS.map((c) => (
          <button
            key={c}
            type="button"
            title="Color"
            aria-label={`Color ${c}`}
            aria-pressed={color === c}
            onClick={() => setColor(c)}
            className={cn(
              'h-5 w-5 rounded-full border-2 transition-transform',
              color === c ? 'scale-110 border-white' : 'border-transparent opacity-80 hover:opacity-100'
            )}
            style={{ background: c }}
          />
        ))}
      </div>

      <label className="hidden items-center gap-1.5 px-1 text-[10px] font-bold uppercase tracking-wider text-muted-foreground sm:flex">
        Size
        <input
          type="range"
          min={2}
          max={10}
          value={width}
          onChange={(e) => setWidth(Number(e.target.value))}
          className="w-16 accent-[var(--primary)]"
        />
      </label>

      <span className="mx-0.5 hidden h-5 w-px bg-border sm:block" aria-hidden />

      <button
        type="button"
        title="Undo"
        disabled={shapes.length === 0}
        onClick={onUndo}
        className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground disabled:opacity-35"
      >
        <Undo2 className="h-3.5 w-3.5" aria-hidden />
      </button>
      <button
        type="button"
        title="Clear plan"
        disabled={shapes.length === 0}
        onClick={onClear}
        className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground disabled:opacity-35"
      >
        <Trash2 className="h-3.5 w-3.5" aria-hidden />
      </button>
      <button
        type="button"
        title="Download PNG"
        disabled={downloading}
        onClick={onDownload}
        className="inline-flex h-8 items-center gap-1.5 rounded-lg bg-foreground px-2.5 text-[11px] font-bold uppercase tracking-wider text-background hover:opacity-90 disabled:opacity-50"
      >
        {downloading ? (
          <Loader2 className="h-3.5 w-3.5 animate-spin" aria-hidden />
        ) : (
          <Download className="h-3.5 w-3.5" aria-hidden />
        )}
        <span className="hidden sm:inline">Download</span>
      </button>
    </div>
  )
}

type LayerProps = {
  tool: PlanTool
  color: string
  width: number
  shapes: PlanShape[]
  setShapes: Dispatch<SetStateAction<PlanShape[]>>
}

/** Leaflet-bound drawing layer: stores strokes in lat/lng so pan/zoom keeps them. */
export function MapPlanLayer({ tool, color, width, shapes, setShapes }: LayerProps) {
  const map = useMap()
  const hostRef = useRef<HTMLDivElement | null>(null)
  const [, setHostReady] = useState(false)
  const [tick, setTick] = useState(0)
  const drawing = useRef(false)
  const draftPath = useRef<LatLngTuple[]>([])
  const shapesRef = useRef(shapes)
  const toolRef = useRef(tool)
  const colorRef = useRef(color)
  const widthRef = useRef(width)
  const lineStartRef = useRef<LatLngTuple | null>(null)
  const [draft, setDraft] = useState<LatLngTuple[] | null>(null)
  const [lineStart, setLineStart] = useState<LatLngTuple | null>(null)
  const [hover, setHover] = useState<LatLngTuple | null>(null)

  shapesRef.current = shapes
  toolRef.current = tool
  colorRef.current = color
  widthRef.current = width
  lineStartRef.current = lineStart

  const pinCount = useMemo(
    () => shapes.filter((s) => s.kind === 'pin').length,
    [shapes]
  )
  const pinCountRef = useRef(pinCount)
  pinCountRef.current = pinCount

  useEffect(() => {
    const host = L.DomUtil.create('div', 'fn-plan-layer') as HTMLDivElement
    host.style.cssText =
      'position:absolute;inset:0;z-index:450;overflow:hidden;touch-action:none;'
    map.getContainer().appendChild(host)
    hostRef.current = host
    setHostReady(true)
    return () => {
      host.remove()
      hostRef.current = null
    }
  }, [map])

  useEffect(() => {
    const host = hostRef.current
    if (!host) return
    host.style.pointerEvents = tool === 'pan' ? 'none' : 'auto'
    host.style.cursor =
      tool === 'pan' ? '' : tool === 'erase' ? 'cell' : 'crosshair'
  }, [tool])

  useEffect(() => {
    if (tool === 'pan') {
      map.dragging.enable()
      map.boxZoom.enable()
      map.doubleClickZoom.enable()
    } else {
      map.dragging.disable()
      map.boxZoom.disable()
      map.doubleClickZoom.disable()
    }
    return () => {
      map.dragging.enable()
      map.boxZoom.enable()
      map.doubleClickZoom.enable()
    }
  }, [map, tool])

  useEffect(() => {
    if (tool !== 'line') {
      setLineStart(null)
      setHover(null)
    }
  }, [tool])

  const eventPoint = useCallback(
    (e: PointerEvent): { ll: LatLngTuple; container: L.Point } => {
      const rect = map.getContainer().getBoundingClientRect()
      const container = L.point(e.clientX - rect.left, e.clientY - rect.top)
      const latlng = map.containerPointToLatLng(container)
      return { ll: [latlng.lat, latlng.lng], container }
    },
    [map]
  )

  useEffect(() => {
    const host = hostRef.current
    if (!host) return

    const onPointerDown = (e: PointerEvent) => {
      if (toolRef.current === 'pan' || e.button !== 0) return
      e.preventDefault()
      e.stopPropagation()
      host.setPointerCapture(e.pointerId)
      const { ll, container } = eventPoint(e)
      if (toolRef.current === 'draw') {
        drawing.current = true
        draftPath.current = [ll]
        setDraft([ll])
      } else if (toolRef.current === 'erase') {
        const id = hitShape(map, shapesRef.current, container)
        if (id) setShapes((prev) => prev.filter((s) => s.id !== id))
      }
    }

    const onPointerMove = (e: PointerEvent) => {
      const { ll } = eventPoint(e)
      if (toolRef.current === 'line' && lineStartRef.current) {
        setHover(ll)
      }
      if (!drawing.current || toolRef.current !== 'draw') return
      const last = draftPath.current[draftPath.current.length - 1]
      if (last) {
        const a = map.latLngToContainerPoint(last)
        const b = map.latLngToContainerPoint(ll)
        if (dist2(a, b) < 4) return
      }
      draftPath.current.push(ll)
      setDraft([...draftPath.current])
    }

    const finishStroke = () => {
      if (!drawing.current) return
      drawing.current = false
      const points = draftPath.current
      draftPath.current = []
      setDraft(null)
      if (points.length >= MIN_PATH_POINTS) {
        setShapes((prev) => [
          ...prev,
          {
            id: uid(),
            kind: 'path',
            color: colorRef.current,
            width: widthRef.current,
            points,
          },
        ])
      }
    }

    const onPointerUp = (e: PointerEvent) => {
      if (toolRef.current === 'pan') return
      const { ll } = eventPoint(e)
      if (toolRef.current === 'draw') {
        finishStroke()
        return
      }
      if (toolRef.current === 'pin') {
        const label = String(pinCountRef.current + 1)
        setShapes((prev) => [
          ...prev,
          {
            id: uid(),
            kind: 'pin',
            color: colorRef.current,
            point: ll,
            label,
          },
        ])
        return
      }
      if (toolRef.current === 'line') {
        if (!lineStartRef.current) {
          setLineStart(ll)
          setHover(ll)
        } else {
          setShapes((prev) => [
            ...prev,
            {
              id: uid(),
              kind: 'line',
              color: colorRef.current,
              width: widthRef.current,
              a: lineStartRef.current!,
              b: ll,
            },
          ])
          setLineStart(null)
          setHover(null)
        }
      }
    }

    const onPointerCancel = () => finishStroke()

    host.addEventListener('pointerdown', onPointerDown)
    host.addEventListener('pointermove', onPointerMove)
    host.addEventListener('pointerup', onPointerUp)
    host.addEventListener('pointercancel', onPointerCancel)
    return () => {
      host.removeEventListener('pointerdown', onPointerDown)
      host.removeEventListener('pointermove', onPointerMove)
      host.removeEventListener('pointerup', onPointerUp)
      host.removeEventListener('pointercancel', onPointerCancel)
    }
  }, [eventPoint, map, setShapes])

  useMapEvents({
    move() {
      setTick((n) => n + 1)
    },
    zoom() {
      setTick((n) => n + 1)
    },
    moveend() {
      setTick((n) => n + 1)
    },
    zoomend() {
      setTick((n) => n + 1)
    },
  })

  void tick

  const host = hostRef.current
  if (!host) return null

  const size = map.getSize()
  const project = (ll: LatLngTuple) => {
    const p = map.latLngToContainerPoint(ll)
    return `${p.x},${p.y}`
  }
  const projectXY = (ll: LatLngTuple) => map.latLngToContainerPoint(ll)

  const svgShapes = draft
    ? [
        ...shapes,
        {
          id: '__draft',
          kind: 'path' as const,
          color,
          width,
          points: draft,
        },
      ]
    : shapes

  return createPortal(
    <svg
      width={size.x}
      height={size.y}
      viewBox={`0 0 ${size.x} ${size.y}`}
      className="pointer-events-none h-full w-full"
      aria-hidden
    >
      {svgShapes.map((shape) => {
        if (shape.kind === 'path' && shape.points.length >= 2) {
          const d = shape.points
            .map((pt, i) => `${i === 0 ? 'M' : 'L'}${project(pt)}`)
            .join(' ')
          return (
            <path
              key={shape.id}
              d={d}
              fill="none"
              stroke={shape.color}
              strokeWidth={shape.width}
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity={shape.id === '__draft' ? 0.85 : 1}
            />
          )
        }
        if (shape.kind === 'line') {
          const a = projectXY(shape.a)
          const b = projectXY(shape.b)
          const angle = Math.atan2(b.y - a.y, b.x - a.x)
          const head = 12
          const x1 = b.x - head * Math.cos(angle - Math.PI / 6)
          const y1 = b.y - head * Math.sin(angle - Math.PI / 6)
          const x2 = b.x - head * Math.cos(angle + Math.PI / 6)
          const y2 = b.y - head * Math.sin(angle + Math.PI / 6)
          return (
            <g key={shape.id}>
              <line
                x1={a.x}
                y1={a.y}
                x2={b.x}
                y2={b.y}
                stroke={shape.color}
                strokeWidth={shape.width}
                strokeLinecap="round"
              />
              <polygon
                points={`${b.x},${b.y} ${x1},${y1} ${x2},${y2}`}
                fill={shape.color}
              />
            </g>
          )
        }
        if (shape.kind === 'pin') {
          const p = projectXY(shape.point)
          return (
            <g key={shape.id}>
              <circle
                cx={p.x}
                cy={p.y}
                r={11}
                fill={shape.color}
                stroke="rgba(0,0,0,.75)"
                strokeWidth={2}
              />
              <text
                x={p.x}
                y={p.y + 1}
                textAnchor="middle"
                dominantBaseline="middle"
                fill="#0b1220"
                fontSize="11"
                fontWeight="700"
                fontFamily="Barlow Condensed, Barlow, system-ui, sans-serif"
              >
                {shape.label}
              </text>
            </g>
          )
        }
        return null
      })}
      {lineStart && hover ? (
        <g>
          <line
            x1={projectXY(lineStart).x}
            y1={projectXY(lineStart).y}
            x2={projectXY(hover).x}
            y2={projectXY(hover).y}
            stroke={color}
            strokeWidth={width}
            strokeLinecap="round"
            strokeDasharray="6 4"
            opacity={0.85}
          />
          <circle
            cx={projectXY(lineStart).x}
            cy={projectXY(lineStart).y}
            r={4}
            fill={color}
          />
        </g>
      ) : null}
    </svg>,
    host
  )
}
