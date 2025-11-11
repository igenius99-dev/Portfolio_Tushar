"use client";

import { motion } from "framer-motion";
import post from "@/data/post.json";
import PostsWithSearch from "@/components/PostsWithSearch";
import { PostSummary } from "@/lib/posts";

export default function PostsPage() {
  // Transform JSON data to match PostSummary type
  const posts: PostSummary[] = post.posts.map((p) => ({
    id: p.id,
    slug: p.slug,
    title: p.title,
    summary: p.summary,
    publishedAt: p.publishedAt,
    updatedAt: p.updatedAt,
    tags: p.tags || [],
    readingTime: p.readingTime,
    draft: p.draft ?? false,
  }));

  return (
    <article className="mt-8 flex flex-col gap-8 pb-16">
      <motion.h1
        className="title"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Posts
      </motion.h1>
      <PostsWithSearch posts={posts} />
    </article>
  );
}