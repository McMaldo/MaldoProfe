import { createContext, useContext, useState } from "react";
import type { Section } from "../types/Links";

type SectionsContextType = {
  getSection: (id: string) => Section[] | null;
  loadSection: (id: string) => Promise<Section[]>;
};

const SectionsContext = createContext<SectionsContextType>({
  getSection: () => null,
  loadSection: async () => [],
});

export function SectionsProvider({ children }: { children: React.ReactNode }) {
  const [cache, setCache] = useState<Record<string, Section[]>>({});

  const getSection = (id: string) => cache[id] ?? null;

  const loadSection = async (id: string) => {
    if (cache[id]) return cache[id];
    const res = await fetch(`/data/${id}.json`);
    const json = await res.json();
    const data = Array.isArray(json) ? json : [json];
    setCache((prev) => ({ ...prev, [id]: data }));
    return data;
  };

  return (
    <SectionsContext.Provider value={{ getSection, loadSection }}>
      {children}
    </SectionsContext.Provider>
  );
}

export const useSections = () => useContext(SectionsContext);
