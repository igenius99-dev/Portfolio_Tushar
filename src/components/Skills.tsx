import { Icon } from "lucide-react";

interface Skill {
  name: string;
  icon: string;
}

interface SkillsProps {
  className?: string;
}

// Technology icons mapping
const getSkillIcon = (skillName: string) => {
  const iconMap: Record<string, string> = {
    "Next.js": "N",
    "React": "⚛",
    "TypeScript": "TS",
    "JavaScript": "JS",
    "Python": "🐍",
    "Java": "☕",
    "Node.js": "🟢",
    "Express.js": "E",
    "Spring Boot": "🌱",
    "MongoDB": "🍃",
    "MySQL": "🐬",
    "PostgreSQL": "🐘",
    "AWS": "☁️",
    "Docker": "🐳",
    "Kubernetes": "⚙️",
    "React Native": "📱",
    "Firebase": "🔥",
    "Tailwind CSS": "🎨",
    "HTML": "🌐",
    "CSS": "💎"
  };
  return iconMap[skillName] || "💻";
};

export default function Skills({ className = "" }: SkillsProps) {
  const skills: Skill[] = [
    { name: "Next.js", icon: "N" },
    { name: "React", icon: "⚛" },
    { name: "TypeScript", icon: "TS" },
    { name: "Node.js", icon: "🟢" },
    { name: "MongoDB", icon: "🍃" },
    { name: "AWS", icon: "☁️" },
    { name: "Docker", icon: "🐳" },
    { name: "Python", icon: "🐍" },
    { name: "Java", icon: "☕" },
    { name: "Tailwind CSS", icon: "🎨" },
    { name: "Firebase", icon: "🔥" },
    { name: "Kubernetes", icon: "⚙️" }
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
        {skills.map((skill) => (
          <div
            key={skill.name}
            className="flex flex-col items-center gap-2 rounded-lg bg-muted/50 p-4 transition-all hover:bg-muted/80 hover:scale-105"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-background text-2xl font-bold">
              {skill.icon}
            </div>
            <span className="text-sm font-medium">{skill.name}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
