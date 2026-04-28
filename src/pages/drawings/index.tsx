import { useEffect, useState } from "react";

const DRAWINGS = [
  {
    id: 1,
    title: "Cyberpunk Alley",
    image:
      "https://images.unsplash.com/photo-1605142859862-978be7eba909?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 2,
    title: "Neon Nights",
    image:
      "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 3,
    title: "Future City",
    image:
      "https://images.unsplash.com/photo-1614728263952-84ea256f9679?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 4,
    title: "Glitched Reality",
    image:
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 5,
    title: "Digital Soul",
    image:
      "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 6,
    title: "Vaporwave Dreams",
    image:
      "https://images.unsplash.com/photo-1618005182312-d4e73273e5da?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 7,
    title: "Static Void",
    image:
      "https://images.unsplash.com/photo-1633167606207-d840b5070fc2?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 8,
    title: "Chrome Forest",
    image:
      "https://images.unsplash.com/photo-1614850523296-d8c1af93d400?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 9,
    title: "Binary Sunset",
    image:
      "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 10,
    title: "Acid Rain",
    image:
      "https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 11,
    title: "Neural Link",
    image:
      "https://images.unsplash.com/photo-1627163439134-7a8c47e08238?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 12,
    title: "Circuit Break",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=800&auto=format&fit=crop",
  },
];

export default function Drawings() {
  const [isOpen, setIsOpen] = useState(false);
  const [showSpine, setShowSpine] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [dark] = useState(() =>
    document.documentElement.classList.contains("dark"),
  );

  const totalPages = Math.ceil(DRAWINGS.length / 2);

  const nextPage = () => setCurrentPage((p) => Math.min(p + 1, totalPages - 1));
  const prevPage = () => setCurrentPage((p) => Math.max(p - 1, 0));

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        if (!isOpen) {
          setIsOpen(true);
          setTimeout(() => setShowSpine(true), 1800);
        } else if (currentPage === totalPages - 1) {
          setIsOpen(false);
          setShowSpine(false);
          setCurrentPage(0);
        } else {
          nextPage();
        }
      }
      if (e.key === "ArrowLeft") {
        if (isOpen && currentPage === 0) {
          setIsOpen(false);
          setShowSpine(false);
        } else if (isOpen) {
          prevPage();
        }
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen, currentPage, totalPages]);

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-white font-black text-black transition-colors duration-300 dark:bg-black dark:text-white">
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

      {/* ── Centered area between borders and nav ── */}
      <div
        className="absolute flex flex-col items-center justify-center gap-6"
        style={{ top: "16px", bottom: "96px", left: "16px", right: "16px" }}
      >

      {/* 3D Book Container */}
      <div
        className="relative flex items-center justify-center"
        style={{
          perspective: "2000px",
          width: "80vw",
          height: "70vh",
        }}
      >
        <div
          className={`preserve-3d relative h-full w-full transform-gpu ${!isOpen ? "cursor-pointer" : ""}`}
          style={{ transformStyle: "preserve-3d" }}
          onClick={() => {
            if (!isOpen) {
              setIsOpen(true);
              setTimeout(() => setShowSpine(true), 1800);
            }
          }}
        >
          {/* Cover */}
          <div
            className="preserve-3d absolute inset-0 z-20 h-full w-1/2 origin-right"
            style={{
              transformStyle: "preserve-3d",
              left: 0,
              transform: isOpen
                ? "translateX(0) rotateY(-160deg)"
                : "translateX(50%) rotateY(0deg)",
              transition: "transform 1.8s ease-in-out",
            }}
          >
            {/* Front Cover */}
            <div className="absolute inset-0 flex flex-col items-center justify-center rounded-l-2xl border-4 border-black bg-black p-8 shadow-[4px_4px_0_#000] backface-hidden dark:border-white dark:bg-white dark:shadow-[4px_4px_0_#fff]">
              <div className="flex h-full w-full flex-col items-center justify-center gap-8 rounded-xl border-4 border-white dark:border-black">
                <div className="text-center">
                  <p className="text-2xl tracking-widest text-white dark:text-black">
                    SKETCHBOOK
                  </p>
                  <p className="mt-2 text-sm text-white opacity-50 dark:text-black">
                    WIWEKA24 / VOL. 1
                  </p>
                </div>
              </div>
            </div>
            {/* Inside Front Cover */}
            <div className="absolute inset-0 rotate-y-180 rounded-l-2xl border-4 border-black bg-white backface-hidden dark:border-white dark:bg-black" />
          </div>

          {/* Pages */}
          <div
            className={`absolute inset-0 flex h-full w-full overflow-hidden rounded-2xl border-4 border-black bg-white shadow-[4px_4px_0_#000] dark:border-white dark:bg-black dark:shadow-[4px_4px_0_#fff] ${isOpen ? "opacity-100" : "pointer-events-none opacity-0"}`}
            style={{
              transition: isOpen
                ? "opacity 0.3s ease 1.5s"
                : "opacity 0.3s ease",
            }}
          >
            {/* Left Page */}
            <div
              className="flex h-full w-1/2 flex-col border-r-2 border-black/10 p-8 dark:border-white/10"
              style={{
                cursor: isOpen
                  ? currentPage === 0
                    ? "zoom-out"
                    : "w-resize"
                  : "default",
              }}
              onClick={() => {
                if (!isOpen) return;
                if (currentPage === 0) {
                  setIsOpen(false);
                  setShowSpine(false);
                } else {
                  prevPage();
                }
              }}
            >
              {isOpen && DRAWINGS[currentPage * 2] && (
                <div className="flex min-h-0 flex-1 flex-col gap-4">
                  <div className="min-h-0 flex-1 overflow-hidden rounded-xl border-4 border-black dark:border-white">
                    <img
                      src={DRAWINGS[currentPage * 2].image}
                      alt={DRAWINGS[currentPage * 2].title}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="text-right">
                    <p className="text-xs opacity-50">
                      #00{DRAWINGS[currentPage * 2].id}
                    </p>
                    <p className="text-xl tracking-tighter uppercase">
                      {DRAWINGS[currentPage * 2].title}
                    </p>
                  </div>
                </div>
              )}
            </div>
            {/* Right Page */}
            <div
              className="flex h-full w-1/2 flex-col p-8"
              style={{
                cursor: isOpen
                  ? currentPage === totalPages - 1
                    ? "zoom-out"
                    : "e-resize"
                  : "default",
              }}
              onClick={() => {
                if (!isOpen) return;
                if (currentPage === totalPages - 1) {
                  setIsOpen(false);
                  setShowSpine(false);
                  setCurrentPage(0);
                } else {
                  nextPage();
                }
              }}
            >
              {isOpen && DRAWINGS[currentPage * 2 + 1] && (
                <div className="flex min-h-0 flex-1 flex-col gap-4">
                  <div className="min-h-0 flex-1 overflow-hidden rounded-xl border-4 border-black dark:border-white">
                    <img
                      src={DRAWINGS[currentPage * 2 + 1].image}
                      alt={DRAWINGS[currentPage * 2 + 1].title}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="text-xs opacity-50">
                      #00{DRAWINGS[currentPage * 2 + 1].id}
                    </p>
                    <p className="text-xl tracking-tighter uppercase">
                      {DRAWINGS[currentPage * 2 + 1].title}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Spine effect */}
          {showSpine && (
            <div className="absolute top-0 bottom-0 left-[calc(50%-10px)] z-30 w-5 bg-black/5 dark:bg-white/5" />
          )}
        </div>
      </div>

      {/* Interaction Hint — fixed height so book never shifts */}
      <div className="flex h-8 items-center justify-center gap-2">
        {isOpen ? (
          <>
            <div
              className="flex h-7 w-7 items-center justify-center rounded border-[1.5px] border-black opacity-40 dark:border-white"
              style={{ boxShadow: dark ? "0 2px 0 #fff" : "0 2px 0 #000" }}
            >
              <svg viewBox="0 0 10 10" fill="currentColor" className="h-2.5 w-2.5">
                <path d="M8,2 L2,5 L8,8 Z" />
              </svg>
            </div>
            <div
              className="flex h-7 w-7 items-center justify-center rounded border-[1.5px] border-black opacity-40 dark:border-white"
              style={{ boxShadow: dark ? "0 2px 0 #fff" : "0 2px 0 #000" }}
            >
              <svg viewBox="0 0 10 10" fill="currentColor" className="h-2.5 w-2.5">
                <path d="M2,2 L8,5 L2,8 Z" />
              </svg>
            </div>
          </>
        ) : (
          <div
            className="flex h-7 w-7 animate-bounce items-center justify-center rounded border-[1.5px] border-black opacity-40 dark:border-white"
            style={{ boxShadow: dark ? "0 2px 0 #fff" : "0 2px 0 #000" }}
          >
            <svg viewBox="0 0 10 10" fill="currentColor" className="h-2.5 w-2.5">
              <path d="M2,2 L8,5 L2,8 Z" />
            </svg>
          </div>
        )}
      </div>

      </div>{/* end centered wrapper */}


      {/* CSS for custom transforms that Tailwind might not handle perfectly out of box */}
      <style>{`
        .perspective-2000 { perspective: 2000px; }
        .preserve-3d { transform-style: preserve-3d; }
        .backface-hidden { backface-visibility: hidden; }
        .rotate-y-0 { transform: rotateY(0deg); }
        .rotate-y-180 { transform: rotateY(180deg); }
        .rotate-y-\[-10deg\] { transform: rotateY(-10deg); }
        .rotate-y-\[-160deg\] { transform: rotateY(-160deg); }
      `}</style>
    </div>
  );
}
