type FortniteIconProps = {
  src: string
  alt?: string
  className?: string
  /** Extra classes on the wrapping slot (rarity-style frame). */
  frameClassName?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
}

const SIZE = {
  sm: 'h-10 w-10',
  md: 'h-14 w-14',
  lg: 'h-16 w-16',
  xl: 'h-20 w-20',
} as const

const IMG = {
  sm: 'h-7 w-7',
  md: 'h-11 w-11',
  lg: 'h-14 w-14',
  xl: 'h-16 w-16',
} as const

/** Game-style item icon slot — real Fortnite sprites instead of Lucide/emoji. */
export function FortniteIcon({
  src,
  alt = '',
  className = '',
  frameClassName = '',
  size = 'md',
}: FortniteIconProps) {
  return (
    <span
      className={`inline-flex shrink-0 items-center justify-center overflow-hidden rounded-lg border border-border/80 bg-black/50 ${SIZE[size]} ${frameClassName} ${className}`}
      aria-hidden={alt ? undefined : true}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        className={`object-contain drop-shadow-md ${IMG[size]}`}
        loading="lazy"
        decoding="async"
      />
    </span>
  )
}
