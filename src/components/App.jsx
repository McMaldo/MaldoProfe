import LinksGroup from "./LinksGroup.jsx";
import Hero from "./Hero.jsx";
import Header from "./Header.tsx";
import { useSearch } from "../hook/useSearch.js";

export default function App({ sections }) {
  const { query, setQuery, filtered: sectionsFiltered } = useSearch(sections);

  return (
    <>
      <Header query={query} setQuery={setQuery} />
      <main className="w-full max-w-7xl min-h-dvh flex flex-col items-center gap-4 py-8 px-4">
        <Hero />
        {sectionsFiltered.map((section, index) => (
          <div key={index} className="w-full flex flex-col gap-4">
            <span className="pt-1 text-surface-2 w-full border-b border-mantle text-md">
              {section.name}
            </span>
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
              {section.courses.map((course, index) => (
                <LinksGroup key={index} course={course} />
              ))}
            </div>
          </div>
        ))}
      </main>
    </>
  );
}
