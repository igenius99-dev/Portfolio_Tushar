import { getPostBySlug } from "@/lib/posts";
import { formatDate } from "@/lib/utils";
import { Calendar, Clock, Edit3 } from "lucide-react";
import { notFound } from "next/navigation";
import Markdown from "react-markdown";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="mt-8 flex flex-col gap-8 pb-16">
      <div className="flex flex-col gap-6">
        {/* Title */}
        <h1 className="title">{post.title}</h1>

        {/* Metadata */}
        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
          {post.publishedAt && (
            <div className="flex items-center gap-1.5">
              {post.updatedAt ? (
                <>
                  <Edit3 className="h-4 w-4" />
                  <span>Updated {formatDate(post.updatedAt)}</span>
                </>
              ) : (
                <>
                  <Calendar className="h-4 w-4" />
                  <span>{formatDate(post.publishedAt)}</span>
                </>
              )}
            </div>
          )}
          <div className="flex items-center gap-1.5">
            <Clock className="h-4 w-4" />
            <span>{post.readingTime} read</span>
          </div>
        </div>

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <Badge
                key={tag}
                variant="secondary"
                className="px-2 py-1 text-xs font-medium"
              >
                {tag}
              </Badge>
            ))}
          </div>
        )}

        {/* Content */}
        <Card className="p-6">
          <div className="prose prose-slate max-w-none dark:prose-invert prose-headings:font-semibold prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl prose-p:text-foreground prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-strong:text-foreground prose-code:text-foreground prose-pre:bg-muted">
            <Markdown
              components={{
                h1: ({ node, ...props }) => (
                  <h1 className="mb-4 mt-8 first:mt-0" {...props} />
                ),
                h2: ({ node, ...props }) => (
                  <h2 className="mb-3 mt-6 first:mt-0" {...props} />
                ),
                h3: ({ node, ...props }) => (
                  <h3 className="mb-2 mt-4 first:mt-0" {...props} />
                ),
                p: ({ node, ...props }) => (
                  <p className="mb-4 leading-relaxed" {...props} />
                ),
                ul: ({ node, ...props }) => (
                  <ul className="mb-4 ml-6 list-disc" {...props} />
                ),
                ol: ({ node, ...props }) => (
                  <ol className="mb-4 ml-6 list-decimal" {...props} />
                ),
                li: ({ node, ...props }) => (
                  <li className="mb-1" {...props} />
                ),
                a: ({ node, href, ...props }) => (
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary underline underline-offset-2 hover:text-primary/80"
                    {...props}
                  />
                ),
              }}
            >
              {post.content}
            </Markdown>
          </div>
        </Card>
      </div>
    </article>
  );
}

