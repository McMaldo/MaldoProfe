import LinksGroup from "./LinksGroup.jsx";
import Heading from "./Heading.jsx";
import Search from "./Search.tsx";
import { useSearch } from "../hook/useSearch.js";

export default function App({ sections }) {
  const { query, setQuery, filtered: sectionsFiltered } = useSearch(sections);

  return (
    <main className="w-full max-w-200 min-h-dvh flex flex-col items-end gap-4 py-8 px-4">
      <Heading />
      <Search searchQuery={query} setSearchQuery={setQuery} />
      {sectionsFiltered.map((section, index) => (
        <div key={index} className="w-full flex flex-col gap-4">
          <span className="pt-1 text-surface-2 w-full border-b border-mantle text-md">
            {section.name}
          </span>
          {section.courses.map((course, index) => (
            <LinksGroup key={index} course={course} />
          ))}
        </div>
      ))}
    </main>
  );
}
