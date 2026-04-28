import { useCallback, useEffect, useRef, useState } from "react";
import { ExternalLink, Github } from "lucide-react";

const PROJECTS = [
  {
    id: "01",
    title: "Photoku",
    year: "2025",
    description: "Engineered the buyer-side Photoku 'Mini App' within My Telkomsel, implementing core biometric face recognition for user registration and a personalized marketplace.",
    features: [
      "Biometric Marketplace: Face recognition for personalized photo finding.",
      "Seller Dashboard: Full business management for photographers with secure validation.",
      "Full Transaction Management: Handles commerce loop from reports to payment gateways."
    ],
    role: "Mobile & Web Engineer",
    tags: ["TaroJS", "WeApp", "ResNet", "Golang", "Python", "MySQL", "Docker"],
    github: null,
    live: null,
  },
  {
    id: "02",
    title: "Rumah Aman",
    year: "2025",
    description: "Engineered Home Wi-Fi Parental Control module enabling remote management of network topology and comprehensive device profiling.",
    features: [
      "Wi-Fi Remote Management: Remotely manage SSID, passwords, and network topology.",
      "Connected Device Monitoring: Manage connection times and blacklist devices.",
      "Device Profiles: Group devices by family members and set usage policies."
    ],
    role: "Mobile Engineer",
    tags: ["TaroJS", "WeApp", "Golang", "MySQL", "Docker"],
    github: null,
    live: null,
  },
  {
    id: "03",
    title: "Sentra Properti",
    year: "2025",
    description: "Built the complete Sentra Properti frontend and integrated backend APIs, including payment gateways for property seekers and agents.",
    features: [
      "Property Search: Search listed properties and contact agents directly.",
      "Property Posting: Credit-based listing management for partners.",
      "Real-time Monitoring: Track listings with real-time graphics and leads."
    ],
    role: "Web Engineer",
    tags: ["ReactJS", "Axios", "Java", "MySQL"],
    github: null,
    live: "https://sentraproperti.com",
  },
  {
    id: "04",
    title: "V-NSP",
    year: "2024",
    description: "Engineered core MyTelkomsel feature detecting WhatsApp call events to trigger video ring back tone overlays.",
    features: [
      "Ringtone Visualization: Change standard ringing sounds into video.",
      "Caller Video Display: Display videos on the caller's smartphone while ringing.",
      "In-App Purchase: Integrated content store for video management."
    ],
    role: "Mobile & Web Engineer",
    tags: ["Java (Android)", "ReactJS (Webview)", "RTK Query", "Golang", "MySQL", "Docker"],
    github: null,
    live: null,
  },
  {
    id: "05",
    title: "AyoLari",
    year: "2024",
    description: "Migrated native run tracking module into high-performance ReactJS WebView with deep native device API integration.",
    features: [
      "Outdoor Run Tracking: Record distance, pace, calories, and heart rate.",
      "Event Participation: Join various running events and view schedules.",
      "Earn Rewards: Reward system based on achieved step targets."
    ],
    role: "Web Engineer",
    tags: ["Java (Android)", "Swift (iOS)", "ReactJS (Webview)", "RTK Query", "Golang", "MySQL", "Docker"],
    github: null,
    live: null,
  },
  {
    id: "06",
    title: "Mental Health AI",
    year: "2024",
    description: "Fine-tuned small-scale LLMs (Llama3, Gemma2) for empathetic mental health support using context-aware methodologies.",
    features: [
      "LLM Performance Validation: Verified fine-tuning effectiveness on small LLMs.",
      "Response Quality: Improved accuracy and empathy in AI responses.",
      "Optimal Model Identification: Identified Qwen2 7B as the optimal base."
    ],
    role: "AI Engineer",
    tags: ["Python", "Kaggle", "Unsloth"],
    github: null,
    live: "https://huggingface.co",
  },
  {
    id: "07",
    title: "Edutry",
    year: "2024",
    description: "Engineered a three-tier exam platform for students, partners, and administrators with comprehensive management tools.",
    features: [
      "User Page: Search, purchase, and take mock exams online.",
      "Partner Page: Functionality for partners to create and sell exams.",
      "Admin Dashboard: Manage entire system content and operations."
    ],
    role: "Web Engineer",
    tags: ["NextJS", "Axios", "Golang", "PostgreSQL", "Docker"],
    github: null,
    live: null,
  },
  {
    id: "08",
    title: "Smart Waste Bin",
    year: "2023",
    description: "Integrated IoT and AI for automatic waste sorting using YOLOv8, ESP microcontroller, and a real-time monitoring dashboard.",
    features: [
      "AI Sorting: YOLOv8 image recognition linked with servo control.",
      "IoT Integration: ESP firmware for sensor data and command handling.",
      "Monitoring Dashboard: Real-time visualization of fill levels."
    ],
    role: "IoT & Web Engineer",
    tags: ["NextJS", "ExpressJS", "MongoDB", "Python", "C++", "YOLOv8"],
    github: "https://github.com/wiweka24",
    live: null,
  },
  {
    id: "09",
    title: "Pedotan",
    year: "2022",
    description: "Native Android app for plant disease detection using ML models and MVVM architecture.",
    features: [
      "ML Integration: Detect diseases, deficiencies, and farmland conditions.",
      "MVVM Architecture: Built for maintainability and scalability.",
      "Efficient Data: Used Retrofit 2 and Shared Preferences."
    ],
    role: "Mobile Engineer",
    tags: ["Kotlin", "GCP", "Python", "Firebase"],
    github: "https://github.com/wiweka24",
    live: null,
  },
  {
    id: "10",
    title: "GMCO Ticketing",
    year: "2022",
    description: "Online ticket purchasing system with a dynamic, real-time interactive cinema-style seating map.",
    features: [
      "Interactive Seat Map: Real-time availability reflecting visually.",
      "Payment Integration: Secure, scalable transaction process.",
      "State Management: Used Zustand for complex seating logic."
    ],
    role: "Web Engineer",
    tags: ["NextJS", "Zustand", "Golang", "PostgreSQL", "Docker"],
    github: "https://github.com/wiweka24",
    live: null,
  },
];

const ROTATIONS = ["-1.5deg", "1deg", "-0.5deg", "1.5deg", "-1deg", "0.5deg", "1.2deg", "-0.8deg", "0.3deg", "-1.3deg"];

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
      <div className="absolute inset-4 flex items-center gap-12 px-20">

        {/* LEFT: project list */}
        <div className="flex w-72 flex-shrink-0 flex-col justify-center gap-0 overflow-y-auto max-h-[80vh] pr-4 scrollbar-hide">
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
          </div>
        </div>

        {/* RIGHT: project detail */}
        <div className="relative flex flex-1 items-center justify-center">
          {/* Card */}
          <div
            className="relative w-full max-w-[640px]"
            style={{
              transform: animating
                ? `rotate(${ROTATIONS[selected % ROTATIONS.length]}) translateY(12px)`
                : `rotate(${ROTATIONS[selected % ROTATIONS.length]}) translateY(0px)`,
              opacity: animating ? 0 : 1,
              transition: "transform 0.18s ease, opacity 0.18s ease",
            }}
          >
            <div
              className="rounded-2xl border-4 border-black bg-white p-10 dark:border-white dark:bg-black overflow-y-auto max-h-[85vh] scrollbar-hide"
              style={{ boxShadow: dark ? "6px 6px 0 #fff" : "6px 6px 0 #000" }}
            >
              <div className="mb-6 flex items-start justify-between">
                <div className="flex flex-col gap-1">
                  <span className="rounded-full border-2 border-black px-3 py-1 text-[10px] font-black uppercase tracking-widest dark:border-white w-fit">
                    {project.year}
                  </span>
                  <p className="text-[10px] uppercase font-black opacity-40 mt-1">{project.role}</p>
                </div>
                <span className="text-6xl font-black leading-none opacity-[0.07]">{project.id}</span>
              </div>

              <h2 className="mb-4 text-5xl font-black uppercase leading-none tracking-tighter">
                {project.title}
              </h2>

              <div className="mb-6 h-[4px] w-16 bg-black dark:bg-white" />

              <p className="mb-8 text-base font-medium leading-relaxed opacity-60">
                {project.description}
              </p>

              {project.features && (
                <div className="mb-8">
                  <p className="text-[10px] uppercase tracking-widest opacity-40 mb-3">Key Features</p>
                  <ul className="flex flex-col gap-2">
                    {project.features.map((f, fi) => (
                      <li key={fi} className="text-xs font-bold flex gap-2">
                        <span className="text-black/30 dark:text-white/30">•</span>
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="mb-8 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-lg border-2 border-black px-3 py-1 text-[10px] font-black uppercase tracking-wider dark:border-white bg-black/5 dark:bg-white/5"
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
                    className="flex cursor-pointer items-center gap-2 rounded-xl border-2 border-black px-5 py-3 text-xs font-black uppercase tracking-wider transition-all hover:bg-black hover:text-white dark:border-white dark:hover:bg-white dark:hover:text-black"
                    style={{ boxShadow: dark ? "3px 3px 0 #fff" : "3px 3px 0 #000" }}
                  >
                    <Github className="size-4" />
                    Source
                  </a>
                )}
                {project.live && (
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex cursor-pointer items-center gap-2 rounded-xl border-2 border-black bg-black px-5 py-3 text-xs font-black uppercase tracking-wider text-white transition-all hover:opacity-75 dark:border-white dark:bg-white dark:text-black"
                    style={{ boxShadow: dark ? "3px 3px 0 #fff" : "3px 3px 0 #000" }}
                  >
                    <ExternalLink className="size-4" />
                    Visit Site
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
