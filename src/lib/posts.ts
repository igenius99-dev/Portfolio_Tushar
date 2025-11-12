import postData from "@/data/post.json";
import postContentData from "@/data/postcontent.json";

export type PostSummary = {
  id: string;
  slug: string;
  title: string;
  summary?: string;
  image?: string;
  publishedAt?: string;
  updatedAt?: string;
  tags: string[];
  readingTime: string;
  draft: boolean;
};

export type PostDetail = PostSummary & {
  content: string;
};

// Stub implementation - returns empty array since blog functionality is disabled
export async function getPosts(limit?: number): Promise<PostSummary[]> {
  return [];
}

export async function getPostBySlug(slug: string): Promise<PostDetail | null> {
  // Find post metadata from post.json
  const post = postData.posts.find((p) => p.slug === slug);
  
  if (!post) {
    return null;
  }

  // Get content from postcontent.json
  const content = (postContentData as Record<string, string>)[slug] || "";

  // Combine metadata and content
  const postDetail: PostDetail = {
    id: post.id,
    slug: post.slug,
    title: post.title,
    summary: post.summary,
    publishedAt: post.publishedAt,
    updatedAt: post.updatedAt,
    tags: post.tags || [],
    readingTime: post.readingTime,
    draft: post.draft ?? false,
    content: content,
  };

  return postDetail;
}
