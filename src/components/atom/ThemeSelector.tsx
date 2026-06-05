import { FC, useState, useRef, useEffect } from "react";
import useTheme from "../../hook/useTheme";
import FaIcon from "./FaIcon";
import { Theme } from "../../types/Theme";
import { useWindowSize } from "../../hook/useWindowSize";

const themes: { value: Theme; label: string; icon: string }[] = [
  { value: "system", label: "Sistema", icon: "circle-half-stroke" },

  // Catppuccin
  { value: "latte", label: "Latte", icon: "sun" },
  { value: "mocha", label: "Mocha", icon: "moon" },

  // Otros temas
  { value: "tokyo-night", label: "Tokyo Night", icon: "moon" },
  { value: "rose-pine-moon", label: "Rose Pine", icon: "moon" },
  { value: "gruvbox-material", label: "Gruvbox", icon: "moon" },
  { value: "everforest", label: "Everforest", icon: "moon" },
  { value: "nord", label: "Nord", icon: "moon" },
  { value: "dracula", label: "Dracula", icon: "moon" },
  { value: "one-dark-pro", label: "One Dark", icon: "moon" },
];

const ThemeSelector: FC = () => {
  const { theme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const { w: windowWidht } = useWindowSize();
  const ref = useRef<HTMLDivElement>(null);

  const current = themes.find((t) => t.value === theme) ?? themes[0];

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div
      ref={ref}
      className="relative w-fit"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      {/* Botón actual */}
      <button
        className="w-fit flex items-center gap-1 p-2 rounded-lg bg-base border border-transparent hover:border-surface-0 transition-all text-sm text-subtext-1"
        aria-label="Cambiar tema"
      >
        <FaIcon name={current.icon} />
        {windowWidht > 600 && <span>{current.label}</span>}
      </button>

      {/* Popup */}
      <div
        className={`absolute right-0 top-[calc(100%+.25rem)] z-50 flex flex-col gap-0.5 p-1 rounded-xl bg-mantle border border-base shadow-md transition-all duration-150 ${
          open
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 -translate-y-1 pointer-events-none"
        }`}
      >
        {themes.map(({ value, label, icon }) => (
          <button
            key={value}
            onClick={() => {
              setTheme(value);
              setOpen(false);
            }}
            className={`flex items-center gap-1 p-2 rounded-lg text-sm transition-all text-start w-full text-nowrap ${
              theme === value
                ? "bg-base text-text"
                : "text-subtext-1 hover:bg-base hover:text-text"
            }`}
          >
            <FaIcon name={icon} />
            <span>{label}</span>
            {theme === value && <FaIcon name="check" />}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ThemeSelector;
