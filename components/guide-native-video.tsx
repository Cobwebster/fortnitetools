import type { PostVideo } from '@/lib/guide-video'

export function GuideNativeVideo({ video }: { video: PostVideo }) {
  return (
    <figure className="mt-8 overflow-hidden rounded-lg border border-border bg-card">
      <video
        controls
        playsInline
        preload="metadata"
        poster={video.poster}
        width={video.width}
        height={video.height}
        className="aspect-video w-full bg-black"
        aria-label={video.title}
      >
        <source src={video.src} type="video/mp4" />
      </video>
      <figcaption className="px-4 py-3 text-sm leading-relaxed text-muted-foreground">
        <span className="font-semibold text-foreground">{video.title}</span>
        {video.credit ? ` — recorded by ${video.credit}` : null}. {video.description}
      </figcaption>
    </figure>
  )
}
