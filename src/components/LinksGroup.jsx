import { useRef, useState } from "react";

export default function LinksGroup({ course }) {
  const [btnHover, setBtnHover] = useState({ left: 0, w: 0, h: 0 });
  const navRef = useRef(null);
  const [isListOpened, setListOpened] = useState(false);

  return (
    <article className="w-full flex flex-col">
      <button
        className={`${isListOpened ? "rounded-t-md" : "rounded-md"} bg-gray-800 py-2 px-4 text-start border border-transparent text-sm transition-all active:bg-gray-600 hover:bg-gray-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none cursor-pointer`}
        type="button"
        onClick={() => setListOpened(!isListOpened)}
      >
        {course.name}
      </button>
      <div
        ref={navRef}
        className={`group relative border border-t-0 ${isListOpened ? "h-fit p-2 border-gray-800 rounded-b-md" : "h-0 border-transparent"} overflow-hidden w-full flex flex-col gap-2 transition-all duration-300 ease-in-out bg-900`}
      >
        {course.links.map((link, linkIndex) => (
          <div key={linkIndex} className="z-1 relative flex flex-col">
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
          className="absolute w-0 rounded-sm group-hover:bg-gray-800 transition-all duration-150"
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
