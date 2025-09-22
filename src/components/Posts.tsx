"use client";

import { PostSummary } from "@/lib/posts";

interface PostsProps {
  posts: PostSummary[];
}

export default function Posts({ posts }: PostsProps) {
  if (!posts || posts.length === 0) {
    return (
      <div className="text-sm text-muted-foreground">No posts found.</div>
    );
  }

  return (
    <div className="space-y-6">
      {posts.map((post) => (
        <article
          key={post.id}
          className="rounded-lg border bg-card p-4 shadow-sm"
        >
          <div className="flex flex-col gap-2">
            <h3 className="text-lg font-semibold leading-tight">{post.title}</h3>
            {post.summary && (
              <p className="text-sm text-muted-foreground">{post.summary}</p>
            )}

            <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
              {post.publishedAt && <span>{post.publishedAt}</span>}
              {post.readingTime && <span>• {post.readingTime}</span>}
              {post.tags && post.tags.length > 0 && (
                <span className="flex flex-wrap gap-1">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded bg-muted px-1.5 py-0.5 text-[10px] uppercase tracking-wide"
                    >
                      {tag}
                    </span>
                  ))}
                </span>
              )}
              {post.draft && (
                <span className="rounded bg-yellow-100 px-1.5 py-0.5 text-[10px] font-medium uppercase text-yellow-700">
                  Draft
                </span>
              )}
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}


