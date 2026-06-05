import { useEffect, useState } from "react";
import { Theme } from "../types/Theme";

const getSystemTheme = (): "light" | "dark" =>
  window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";

const DARK_THEMES = new Set([
  "mocha",
  "tokyo-night",
  "rose-pine-moon",
  "gruvbox-material",
  "everforest",
  "nord",
  "dracula",
  "one-dark-pro",
]);

const getColorScheme = (theme: Theme): "light" | "dark" => {
  if (theme === "system") return getSystemTheme();
  return DARK_THEMES.has(theme) ? "dark" : "light";
};

const applyTheme = (theme: Theme) => {
  const resolvedTheme = theme === "system" ? getSystemTheme() : theme;

  document.documentElement.setAttribute("data-theme", resolvedTheme);

  document.documentElement.setAttribute(
    "data-color-scheme",
    getColorScheme(theme),
  );
};

const useTheme = () => {
  const [theme, setTheme] = useState<Theme>(
    () => (localStorage.getItem("theme") as Theme) ?? "system",
  );

  useEffect(() => {
    applyTheme(theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    if (theme !== "system") return;

    const media = window.matchMedia("(prefers-color-scheme: dark)");

    const handleChange = () => applyTheme("system");

    media.addEventListener("change", handleChange);

    return () => media.removeEventListener("change", handleChange);
  }, [theme]);

  return { theme, setTheme };
};

export default useTheme;
