"use client";

import { motion } from "framer-motion";
import post from "@/data/post.json";

export default function PostsPage() {
  return (
    <article className="mt-8 flex flex-col gap-8 pb-16">
        <motion.h1 className="title"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
        >
            Posts
        </motion.h1>


    </article>
  );
}