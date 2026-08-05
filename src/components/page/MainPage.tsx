import { FC, useState, useEffect } from "react";
import { Outlet, useParams, useNavigate } from "react-router-dom";
import LinksGroup from "../template/LinksGroup.tsx";
import Hero from "../template/Hero.tsx";
import Header from "../partial/Header.tsx";
import { useSearch } from "../../hook/useSearch.ts";
import Footer from "../partial/Footer.tsx";
import { useSectionData } from "../../hook/useSectionData.tsx";

const MainPage: FC<{ sectionList: { id: string; name: string }[] }> = ({
  sectionList,
}) => {
  const { sectionId } = useParams();
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const {
    activeSections,
    allSections,
    activeSectionId,
    setActiveSectionId,
    loading,
  } = useSectionData(sectionList, query.length > 0);

  const { filtered: sectionsFiltered } = useSearch(
    query.trim() ? allSections : activeSections,
    query,
  );

  // Sincronizar URL → estado
  useEffect(() => {
    if (sectionId && sectionId !== activeSectionId) {
      setActiveSectionId(sectionId);
    }
  }, [sectionId]);

  const handleSectionChange = (id: string) => {
    setActiveSectionId(id);
    navigate(`/${id}`);
  };

  return (
    <>
      <Header query={query} setQuery={setQuery} />
      <main className="w-full max-w-7xl min-h-dvh flex flex-col items-center gap-4 py-8 px-4">
        <Hero />
        <div className="w-full flex gap-2 flex-wrap justify-end">
          {sectionList.map((s) => (
            <button
              key={`section-${s.id}`}
              type="button"
              onClick={() => handleSectionChange(s.id)}
              className={`py-1 px-4 rounded-md border transition-colors text-sm
                ${
                  activeSectionId === s.id
                    ? "bg-surface-0 border-surface-1 text-text"
                    : "bg-mantle border-transparent text-subtext-0 hover:text-text hover:bg-base"
                }`}
            >
              {s.name}
            </button>
          ))}
        </div>
        {loading && <p className="text-subtext-0 text-sm">Cargando...</p>}
        {!loading &&
          sectionsFiltered.map((section, index) => (
            <div key={index} className="w-full flex flex-col gap-4">
              <h2 className="opacity-0 animate-fade-in pt-1 text-surface-2 w-full border-b border-mantle text-2xl">
                {section?.name}
              </h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {section?.courses.map(
                  (course, index) =>
                    course && (
                      <LinksGroup
                        key={`${activeSectionId}-${course.id ?? index}`}
                        course={course}
                        sectionId={section.id}
                        index={index}
                      />
                    ),
                )}
              </div>
            </div>
          ))}
      </main>
      <Footer />
      <Outlet />
    </>
  );
};

export default MainPage;
