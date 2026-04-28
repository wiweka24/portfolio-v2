import { useCallback, useEffect, useRef, useState } from "react";
import { ExternalLink, Github } from "lucide-react";

const PROJECTS = [
  {
    id: "01",
    title: "Portfolio V2",
    year: "2025",
    description:
      "Personal portfolio with parallax animations, 3D rotating Rubik's cube, interactive sketchbook with page-turn physics, YouTube music integration, and full dark mode.",
    tags: ["React", "TypeScript", "Tailwind CSS", "Vite"],
    github: "https://github.com/wiweka24",
    live: null,
  },
  {
    id: "02",
    title: "Anime Tracker",
    year: "2024",
    description:
      "Track your watchlist with AniList API integration. Features watchlist management, episode progress tracking, and personalised recommendations.",
    tags: ["Next.js", "AniList API", "Tailwind CSS", "Prisma"],
    github: "#",
    live: "#",
  },
  {
    id: "03",
    title: "Dev Tools CLI",
    year: "2024",
    description:
      "Command-line toolkit for developers. Scaffolds projects, manages dotfiles, and automates repetitive dev tasks with a single command.",
    tags: ["Node.js", "TypeScript", "Commander.js"],
    github: "#",
    live: null,
  },
  {
    id: "04",
    title: "AI Chat",
    year: "2023",
    description:
      "Real-time chat application with AI assistant integration. Supports multiple conversation threads, markdown rendering, and code highlighting.",
    tags: ["React", "OpenAI API", "Firebase"],
    github: "#",
    live: "#",
  },
];

const ROTATIONS = ["-1.5deg", "1deg", "-0.5deg", "1.5deg"];

export default function Projects() {
  const [dark] = useState(() => document.documentElement.classList.contains("dark"));
  const [lang] = useState<"en" | "jp">("en");
  const [selected, setSelected] = useState(0);
  const [animating, setAnimating] = useState(false);

  const selectedRef = useRef(0);
  const animatingRef = useRef(false);

  const select = useCallback((i: number) => {
    if (animatingRef.current || i === selectedRef.current) return;
    if (i < 0 || i >= PROJECTS.length) return;
    animatingRef.current = true;
    setAnimating(true);
    setTimeout(() => {
      selectedRef.current = i;
      setSelected(i);
      setAnimating(false);
      animatingRef.current = false;
    }, 180);
  }, []);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown") select(selectedRef.current + 1);
      if (e.key === "ArrowUp") select(selectedRef.current - 1);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [select]);

  const project = PROJECTS[selected];

  return (
    <div className="relative flex h-screen w-screen select-none bg-white font-black text-black transition-colors duration-300 dark:bg-black dark:text-white">
      {/* ── Frame border ── */}
      <div className="absolute top-0 z-30 h-4 w-screen bg-black dark:bg-white" />
      <div className="absolute bottom-0 z-30 h-4 w-screen bg-black dark:bg-white" />
      <div className="absolute left-0 z-30 h-screen w-4 bg-black dark:bg-white" />
      <div className="absolute right-0 z-30 h-screen w-4 bg-black dark:bg-white" />
      <div className="absolute top-4 left-4 z-30 h-4 w-4 bg-black dark:bg-white" />
      <div className="absolute top-4 left-4 z-30 h-4 w-4 rounded-tl-full bg-white dark:bg-black" />
      <div className="absolute top-4 right-4 z-30 h-4 w-4 bg-black dark:bg-white" />
      <div className="absolute top-4 right-4 z-30 h-4 w-4 rounded-tr-full bg-white dark:bg-black" />
      <div className="absolute bottom-4 left-4 z-30 h-4 w-4 bg-black dark:bg-white" />
      <div className="absolute bottom-4 left-4 z-30 h-4 w-4 rounded-bl-full bg-white dark:bg-black" />
      <div className="absolute right-4 bottom-4 z-30 h-4 w-4 bg-black dark:bg-white" />
      <div className="absolute right-4 bottom-4 z-30 h-4 w-4 rounded-br-full bg-white dark:bg-black" />

      {/* ── Grid background ── */}
      <div
        className="absolute inset-4"
        style={{
          backgroundImage: `
            linear-gradient(${dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)"} 1px, transparent 1px),
            linear-gradient(90deg, ${dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)"} 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
      />

      {/* ── Vertical label ── */}
      <div className="pointer-events-none absolute bottom-32 left-16 z-10 origin-bottom-left -rotate-90">
        <span
          className="whitespace-nowrap text-base font-black uppercase tracking-widest opacity-30"
          style={{ fontFamily: '"Roboto Mono", monospace' }}
        >
          {lang === "en" ? "wiweka24 - selected works" : "wiweka24 - 制作実績"}
        </span>
      </div>

      {/* ── Main layout ── */}
      <div className="absolute inset-4 flex items-center gap-8 px-16">

        {/* LEFT: project list */}
        <div className="flex w-72 flex-shrink-0 flex-col justify-center gap-0">
          <p className="mb-6 text-[10px] uppercase tracking-[0.35em] opacity-40">
            {lang === "en" ? "Selected works" : "制作実績"}
          </p>

          {PROJECTS.map((p, i) => (
            <button
              key={p.id}
              onClick={() => select(i)}
              className={`group flex w-full cursor-pointer items-center gap-4 border-b-2 py-4 text-left transition-all duration-300 ${
                i === selected
                  ? "border-black dark:border-white"
                  : "border-black/10 hover:border-black/40 dark:border-white/10 dark:hover:border-white/40"
              }`}
            >
              <span className={`w-6 text-xs tabular-nums transition-all duration-300 ${i === selected ? "opacity-100" : "opacity-25"}`}>
                {p.id}
              </span>
              <span className={`flex-1 text-base uppercase tracking-tight transition-all duration-300 ${i === selected ? "opacity-100" : "opacity-25 group-hover:opacity-50"}`}>
                {p.title}
              </span>
              <span className={`text-[10px] tabular-nums transition-all duration-300 ${i === selected ? "opacity-50" : "opacity-10"}`}>
                {p.year}
              </span>
            </button>
          ))}

          <div className="mt-6 flex items-center gap-3 opacity-30">
            <span className="text-xs tracking-widest">
              {String(selected + 1).padStart(2, "0")} / {String(PROJECTS.length).padStart(2, "0")}
            </span>
            <div className="flex flex-col gap-1">
              <div
                className="flex h-6 w-6 items-center justify-center rounded border-[1.5px] border-black dark:border-white"
                style={{ boxShadow: dark ? "0 2px 0 #fff" : "0 2px 0 #000" }}
              >
                <svg viewBox="0 0 10 10" fill="currentColor" className="h-2.5 w-2.5">
                  <path d="M5,2 L9,8 L1,8 Z" />
                </svg>
              </div>
              <div
                className="flex h-6 w-6 items-center justify-center rounded border-[1.5px] border-black dark:border-white"
                style={{ boxShadow: dark ? "0 2px 0 #fff" : "0 2px 0 #000" }}
              >
                <svg viewBox="0 0 10 10" fill="currentColor" className="h-2.5 w-2.5">
                  <path d="M5,8 L9,2 L1,2 Z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT: project detail */}
        <div className="relative flex flex-1 items-center justify-center">
          {/* Big watermark number */}
          <span
            className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 select-none font-black leading-none"
            style={{ fontSize: "clamp(140px, 20vw, 280px)", opacity: 0.04 }}
          >
            {project.id}
          </span>

          {/* Card */}
          <div
            className="relative w-full max-w-[520px]"
            style={{
              transform: animating
                ? `rotate(${ROTATIONS[selected]}) translateY(12px)`
                : `rotate(${ROTATIONS[selected]}) translateY(0px)`,
              opacity: animating ? 0 : 1,
              transition: "transform 0.18s ease, opacity 0.18s ease",
            }}
          >
            <div
              className="rounded-2xl border-4 border-black bg-white p-8 dark:border-white dark:bg-black"
              style={{ boxShadow: dark ? "6px 6px 0 #fff" : "6px 6px 0 #000" }}
            >
              <div className="mb-5 flex items-start justify-between">
                <span className="text-7xl font-black leading-none opacity-[0.07]">{project.id}</span>
                <span className="rounded-full border-2 border-black px-3 py-1 text-[10px] font-black uppercase tracking-widest dark:border-white">
                  {project.year}
                </span>
              </div>

              <h2 className="mb-3 text-4xl font-black uppercase leading-none tracking-tighter">
                {project.title}
              </h2>

              <div className="mb-4 h-[3px] w-12 bg-black dark:bg-white" />

              <p className="mb-6 text-sm font-medium leading-relaxed opacity-60">
                {project.description}
              </p>

              <div className="mb-6 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border-2 border-black/30 px-3 py-1 text-[10px] font-black uppercase tracking-wider dark:border-white/30"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-3">
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex cursor-pointer items-center gap-2 rounded-xl border-2 border-black px-4 py-2 text-xs font-black uppercase tracking-wider transition-all hover:bg-black hover:text-white dark:border-white dark:hover:bg-white dark:hover:text-black"
                    style={{ boxShadow: dark ? "2px 2px 0 #fff" : "2px 2px 0 #000" }}
                  >
                    <Github className="size-3.5" />
                    GitHub
                  </a>
                )}
                {project.live && (
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex cursor-pointer items-center gap-2 rounded-xl border-2 border-black bg-black px-4 py-2 text-xs font-black uppercase tracking-wider text-white transition-all hover:opacity-75 dark:border-white dark:bg-white dark:text-black"
                    style={{ boxShadow: dark ? "2px 2px 0 #fff" : "2px 2px 0 #000" }}
                  >
                    <ExternalLink className="size-3.5" />
                    Live
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
