import { useRef, useState } from "react";

export default function LinksGroup({ course }) {
  const [btnHover, setBtnHover] = useState({ left: 0, w: 0, h: 0 });
  const navRef = useRef(null);
  const [isListOpened, setListOpened] = useState(false);

  return (
    <article className="w-full flex flex-col gap-2">
      <button
        className="rounded-md bg-gray-900 py-2 px-4 text-start border border-transparent text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-gray-700 hover:bg-gray-800 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none cursor-pointer"
        type="button"
        onClick={() => setListOpened(!isListOpened)}
      >
        {course.name}
      </button>
      <div
        ref={navRef}
        className={`group relative ${isListOpened ? "h-fit p-2 border border-gray-800 rounded-lg" : "h-0"} overflow-hidden w-full flex flex-col gap-2 transition-all duration-300 ease-in-out bg-900`}
      >
        {course.links.map((link, linkIndex) => (
          <div
            key={linkIndex}
            className="z-1 relative flex flex-col bg-transparent"
          >
            <a
              href={link.href}
              className="py-1 px-3 text-slate-300 font-light w-fit flex gap-2 items-center"
              target="_blank"
              onMouseEnter={(e) => {
                const position = navRef.current.getBoundingClientRect().top;
                const btn = e.target.getBoundingClientRect();
                setBtnHover({
                  t: btn.top - position,
                  w: btn.width,
                  h: btn.height,
                });
              }}
            >
              <img
                className="size-4"
                src={
                  link.href.includes("docs.google.com")
                    ? "/google_docs.ico"
                    : !link.href.includes("http")
                      ? "/pdf_logo.png"
                      : `https://www.google.com/s2/favicons?domain_url=${link.href}`
                }
              />
              {link.name}
            </a>
          </div>
        ))}
        <div
          className="absolute w-0 rounded-sm group-hover:bg-gray-900 transition-all duration-150"
          style={{
            top: btnHover.t,
            width: btnHover.w,
            height: btnHover.h,
          }}
        ></div>
      </div>
    </article>
  );
}
