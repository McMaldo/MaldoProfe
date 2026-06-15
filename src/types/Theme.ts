export type Theme =
  | "system"
  | "latte"
  | "mocha"
  | "tokyo-night"
  | "rose-pine-moon"
  | "gruvbox-material"
  | "everforest"
  | "nord"
  | "dracula"
  | "one-dark-pro"
  | "pinkiepie"
  | "gruvbox-material-light";

export const darkThemesArray = [
  "mocha",
  "tokyo-night",
  "rose-pine-moon",
  "gruvbox-material",
  "everforest",
  "nord",
  "dracula",
  "one-dark-pro",
];

export const themesStruct: { value: Theme; label: string; icon: string }[] = [
  { value: "system", label: "Sistema", icon: "circle-half-stroke" },

  // Light
  { value: "latte", label: "Latte", icon: "sun" },
  { value: "pinkiepie", label: "Pinkie Pie", icon: "sun" },
  { value: "gruvbox-material-light", label: "Gruvbox", icon: "sun" },

  // Dark
  { value: "mocha", label: "Mocha", icon: "moon" },
  { value: "tokyo-night", label: "Tokyo Night", icon: "moon" },
  { value: "rose-pine-moon", label: "Rose Pine", icon: "moon" },
  { value: "gruvbox-material", label: "Gruvbox", icon: "moon" },
  { value: "everforest", label: "Everforest", icon: "moon" },
  { value: "nord", label: "Nord", icon: "moon" },
  { value: "dracula", label: "Dracula", icon: "moon" },
  { value: "one-dark-pro", label: "One Dark", icon: "moon" },
];
