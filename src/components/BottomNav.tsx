import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Home, User, Briefcase, Zap, Palette } from "lucide-react";

const NAV_TABS = [
  { label: "Home", icon: Home, route: "/" },
  { label: "About", icon: User, route: null },
  { label: "Projects", icon: Briefcase, route: "/projects" },
  { label: "Skills", icon: Zap, route: null },
  { label: "Drawings", icon: Palette, route: "/drawings" },
];

const ROUTE_TO_INDEX: Record<string, number> = {
  "/": 0,
  "/projects": 2,
  "/drawings": 4,
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

  const activeIndex = ROUTE_TO_INDEX[location.pathname] ?? 0;
  const n = NAV_TABS.length;

  return (
    <div
      className="absolute bottom-8 left-1/2 z-20 flex w-[calc(100%-2rem)] md:w-[calc(100%-4rem)] -translate-x-1/2 rounded-full border-2 md:border-4 border-black bg-white p-1 dark:border-white dark:bg-black transition-all duration-300"
      style={{ height: "64px", boxShadow: dark ? "4px 4px 0 #fff" : "4px 4px 0 #000" }}
    >
      {/* Sliding active pill */}
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
          key={tab.label}
          onClick={() => { if (tab.route) navigate(tab.route); }}
          className="relative z-10 flex flex-1 cursor-pointer items-center justify-center font-bold active:scale-95 transition-all duration-300"
          style={{
            color: i === activeIndex
              ? dark ? "#000" : "#fff"
              : dark ? "#555" : "#aaa",
          }}
        >
          <span className="hidden md:block text-sm uppercase tracking-widest">{tab.label}</span>
          <tab.icon className="block md:hidden size-6" />
        </button>
      ))}
    </div>
  );
}
