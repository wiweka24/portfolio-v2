import { pp_silvia } from "../../assets";
import { Cat, Download, FileText, Github, Globe, Linkedin, Mail, Moon, Pause, Play, SkipBack, SkipForward, Sun, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";


const SONGS = [
  { id: "-AbZTFS3DAw", title: "Re:Re:", artist: "Asian Kung-Fu Generation" },
  { id: "ORe7gt-mY14", title: "Rewrite", artist: "Asian Kung-Fu Generation" },
  { id: "2S-A-9yq3H8", title: "After Dark", artist: "Asian Kung-Fu Generation" },
  { id: "lS-af979z_M", title: "Rock n' Roll, Morning Light Falls on You", artist: "Asian Kung-Fu Generation" },
];

const QUOTES = [
  { en: "If you don't take a risk, you can't create a future.", jp: "リスクを冒さなければ、未来は創れない。" },
  { en: "If you don't like your destiny, don't accept it.", jp: "自分の運命が気に入らなければ、受け入れるな。" },
  { en: "The moment you give up, is the moment you've lost.", jp: "諦めたら、そこで終わりだ。" },
  { en: "Dreams are not something you see, but something you make come true.", jp: "夢は見るものではなく、叶えるものだ。" },
  { en: "Enjoy the little detours. That's where you'll find the important things.", jp: "道草を楽しめ。そこに一番大切なものがあるから。" },
  { en: "I want to become a cat.", jp: "猫になりたい。" }
];

const getS = () => Math.round(Math.min((window.innerHeight - 92) * 0.4, window.innerWidth * (window.innerWidth < 768 ? 0.5 : 0.3)));
const C = ["#ffffff", "#d4d4d4", "#a3a3a3", "#737373", "#404040", "#0a0a0a"];

const LAYERS = [
  { ref: "grid",     x: -6,  y: -4 },
  { ref: "vtext",    x: -10, y: -6 },
  { ref: "topleft",  x: 6,   y: 5  },
  { ref: "topright", x: 8,   y: 5  },
  { ref: "bubble",   x: 10,  y: 8  },
  { ref: "botleft",  x: 5,   y: 4  },
  { ref: "music",    x: -5,  y: 4  },
  { ref: "cv",       x: 3,   y: 3  },
] as const;

type LayerKey = typeof LAYERS[number]["ref"];

export default function Dashboard() {
  const [dark, setDark] = useState(false);
  const [lang, setLang] = useState<"en" | "jp">("en");
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [showCV, setShowCV] = useState(false);
  const [S, setS] = useState(getS());
  
  // Music state
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPlayerReady, setIsPlayerReady] = useState(false);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [progress, setProgress] = useState(0); // 0 to 100
  
  const ytPlayerRef = useRef<any>(null);
  const ytContainerRef = useRef<HTMLDivElement>(null);
  const layerRefs = useRef<Partial<Record<LayerKey, HTMLElement | null>>>({});
  const cubeRef = useRef<HTMLDivElement | null>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });
  const baseAngle = useRef(0);
  const rafId = useRef<number>(0);
  const progressInterval = useRef<number | null>(null);

  useEffect(() => {
    const handleResize = () => setS(getS());
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const CUBE_FACES = [
    { tiles: [0,5,2, 4,1,3, 2,4,0], transform: `translateZ(${S / 2}px)` },
    { tiles: [3,1,4, 0,5,2, 1,3,5], transform: `rotateY(90deg) translateZ(${S / 2}px)` },
    { tiles: [1,3,0, 5,2,4, 3,1,2], transform: `rotateY(180deg) translateZ(${S / 2}px)` },
    { tiles: [4,2,1, 3,0,5, 4,2,3], transform: `rotateY(-90deg) translateZ(${S / 2}px)` },
    { tiles: [2,4,5, 1,3,0, 5,4,1], transform: `rotateX(90deg) translateZ(${S / 2}px)` },
    { tiles: [5,0,3, 2,4,1, 0,5,2], transform: `rotateX(-90deg) translateZ(${S / 2}px)` },
  ];

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouse.current = {
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      };
    };
    const handleTouchMove = (e: TouchEvent) => {
      const touch = e.touches[0];
      mouse.current = {
        x: (touch.clientX / window.innerWidth - 0.5) * 2,
        y: (touch.clientY / window.innerHeight - 0.5) * 2,
      };
    };
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    
    const tick = () => {
      current.current.x += (mouse.current.x - current.current.x) * 0.06;
      current.current.y += (mouse.current.y - current.current.y) * 0.06;
      LAYERS.forEach(({ ref, x, y }) => {
        const el = layerRefs.current[ref];
        if (!el) return;
        el.style.transform = `translate(${current.current.x * x}px, ${current.current.y * y}px)`;
      });
      baseAngle.current += 0.18;
      if (cubeRef.current) {
        const rotY = baseAngle.current + current.current.x * 28;
        const rotX = -12 + current.current.y * -18;
        cubeRef.current.style.transform = `rotateX(${rotX}deg) rotateY(${rotY}deg)`;
      }
      rafId.current = requestAnimationFrame(tick);
    };
    rafId.current = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
      cancelAnimationFrame(rafId.current);
    };
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setQuoteIndex((prev) => (prev + 1) % QUOTES.length);
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const updateProgress = () => {
      if (ytPlayerRef.current && typeof ytPlayerRef.current.getCurrentTime === "function") {
        const currentTime = ytPlayerRef.current.getCurrentTime();
        const duration = ytPlayerRef.current.getDuration();
        if (duration > 0) {
          setProgress((currentTime / duration) * 100);
        }
      }
    };

    if (isPlaying) {
      progressInterval.current = window.setInterval(updateProgress, 1000);
    } else {
      if (progressInterval.current) {
        clearInterval(progressInterval.current);
      }
    }
    return () => {
      if (progressInterval.current) clearInterval(progressInterval.current);
    };
  }, [isPlaying]);

  useEffect(() => {
    const initPlayer = () => {
      if (!ytContainerRef.current || ytPlayerRef.current) return;
      ytPlayerRef.current = new (window as any).YT.Player(ytContainerRef.current, {
        height: "64",
        width: "64",
        videoId: SONGS[currentSongIndex].id,
        playerVars: { 
          autoplay: 0, 
          controls: 0, 
          rel: 0, 
          modestbranding: 1,
          origin: window.location.origin,
          enablejsapi: 1
        },
        events: {
          onReady: () => setIsPlayerReady(true),
          onStateChange: (e: any) => {
            setIsPlaying(e.data === 1);
            if (e.data === 0) { // Ended
              handleNext();
            }
          },
        },
      });
    };

    if ((window as any).YT && (window as any).YT.Player) {
      initPlayer();
    } else {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      const firstScriptTag = document.getElementsByTagName("script")[0];
      if (firstScriptTag && firstScriptTag.parentNode) {
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
      } else {
        document.head.appendChild(tag);
      }
      (window as any).onYouTubeIframeAPIReady = initPlayer;
    }
  }, []);

  const togglePlay = () => {
    if (!ytPlayerRef.current || !isPlayerReady) return;
    try {
      if (isPlaying) {
        ytPlayerRef.current.pauseVideo();
      } else {
        ytPlayerRef.current.playVideo();
      }
    } catch (err) {
      console.error("Playback error:", err);
    }
  };

  const handleNext = () => {
    if (!ytPlayerRef.current || !isPlayerReady) return;
    const nextIndex = (currentSongIndex + 1) % SONGS.length;
    setCurrentSongIndex(nextIndex);
    ytPlayerRef.current.loadVideoById(SONGS[nextIndex].id);
    setProgress(0);
  };

  const handlePrev = () => {
    if (!ytPlayerRef.current || !isPlayerReady) return;
    const prevIndex = (currentSongIndex - 1 + SONGS.length) % SONGS.length;
    setCurrentSongIndex(prevIndex);
    ytPlayerRef.current.loadVideoById(SONGS[prevIndex].id);
    setProgress(0);
  };

  const setRef = (key: LayerKey) => (el: HTMLElement | null) => {
    layerRefs.current[key] = el;
  };

  const nextQuote = () => setQuoteIndex((prev) => (prev + 1) % QUOTES.length);

  return (
    <div className="relative flex h-screen w-screen overflow-hidden bg-white dark:bg-black dark:text-white select-none transition-colors duration-300">
      {/* ── Frame border ── */}
      <div className="absolute top-0 h-[6px] md:h-4 w-screen bg-black dark:bg-white z-30" />
      <div className="absolute bottom-0 h-[6px] md:h-4 w-screen bg-black dark:bg-white z-30" />
      <div className="absolute left-0 h-screen w-[6px] md:w-4 bg-black dark:bg-white z-30" />
      <div className="absolute right-0 h-screen w-[6px] md:w-4 bg-black dark:bg-white z-30" />
      <div className="absolute top-[6px] md:top-4 left-[6px] md:left-4 z-30 h-[6px] md:h-4 w-[6px] md:w-4 bg-black dark:bg-white" />
      <div className="absolute top-[6px] md:top-4 left-[6px] md:left-4 z-30 h-[6px] md:h-4 w-[6px] md:w-4 rounded-tl-full bg-white dark:bg-black" />
      <div className="absolute top-[6px] md:top-4 right-[6px] md:right-4 z-30 h-[6px] md:h-4 w-[6px] md:w-4 bg-black dark:bg-white" />
      <div className="absolute top-[6px] md:top-4 right-[6px] md:right-4 z-30 h-[6px] md:h-4 w-[6px] md:w-4 rounded-tr-full bg-white dark:bg-black" />
      <div className="absolute bottom-[6px] md:bottom-4 left-[6px] md:left-4 z-30 h-[6px] md:h-4 w-[6px] md:w-4 bg-black dark:bg-white" />
      <div className="absolute bottom-[6px] md:bottom-4 left-[6px] md:left-4 z-30 h-[6px] md:h-4 w-[6px] md:w-4 rounded-bl-full bg-white dark:bg-black" />
      <div className="absolute right-[6px] md:right-4 bottom-[6px] md:bottom-4 z-30 h-[6px] md:h-4 w-[6px] md:w-4 bg-black dark:bg-white" />
      <div className="absolute right-[6px] md:right-4 bottom-[6px] md:bottom-4 z-30 h-[6px] md:h-4 w-[6px] md:w-4 rounded-br-full bg-white dark:bg-black" />

      {/* ── Grid background ── */}
      <div
        ref={setRef("grid")}
        className="absolute inset-[6px] md:inset-4"
        style={{
          backgroundImage: `
            linear-gradient(${dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)"} 1px, transparent 1px),
            linear-gradient(90deg, ${dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)"} 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
      />

      {/* ── 3D Cube ── */}
      <div
        className="absolute inset-4 flex items-center justify-center pointer-events-none overflow-hidden"
        style={{ perspective: "900px" }}
      >
        <div ref={cubeRef} style={{ width: S, height: S, position: "relative", transformStyle: "preserve-3d" }}>
          {CUBE_FACES.map((face, fi) => (
            <div
              key={fi}
              style={{
                position: "absolute", inset: 0,
                transform: face.transform,
                backfaceVisibility: "visible",
                background: dark ? "#e5e5e5" : "#1a1a1a",
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "5px", padding: "5px",
              }}
            >
              {Array.from({ length: 9 }).map((_, i) => (
                <div key={i} style={{ background: C[face.tiles[i]], borderRadius: "4px" }} />
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ── Bottom Left vertical label (Hidden on Mobile) ── */}
      <div
        ref={setRef("vtext")}
        className="absolute left-16 bottom-30 z-10 pointer-events-none origin-bottom-left -rotate-90 hidden md:block"
      >
        <span className="font-black tracking-widest uppercase text-base opacity-30 whitespace-nowrap" style={{ fontFamily: '"Roboto Mono", monospace' }}>
          {lang === "en" ? "wiweka24 - portfolio page" : "wiweka24 - ポートフォリオページ"}
        </span>
      </div>

      {/* ══════════════════════════════════════
          TOP-LEFT
      ══════════════════════════════════════ */}
      <div ref={setRef("topleft")} className="absolute top-8 left-6 md:left-10 z-10">
        <div className="flex flex-col gap-2" style={{ transform: "rotate(-2deg)" }}>

          <div className="flex items-center gap-2">
            <div className="relative flex-shrink-0">
              <div className="absolute inset-0 rounded-full bg-black dark:bg-white scale-110 -z-10" />
              <img
                src={pp_silvia}
                alt="avatar"
                className="w-12 h-12 md:w-16 md:h-16 rounded-full border-[3px] border-white object-cover object-top"
              />
            </div>
            <span className="font-black text-lg md:text-xl">wiweka24</span>
            <Cat className="w-4 h-4 md:w-5 md:h-5 flex-shrink-0" strokeWidth={2.5} />
          </div>

          <div className="flex flex-col gap-1 min-w-[180px] md:min-w-[220px] mt-2 md:mt-4">
            <p className="font-black text-[10px] tracking-widest">{lang === "en" ? "LEVEL" : "レベル"}</p>
            <div className="flex items-center gap-2">
              <span className="font-black text-2xl md:text-4xl leading-none w-8 md:w-10">24</span>
              <div className="relative flex-1 h-6 md:h-8 rounded-full overflow-hidden bg-gray-100 dark:bg-gray-800 border-2 border-black dark:border-white">
                <div className="absolute inset-0 rounded-full bg-black dark:bg-white" style={{ width: "24%" }} />
                <span className="absolute inset-0 flex items-center justify-center text-white font-black text-[10px] md:text-xs mix-blend-difference">
                  24 / 100
                </span>
              </div>
            </div>
            
            <div className="flex items-center gap-2 mt-1 md:mt-2">
              <a 
                href="https://github.com/wiweka24" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-8 h-8 md:w-10 md:h-10 rounded-lg flex items-center justify-center border-2 border-black dark:border-white bg-white dark:bg-black text-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all shadow-[2px_2px_0_#000] dark:shadow-[2px_2px_0_#fff] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none cursor-pointer"
                title="GitHub"
              >
                <Github className="size-4 md:size-5" />
              </a>
              <a 
                href="https://www.linkedin.com/in/wiwekays/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-8 h-8 md:w-10 md:h-10 rounded-lg flex items-center justify-center border-2 border-black dark:border-white bg-white dark:bg-black text-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all shadow-[2px_2px_0_#000] dark:shadow-[2px_2px_0_#fff] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none cursor-pointer"
                title="LinkedIn"
              >
                <Linkedin className="size-4 md:size-5" />
              </a>
              <a 
                href="mailto:wiwekayogasadewa@gmail.com" 
                className="w-8 h-8 md:w-10 md:h-10 rounded-lg flex items-center justify-center border-2 border-black dark:border-white bg-white dark:bg-black text-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all shadow-[2px_2px_0_#000] dark:shadow-[2px_2px_0_#fff] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none cursor-pointer"
                title="Email"
              >
                <Mail className="size-4 md:size-5" />
              </a>
            </div>
          </div>


        </div>
      </div>

      {/* ══════════════════════════════════════
          TOP-RIGHT
      ══════════════════════════════════════ */}
      <div ref={setRef("topright")} className="absolute top-8 right-6 md:right-8 flex items-start gap-4 z-10">
        <div className="flex flex-col gap-2">
          <Button className="-rotate-2 w-14 h-14 md:w-20 md:h-20 px-0 py-0 rounded-xl hover:scale-105 active:scale-95 transition-all" onClick={() => setShowCV(!showCV)}>
            <FileText className="size-5 md:size-6" />
            <span className="font-black text-[10px] md:text-xs">{lang === "en" ? "CV" : "履歴書"}</span>
          </Button>
          <Button className="rotate-1 w-14 h-14 md:w-20 md:h-20 px-0 py-0 rounded-xl hover:scale-105 active:scale-95 transition-all" onClick={() => setLang(l => l === "en" ? "jp" : "en")}>
            <Globe className="size-5 md:size-6" />
            <span className="font-black text-[10px] md:text-xs">{lang === "en" ? "日本語" : "English"}</span>
          </Button>
          <Button className="-rotate-1 w-14 h-14 md:w-20 md:h-20 px-0 py-0 rounded-xl hover:scale-105 active:scale-95 transition-all" onClick={() => setDark(d => !d)}>
            {dark ? <Sun className="size-5 md:size-6" /> : <Moon className="size-5 md:size-6" />}
            <span className="font-black text-[10px] md:text-xs">{dark ? (lang === "en" ? "Light" : "ライト") : (lang === "en" ? "Dark" : "ダーク")}</span>
          </Button>
        </div>
      </div>

      {/* ══════════════════════════════════════
          CV CARD (Centered)
      ══════════════════════════════════════ */}
      {showCV && (
        <div ref={setRef("cv")} className="absolute inset-0 flex items-center justify-center z-40 p-4 md:p-10 pointer-events-none">
          <div className="relative w-full max-w-4xl h-[85vh] pointer-events-auto">
            <div className="relative w-full h-full bg-white dark:bg-black border-4 border-black dark:border-white rounded-3xl p-1 md:p-2 shadow-[8px_8px_0_#000] dark:shadow-[8px_8px_0_#fff]">
              
              {/* Header pill */}
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 whitespace-nowrap z-50">
                <span className="font-black px-4 md:px-8 py-2 rounded-full text-sm md:text-lg border-4 border-black dark:border-white bg-black dark:bg-white text-white dark:text-black flex items-center gap-2">
                  <FileText className="size-4 md:size-5" />
                  {lang === "en" ? "Curriculum Vitae" : "履歴書"}
                </span>
              </div>

              {/* Download button */}
              <a 
                href="https://drive.google.com/uc?export=download&id=17xx4F8a_k51XDY88jJbAcvZinMNXxZnh"
                target="_blank"
                rel="noopener noreferrer"
                className="absolute -top-4 right-10 w-10 h-10 md:w-12 md:h-12 rounded-full border-4 border-black dark:border-white ring-2 ring-white bg-black dark:bg-white text-white dark:text-black flex items-center justify-center hover:scale-110 active:scale-90 transition-all z-50 shadow-[4px_4px_0_#000] dark:shadow-[4px_4px_0_#fff] cursor-pointer"
                title={lang === "en" ? "Download CV" : "ダウンロード"}
              >
                <Download className="size-5 md:size-6 stroke-[3px]" />
              </a>

              {/* Close button */}
              <button 
                onClick={() => setShowCV(false)}
                className="absolute -top-4 -right-2 md:-right-4 w-10 h-10 md:w-12 md:h-12 rounded-full border-4 border-black dark:border-white ring-2 ring-white bg-black dark:bg-white text-white dark:text-black flex items-center justify-center hover:scale-110 active:scale-90 transition-all z-50 shadow-[4px_4px_0_#000] dark:shadow-[4px_4px_0_#fff] cursor-pointer"
              >
                <X className="size-5 md:size-6 stroke-[4px]" />
              </button>

              {/* Content frame */}
              <div className="w-full h-full border-4 border-black dark:border-white rounded-2xl overflow-hidden bg-gray-100 dark:bg-gray-900">
                <iframe 
                  src="https://drive.google.com/file/d/17xx4F8a_k51XDY88jJbAcvZinMNXxZnh/preview" 
                  className="w-full h-full block"
                  style={{ border: "none" }}
                  allow="autoplay"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════
          Speech bubble
      ══════════════════════════════════════ */}
      <div ref={setRef("bubble")} className="absolute z-10 cursor-pointer hidden md:block" style={{ top: "22%", right: "25%" }} onClick={nextQuote}>
        <div style={{ transform: "rotate(-5deg)" }}>
          <div className="relative rounded-2xl px-6 py-4 max-w-[280px] bg-white dark:bg-black border-2 border-black dark:border-white transition-all active:scale-95" style={{ boxShadow: dark ? "3px 3px 0 #fff" : "3px 3px 0 #000" }}>
            <p className="font-bold leading-relaxed text-base">
              {lang === "en" ? QUOTES[quoteIndex].en : QUOTES[quoteIndex].jp}
            </p>
            <div className="absolute -bottom-3 left-5.5 w-0 h-0"
              style={{ borderLeft: "10px solid transparent", borderRight: "10px solid transparent", borderTop: `10px solid ${dark ? "white" : "black"}` }} />
            <div className="absolute -bottom-2 left-5 w-0 h-0"
              style={{ borderLeft: "8px solid transparent", borderRight: "8px solid transparent", borderTop: `8px solid ${dark ? "black" : "white"}`, marginLeft: "2px" }} />
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════
          BOTTOM-RIGHT: Stacked Cards
      ══════════════════════════════════════ */}
      <div className="absolute bottom-32 right-4 md:right-10 flex flex-col items-end gap-3 md:gap-10 z-10">
        
        {/* Quest Card */}
        <div ref={setRef("botleft")} className="relative">
          <div style={{ transform: "rotate(-2deg)" }}>
            {/* Outer card */}
            <div
              className="relative rounded-2xl border-2 border-black dark:border-white bg-white dark:bg-black p-1.5 md:p-2 w-[180px] md:w-[280px]"
              style={{ boxShadow: dark ? "3px 3px 0 #fff" : "3px 3px 0 #000" }}
            >
              {/* Quest pill overlapping top border */}
              <div className="absolute -top-3 md:-top-4 left-1/2 -translate-x-1/2 whitespace-nowrap">
                <span
                  className="font-black px-3 md:px-5 py-0.5 md:py-1 rounded-full text-[9px] md:text-sm border-2 border-black dark:border-white bg-black dark:bg-white text-white dark:text-black"
                >
                  {lang === "en" ? "Quest" : "クエスト"}
                </span>
              </div>

              {/* Inner frame */}
              <div className="rounded-xl border-2 border-black dark:border-white px-2 md:px-4 py-2 md:py-4 mt-1.5 md:mt-2 flex flex-col gap-1.5 md:gap-3">
                <div className="flex items-center gap-2 md:gap-3">
                  <div className="w-6 h-6 md:w-10 md:h-10 rounded-lg flex-shrink-0 flex items-center justify-center border-2 border-black dark:border-white bg-gray-100 dark:bg-gray-800">
                    <span className="font-black text-xs md:text-xl text-black dark:text-white">あ</span>
                  </div>
                  <div className="flex flex-col">
                    <p className="font-bold leading-tight text-[10px] md:text-sm truncate max-w-[100px] md:max-w-none">
                      {lang === "en" ? "Learning Japanese" : "日本語を勉強中"}
                    </p>
                    <p className="font-black text-[8px] md:text-xs opacity-60">
                      {lang === "en" ? "Current: N5 / Target: N1" : "現在：N5 / 目標：N1"}
                    </p>
                  </div>
                </div>

                {/* Quest Progress Bar */}
                <div className="flex flex-col gap-0.5 md:gap-1">
                  <div className="flex justify-between items-end px-0.5 md:px-1">
                    <span className="font-black text-[7px] md:text-[10px] uppercase tracking-tighter opacity-50">
                      {lang === "en" ? "Next Boss" : "次のボス"}
                    </span>
                    <div className="flex items-baseline gap-0.5 md:gap-1">
                      <span className="font-black text-[8px] md:text-xs">20%</span>
                      <span className="font-black text-[7px] md:text-[10px] uppercase tracking-tighter opacity-50">/</span>
                      <span className="font-black text-[7px] md:text-[10px] uppercase tracking-tighter">N4</span>
                    </div>
                  </div>
                  <div className="relative h-1 md:h-2 w-full bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden border border-black/10 dark:border-white/10">
                    <div className="absolute inset-y-0 left-0 bg-black dark:bg-white" style={{ width: "20%" }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Music Player Card */}
        <div ref={setRef("music")} className="relative">
          <div style={{ transform: "rotate(-2deg)" }}>
            <div
              className="relative rounded-2xl border-2 border-black dark:border-white bg-white dark:bg-black p-1.5 md:p-2 w-[180px] md:w-[280px]"
              style={{ boxShadow: dark ? "3px 3px 0 #fff" : "3px 3px 0 #000" }}
            >
              <div className="absolute -top-3 md:-top-4 left-1/2 -translate-x-1/2 whitespace-nowrap">
                <span className="font-black px-3 md:px-5 py-0.5 md:py-1 rounded-full text-[9px] md:text-sm border-2 border-black dark:border-white bg-black dark:bg-white text-white dark:text-black">
                  {lang === "en" ? "Now Playing" : "再生中"}
                </span>
              </div>
              <div className="rounded-xl border-2 border-black dark:border-white px-2 md:px-4 py-1.5 md:py-3 mt-1.5 md:mt-2 flex flex-col gap-1.5 md:gap-3">
                <div className="flex items-center gap-3">
                  <div className="flex flex-col flex-1 min-w-0">
                    <p className="font-black text-[10px] md:text-sm leading-tight truncate">{SONGS[currentSongIndex].title}</p>
                    <p className="font-bold text-[8px] md:text-xs opacity-60 truncate">{SONGS[currentSongIndex].artist}</p>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="relative h-1.5 md:h-2 w-full bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden border border-black/10 dark:border-white/10">
                  <div 
                    className="absolute inset-y-0 left-0 bg-black dark:bg-white transition-all duration-1000 ease-linear"
                    style={{ width: `${progress}%` }}
                  />
                </div>

                {/* Controls */}
                <div className="flex items-center justify-center gap-1.5 md:gap-2">
                  <button
                    onClick={handlePrev}
                    disabled={!isPlayerReady}
                    className="w-6 h-6 md:w-10 md:h-10 rounded-lg flex items-center justify-center border-2 border-black dark:border-white bg-black dark:bg-white text-white dark:text-black active:scale-90 transition-all disabled:opacity-50 cursor-pointer"
                  >
                    <SkipBack className="size-2.5 md:size-4" />
                  </button>
                  <button
                    onClick={togglePlay}
                    disabled={!isPlayerReady}
                    className={`w-6 h-6 md:w-10 md:h-10 rounded-lg flex items-center justify-center border-2 border-black dark:border-white bg-black dark:bg-white text-white dark:text-black active:scale-90 transition-all ${!isPlayerReady ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
                  >
                    {isPlaying ? <Pause className="size-2.5 md:size-4" /> : <Play className="size-2.5 md:size-4" />}
                  </button>
                  <button
                    onClick={handleNext}
                    disabled={!isPlayerReady}
                    className="w-6 h-6 md:w-10 md:h-10 rounded-lg flex items-center justify-center border-2 border-black dark:border-white bg-black dark:bg-white text-white dark:text-black active:scale-90 transition-all disabled:opacity-50 cursor-pointer"
                  >
                    <SkipForward className="size-2.5 md:size-4" />
                  </button>
                </div>
              </div>
              {/* Hidden YT container */}
              <div className="absolute pointer-events-none opacity-0 overflow-hidden w-0 h-0">
                <div ref={ytContainerRef} />
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* ── Bottom Nav ── */}
    </div>
  );
}
