import { type FC, useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import type { Link, Divider } from "../types/Links";
import { useSections } from "../context/SectionsContext";
import LinkItem from "./LinkItem";

const isLink = (item: Link | Divider): item is Link => "href" in item;

const CoursePopup: FC = () => {
  const { section: sectionId, course: courseId } = useParams();
  const navigate = useNavigate();
  const sections = useSections();

  const course = sections
    .find((s) => s.id === sectionId)
    ?.courses.find((c) => c.id === courseId);

  const ref = useRef<HTMLDivElement>(null);
  const linkContainer = useRef<HTMLDivElement>(null);
  const [btnHover, setBtnHover] = useState<{ t: number; w: number; h: number }>(
    {
      t: 0,
      w: 0,
      h: 0,
    },
  );

  const onClose = () => navigate(-1);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose();
    };
    document.addEventListener("keydown", handleKey);
    document.addEventListener("mousedown", handleClick);
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.removeEventListener("mousedown", handleClick);
    };
  }, []);

  if (!course) return null;

  return (
    <>
      <div className="fixed inset-0 z-11 bg-black/20 dark:bg-black/40 transition-colors" />
      <div
        ref={ref}
        className="fixed top-1/2 left-1/2 -translate-1/2 z-12 flex flex-col w-[calc(100%-2rem)] max-w-2xl max-h-[calc(100%-2rem)] rounded-2xl bg-mantle border border-base shadow-xl overflow-hidden animate-scale-in"
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-4 px-5 py-4 border-b border-base">
          <div>
            <h2 className="text-text font-semibold leading-tight">
              {course.name}
            </h2>
            {course.desc &&
              course.desc.split("\n").map((item, index) => (
                <p key={index} className="text-surface-2 text-sm">
                  {item}
                </p>
              ))}
          </div>
          <button
            onClick={onClose}
            className="shrink-0 p-1 rounded-md text-subtext-0 hover:text-text hover:bg-surface-0 transition-colors"
            aria-label="Cerrar"
          >
            <svg
              className="size-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* Links */}
        <div
          ref={linkContainer}
          className="group relative bg-crust flex flex-col overflow-y-auto custom-scroll p-3"
        >
          <div
            className="absolute rounded-sm sm:bg-base transition-all duration-150 pointer-events-none"
            style={{ top: btnHover.t, width: btnHover.w, height: btnHover.h }}
          />
          {course.links.map((item, i) =>
            !isLink(item) ? (
              <span
                key={`divider-${i}`}
                className="pt-2 mb-1 px-2 text-subtext-0 border-b border-mantle"
              >
                {item.name}
              </span>
            ) : (
              <LinkItem
                key={item.id}
                link={item}
                linkContainer={linkContainer}
                setBtnHover={setBtnHover}
              />
            ),
          )}
        </div>
      </div>
    </>
  );
};

export default CoursePopup;
