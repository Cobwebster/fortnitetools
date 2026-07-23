import Link from 'next/link'
import Image from 'next/image'
import { Clock } from 'lucide-react'
import { type Post, getCategoryLabel, formatDate } from '@/lib/posts'

interface PostCardProps {
  post: Post
  featured?: boolean
}

export function PostCard({ post, featured = false }: PostCardProps) {
  if (featured) {
    return (
      <article className="group relative overflow-hidden rounded-lg border border-border bg-card transition-colors hover:border-primary/50">
        <Link href={`/guides/${post.category}/${post.slug}`} className="block">
          {post.image ? (
            <div className="relative h-64 w-full overflow-hidden">
              <Image
                src={post.image}
                alt={post.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-linear-to-t from-card via-card/50 to-transparent" />
              <div className="absolute top-3 left-3">
                <span className="rounded bg-primary px-2 py-0.5 text-xs font-semibold uppercase tracking-wider text-primary-foreground">
                  {getCategoryLabel(post.category)}
                </span>
              </div>
            </div>
          ) : (
            <div className="px-5 pt-5">
              <span className="rounded bg-primary px-2 py-0.5 text-xs font-semibold uppercase tracking-wider text-primary-foreground">
                {getCategoryLabel(post.category)}
              </span>
            </div>
          )}
          <div className="p-5">
            <h2 className="font-display text-2xl font-bold uppercase leading-tight text-foreground group-hover:text-primary transition-colors text-balance">
              {post.title}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground line-clamp-2">{post.excerpt}</p>
            <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground">
              <time dateTime={post.date}>{formatDate(post.date)}</time>
              <span className="flex items-center gap-1">
                <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                {post.readTime} min read
              </span>
            </div>
          </div>
        </Link>
      </article>
    )
  }

  return (
    <article className="group flex gap-4 rounded-lg border border-border bg-card p-4 transition-colors hover:border-primary/50">
      <Link href={`/guides/${post.category}/${post.slug}`} className="flex gap-4 w-full">
        {post.image ? (
          <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-md sm:h-28 sm:w-28">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="112px"
            />
          </div>
        ) : null}
        <div className="flex flex-col justify-between min-w-0">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-primary">
              {getCategoryLabel(post.category)}
            </span>
            <h3 className="mt-1 font-display text-base font-bold uppercase leading-snug text-foreground group-hover:text-primary transition-colors line-clamp-2 text-balance">
              {post.title}
            </h3>
            <p className="mt-1 text-xs leading-relaxed text-muted-foreground line-clamp-2 hidden sm:block">
              {post.excerpt}
            </p>
          </div>
          <div className="mt-2 flex items-center gap-3 text-xs text-muted-foreground">
            <time dateTime={post.date}>{formatDate(post.date)}</time>
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" aria-hidden="true" />
              {post.readTime} min
            </span>
          </div>
        </div>
      </Link>
    </article>
  )
}
