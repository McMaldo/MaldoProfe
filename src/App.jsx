import LinksGroup from "./components/LinksGroup";
import sections from "./links.json";
import Heading from "./components/Heading.jsx";

export default function App() {
  return (
    <main className="w-full max-w-200 min-h-dvh text-white flex flex-col items-center justify-center gap-4 py-8 px-4">
      <div className="relative w-full h-60 rounded-md overflow-hidden select-none">
        <Heading />
        <div className="absolute top-0 left-0 size-full flex flex-col gap-4 items-center justify-center px-4">
          <h1 className="text-3xl text-center">Clases con MaldoProfe</h1>
          <div className="flex gap-4 flex-wrap justify-center">
            {["Computación", "Informática", "NTICX"].map((tag, tagIndex) => (
              <span
                key={tagIndex}
                className="border border-gray-800 bg-gray-900 py-1 px-3 rounded-full text-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
      {sections.map((section, index) => (
        <div key={index} className="w-full flex flex-col gap-4">
          <span className="pt-1 text-gray-400 font-light w-[calc(100%-1.5rem)] border-b border-gray-900 text-md">
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
