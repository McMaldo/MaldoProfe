import { useRef, useState } from "react";

export default function LinksGroup({ course }) {
  const [btnHover, setBtnHover] = useState({ left: 0, w: 0, h: 0 });
  const linkContainer = useRef(null);
  const linkSubContainer = useRef(null);
  const [isListOpened, setListOpened] = useState(false);

  return (
    <article className="w-full flex flex-col">
      <button
        className={`${isListOpened ? "rounded-t-md" : "rounded-md"} bg-gray-900 py-2 px-4 text-start border border-transparent text-sm transition-all active:bg-gray-700 hover:bg-gray-800 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none cursor-pointer`}
        type="button"
        onClick={() => setListOpened(!isListOpened)}
      >
        {course.name}
      </button>
      <div
        ref={linkContainer}
        className={`border border-t-0 ${
          isListOpened ? `border-gray-900 rounded-b-md` : "border-transparent"
        } overflow-hidden transition-all duration-200 ease-in-out`}
        style={{
          height: isListOpened
            ? linkSubContainer.current.getBoundingClientRect().height
            : 0,
        }}
      >
        <div
          ref={linkSubContainer}
          className="group relative w-full flex flex-col gap-2 p-2"
        >
          {course.links.map((link, linkIndex) =>
            link.href ? (
              <div
                key={linkIndex}
                className="z-1 w-fill"
                onMouseEnter={(e) => {
                  const position =
                    linkContainer.current.getBoundingClientRect().top;
                  const btn = e.currentTarget
                    .querySelector("a")
                    .getBoundingClientRect();
                  setBtnHover({
                    t: btn.top - position,
                    w: btn.width,
                    h: btn.height,
                  });
                }}
              >
                <a
                  href={link.href}
                  target="_blank"
                  className="py-1 px-3 text-slate-300 font-light w-fit flex gap-2 items-center"
                >
                  <img
                    className="size-4"
                    src={
                      link.href.includes("docs.google.com/document")
                        ? "/icon/google_docs.ico"
                        : link.href.includes("docs.google.com/spreadsheets")
                          ? "/icon/google_spreadsheets.ico"
                          : link.href.includes(".pdf")
                            ? "/icon/pdf_logo.png"
                            : `https://www.google.com/s2/favicons?domain_url=${link.href}`
                    }
                  />
                  {link.name}
                </a>
              </div>
            ) : (
              <span
                key={linkIndex}
                className="z-1 pt-1 mx-3 text-gray-400 font-light w-[calc(100%-1.5rem)] border-b border-gray-900 text-sm"
              >
                {link.name}
              </span>
            ),
          )}
          <div
            className="absolute w-0 rounded-sm group-hover:bg-gray-900 transition-all duration-150"
            style={{
              top: btnHover.t,
              width: btnHover.w,
              height: btnHover.h,
            }}
          ></div>
        </div>
      </div>
    </article>
  );
}
