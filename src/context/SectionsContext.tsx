import { createContext, useContext } from "react";
import type { Section } from "../types/Links";

export const SectionsContext = createContext<Section[]>([]);
export const useSections = () => useContext(SectionsContext);
