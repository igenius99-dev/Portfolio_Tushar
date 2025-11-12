"use client";

import Experience from "@/components/Experience";
import LinkWithIcon from "@/components/LinkWithIcon";
import Projects from "@/components/Projects";
import Posts from "@/components/Posts";
import Skills from "@/components/Skills";
import Socials from "@/components/Socials";
import SwipeCards from "@/components/SwipeCards";
import { Button } from "@/components/ui/Button";
import { motion } from "framer-motion";

import {
  ArrowDown,
  ArrowDownRight,
  ArrowRightIcon,
  FileDown,
} from "lucide-react";
import Link from "next/link";

const LIMIT = 2; // max show 2

export default function Home() {
  return (
    <article className="mt-8 flex flex-col gap-16 pb-16">
      <section className="flex flex-col items-start gap-8 md:flex-row-reverse md:items-center md:justify-between">
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <SwipeCards className="md:mr-8" />
        </motion.div>

        <motion.div 
          className="flex max-w-[320px] flex-col sm:max-w-full"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="title text-balance text-4xl sm:text-5xl">
            Hi, I&apos;m Tushar.
          </h1>

          <p className="mt-2 whitespace-nowrap text-sm font-medium sm:text-base">
            Software Engineer from Tempe, AZ! 
          </p>

          <p className="mt-4 max-w-sm text-balance text-sm sm:text-base">
          Designer by heart, full-stack by habit. I build what I imagine.
          </p>

          <div className="mt-6 flex items-center gap-1">
            <p className="text-balance text-4xl font-semibold sm:text-base">
              For Q&A, start a chat with Tushar Spirit
            </p>
            <ArrowDownRight className="hidden size-5 animate-bounce sm:block" />
            <ArrowDown className="block size-5 animate-bounce sm:hidden" />
          </div>

          <p className="mt-1 text-xs font-light">
            For escalations, please find my
            <Link
              href="https://www.instagram.com/tushar_sachan1"
              target="_blank"
              className="link font-semibold"
              title="meow"
            >
              &nbsp;Instagram&nbsp;
            </Link>
            instead.
          </p>

          <section className="mt-6 flex flex-wrap items-center gap-4">
            <Link href="/resume.pdf" target="_blank">
              <Button variant="outline">
                <span className="font-semibold">Resume</span>
                <FileDown className="ml-2 size-5" />
              </Button>
            </Link>
            <Socials />
          </section>
        </motion.div>
      </section>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <Skills />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        <Experience />
      </motion.div>

      <motion.section 
        className="flex flex-col gap-8"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
      >
        <div className="flex justify-between">
          <h2 className="title text-2xl sm:text-3xl">Featured Projects</h2>
          <LinkWithIcon
            href="/projects"
            position="right"
            icon={<ArrowRightIcon className="size-5" />}
            text="view more"
          />
        </div>
        <Projects limit={LIMIT} />
      </motion.section>

      <motion.section 
        className="flex flex-col gap-8"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
      >
        <div className="flex justify-between">
          <h2 className="title text-2xl sm:text-3xl">Featured Posts</h2>
          <LinkWithIcon
            href="/posts"
            position="right"
            icon={<ArrowRightIcon className="size-5" />}
            text="view more"
          />
        </div>
        <Posts limit={LIMIT} />
      </motion.section>
  
    </article>
  );
}
