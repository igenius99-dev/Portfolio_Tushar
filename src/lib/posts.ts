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
  return null;
}
