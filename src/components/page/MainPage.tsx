import { FC } from "react";
import { Outlet } from "react-router-dom";
import LinksGroup from "../template/LinksGroup.tsx";
import Hero from "../template/Hero.tsx";
import Header from "../partial/Header.tsx";
import { useSearch } from "../../hook/useSearch.ts";
import { SectionsContext } from "../../context/SectionsContext.tsx";
import type { Section } from "../../types/Links.ts";
import Footer from "../partial/Footer.tsx";

const MainPage: FC<{ sections: Section[] }> = ({ sections }) => {
  const { query, setQuery, filtered: sectionsFiltered } = useSearch(sections);

  return (
    <>
      <Header query={query} setQuery={setQuery} />
      <main className="w-full max-w-7xl min-h-dvh flex flex-col items-center gap-4 py-8 px-4">
        <Hero />
        {sectionsFiltered.map((section: Section, index: number) => (
          <div key={index} className="w-full flex flex-col gap-4">
            <h2 className="pt-1 text-surface-2 w-full border-b border-mantle text-2xl">
              {section.name}
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {section.courses.map((course, index) => (
                <LinksGroup
                  key={index}
                  course={course}
                  sectionId={section.id}
                />
              ))}
            </div>
          </div>
        ))}
      </main>
      <Footer />
      <SectionsContext.Provider value={sections}>
        <Outlet />
      </SectionsContext.Provider>
    </>
  );
};
export default MainPage;
