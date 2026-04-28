import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const NAV_TABS = ["Home", "About", "Projects", "Skills", "Drawings"];

const ROUTE_INDEX: Record<string, number> = {
  "/": 0,
  "/projects": 2,
  "/drawings": 4,
};

const INDEX_ROUTE: Record<number, string> = {
  0: "/",
  2: "/projects",
  4: "/drawings",
};

export default function BottomNav() {
  const location = useLocation();
  const navigate = useNavigate();
  const [dark, setDark] = useState(() =>
    document.documentElement.classList.contains("dark"),
  );

  // Keep dark in sync when toggled from any page
  useEffect(() => {
    const observer = new MutationObserver(() => {
      setDark(document.documentElement.classList.contains("dark"));
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => observer.disconnect();
  }, []);

  const activeIndex = ROUTE_INDEX[location.pathname] ?? 0;
  const n = NAV_TABS.length;

  return (
    <div
      className="absolute bottom-8 left-1/2 z-20 flex w-[calc(100%-4rem)] -translate-x-1/2 rounded-full border-2 border-black bg-white p-1 dark:border-white dark:bg-black"
      style={{ height: "64px", boxShadow: dark ? "4px 4px 0 #fff" : "4px 4px 0 #000" }}
    >
      {/* Sliding active pill — width and left account for p-1 (4px) padding */}
      <div
        className="pointer-events-none absolute top-1 bottom-1"
        style={{
          width: `calc((100% - 8px) / ${n})`,
          left: `calc(4px + ${activeIndex} * (100% - 8px) / ${n})`,
          background: dark ? "#fff" : "#000",
          borderRadius: activeIndex === 0
            ? "9999px 0 0 9999px"
            : activeIndex === n - 1
            ? "0 9999px 9999px 0"
            : "0",
          transition: "left 0.35s cubic-bezier(0.4, 0, 0.2, 1), border-radius 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      />

      {NAV_TABS.map((tab, i) => (
        <button
          key={tab}
          onClick={() => { if (INDEX_ROUTE[i]) navigate(INDEX_ROUTE[i]); }}
          className="relative z-10 flex flex-1 cursor-pointer items-center justify-center font-bold active:scale-95"
          style={{
            fontSize: "15px",
            color: i === activeIndex
              ? dark ? "#000" : "#fff"
              : dark ? "#555" : "#aaa",
            transition: "color 0.35s ease",
          }}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}
