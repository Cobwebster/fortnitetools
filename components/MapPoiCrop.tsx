import { LIVE_BR_MAP } from '@/lib/drop-map'

export function MapPoiCrop({
  focus,
  alt,
  className = 'h-40',
  scale = 2.7,
}: {
  focus: { x: number; y: number }
  alt: string
  className?: string
  scale?: number
}) {
  return (
    <div className={`relative overflow-hidden bg-[#0a1628] ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={LIVE_BR_MAP}
        alt={alt}
        className="h-full w-full object-cover"
        style={{
          transform: `scale(${scale})`,
          transformOrigin: `${focus.x}% ${focus.y}%`,
        }}
      />
    </div>
  )
}
