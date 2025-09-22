"use client";

import Projects from "@/components/Projects";
import { motion } from "framer-motion";

export default function ProjectPage() {
  return (
    <article className="mt-8 flex flex-col gap-8 pb-16">
      <motion.h1 
        className="title"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        My Projects
      </motion.h1>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <Projects />
      </motion.div>
    </article>
  );
}
