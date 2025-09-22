"use client";

import { Icon } from "lucide-react";
import { motion } from "framer-motion";


interface Skill {
  name: string;
  icon: string;
  devicon: string;
}

interface SkillsProps {
  className?: string;
}


export default function Skills({ className = "" }: SkillsProps) {
  const skills: Skill[] = [
    { name: "Next.js", icon: "N", devicon: "devicon-nextjs-original" },
    { name: "React", icon: "⚛", devicon: "devicon-react-original" },
    { name: "TypeScript", icon: "TS", devicon: "devicon-typescript-original" },
    { name: "CSS", icon: "🎨", devicon: "devicon-css3-plain" },
    { name: "Node.js", icon: "🟢", devicon: "devicon-nodejs-plain" },
    { name: "Python", icon: "🐍", devicon: "devicon-python-plain" },
    { name: "Java", icon: "☕", devicon: "devicon-java-plain" },
    { name: "MongoDB", icon: "🍃", devicon: "devicon-mongodb-plain" },
    { name: "Firebase", icon: "🔥", devicon: "devicon-firebase-plain" },
    { name: "Kubernetes", icon: "⚙️", devicon: "devicon-kubernetes-plain" },
    { name: "Docker", icon: "🐳", devicon: "devicon-docker-plain" },
    { name: "AWS", icon: "☁️", devicon: "devicon-amazonwebservices-plain-wordmark" }
  ];

  return (
    <section className={`flex flex-col gap-8 ${className}`}>
      <div className="flex flex-col gap-2">
        <h2 className="title text-2xl sm:text-3xl">Technologies</h2>
        <p className="text-sm text-muted-foreground">
          Tools and technologies I work with
        </p>
      </div>

      <div className="flex flex-wrap gap-4">
        {skills.map((skill, index) => (
          <motion.div
            key={skill.name}
            className="flex w-24 flex-col items-center gap-2 rounded-lg bg-muted/50 p-4 transition-colors hover:bg-muted/80"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.35,
              delay: index * 0.06,
              ease: "easeOut"
            }}
            whileHover={{ translateY: -2 }}
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-background">
              <i 
                className={`${skill.devicon} text-2xl`} 
                style={{fontSize: '24px'}}
                onError={(e) => {
                  // Fallback to emoji if DevIcon fails to load
                  const target = e.target as HTMLElement;
                  target.style.display = 'none';
                  const parent = target.parentElement;
                  if (parent) {
                    parent.innerHTML = `<span class="text-2xl font-bold">${skill.icon}</span>`;
                  }
                }}
              ></i>
            </div>
            <span className="text-xs font-medium text-center leading-tight">{skill.name}</span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
