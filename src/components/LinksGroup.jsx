import { useRef, useState } from "react";

export default function LinksGroup({ course }) {
  const [btnHover, setBtnHover] = useState({ left: 0, w: 0, h: 0 });
  const linkContainer = useRef(null);
  const linkSubContainer = useRef(null);
  const [isListOpened, setListOpened] = useState(false);

  return (
    <article className="animate-scale-in w-full flex flex-col">
      <button
        className={`${isListOpened ? "rounded-t-md" : "rounded-md"} bg-mantle py-2 px-4 text-start border border-transparent text-sm transition-all active:bg-surface-0 hover:bg-base active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none cursor-pointer`}
        type="button"
        onClick={() => setListOpened(!isListOpened)}
      >
        {course.name}
      </button>
      <div
        ref={linkContainer}
        className={`border border-t-0 ${
          isListOpened ? `border-mantle rounded-b-md` : "border-transparent"
        } overflow-hidden transition-all duration-200 ease-in-out`}
        style={{
          height: isListOpened
            ? linkSubContainer.current.getBoundingClientRect().height
            : 0,
        }}
      >
        <div
          ref={linkSubContainer}
          className="group relative w-full flex flex-col p-2"
        >
          {course.links.map((link, linkIndex) =>
            link.href ? (
              <a
                key={linkIndex}
                href={link.href}
                target="_blank"
                className="z-1 w-fill flex gap-2"
                onMouseEnter={(e) => {
                  const position =
                    linkContainer.current.getBoundingClientRect().top;
                  const btn = e.currentTarget
                    .querySelector("div")
                    .getBoundingClientRect();
                  setBtnHover({
                    t: btn.top - position,
                    w: btn.width,
                    h: btn.height,
                  });
                }}
              >
                <div className="py-1 px-2 text-subtext-1 font-light w-fit flex gap-2 items-center">
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
                  <span>{link.name}</span>
                </div>

                {link.date && (
                  <span className="flex-1 text-end text-surface-0">
                    {link.date}
                  </span>
                )}
              </a>
            ) : (
              <span
                key={linkIndex}
                className="z-1 pt-1 mx-3 text-subtext-0 font-light w-[calc(100%-1.5rem)] border-b border-mantle text-sm"
              >
                {link.name}
              </span>
            ),
          )}
          <div
            className="absolute w-0 rounded-sm group-hover:bg-mantle transition-all duration-150"
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
