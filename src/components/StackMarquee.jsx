import {
  SiReact, SiNextdotjs, SiTypescript, SiJavascript,
  SiFlutter, SiDart, SiFigma,
  SiPython, SiNodedotjs, SiTailwindcss,
  SiPostgresql, SiGit, SiGithub, SiFirebase, SiVite, SiSupabase
} from 'react-icons/si'

const STACK = [
  { name: "React",       Icon: SiReact,       color: "#61DAFB" },
  { name: "Next.js",     Icon: SiNextdotjs,   color: "#ffffff" },
  { name: "TypeScript",  Icon: SiTypescript,  color: "#3178C6" },
  { name: "JavaScript",  Icon: SiJavascript,  color: "#F7DF1E" },
  { name: "Flutter",     Icon: SiFlutter,     color: "#54C5F8" },
  { name: "Dart",        Icon: SiDart,        color: "#00B4AB" },
  { name: "Figma",       Icon: SiFigma,       color: "#F24E1E" },
  { name: "Python",      Icon: SiPython,      color: "#4B8BBE" },
  { name: "Node.js",     Icon: SiNodedotjs,   color: "#68A063" },
  { name: "Tailwind",    Icon: SiTailwindcss, color: "#06B6D4" },
  { name: "Postgres",    Icon: SiPostgresql,  color: "#4169E1" },
  { name: "Firebase",    Icon: SiFirebase,    color: "#FFCA28" },
  { name: "Supabase",    Icon: SiSupabase,    color: "#3ECF8E" },
  { name: "Vite",        Icon: SiVite,        color: "#646CFF" },
  { name: "Git",         Icon: SiGit,         color: "#F05032" },
  { name: "GitHub",      Icon: SiGithub,      color: "#ffffff" },
]

export default function StackMarquee() {
  const row = [...STACK, ...STACK]
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        {row.map((item, i) => (
          <span key={i} className="marquee-item">
            <item.Icon
              className="marquee-icon"
              style={{ color: item.color }}
            />
            {item.name}
          </span>
        ))}
      </div>
    </div>
  )
}
