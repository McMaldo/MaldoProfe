import { useState, useEffect } from "react";
import { useSections } from "../context/SectionsContext";
import type { Section } from "../types/Links";

export function useSectionData(
  sectionList: { id: string; name: string }[],
  shouldLoadAll: boolean,
) {
  const { getSection, loadSection } = useSections();
  const [activeSectionId, setActiveSectionId] = useState<string | null>(
    sectionList[0]?.id ?? null,
  );
  const [activeSections, setActiveSections] = useState<Section[]>([]);
  const [allSections, setAllSections] = useState<Section[]>([]);
  const [loading, setLoading] = useState(false);

  // Cargar sección activa
  useEffect(() => {
    if (!activeSectionId) return;
    const cached = getSection(activeSectionId);
    if (cached) {
      setActiveSections(cached);
      return;
    }
    setLoading(true);
    loadSection(activeSectionId).then((data) => {
      setActiveSections(data);
      setLoading(false);
    });
  }, [activeSectionId]);

  // Cargar el resto solo cuando se necesite buscar
  useEffect(() => {
    if (!shouldLoadAll) return;
    const missing = sectionList.filter((s) => !getSection(s.id));
    if (!missing.length) {
      setAllSections(sectionList.flatMap((s) => getSection(s.id) ?? []));
      return;
    }
    Promise.all(missing.map((s) => loadSection(s.id))).then(() => {
      setAllSections(sectionList.flatMap((s) => getSection(s.id) ?? []));
    });
  }, [shouldLoadAll]);

  return {
    activeSections,
    allSections,
    activeSectionId,
    setActiveSectionId,
    loading,
  };
}
