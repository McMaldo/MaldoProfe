import { type FC, useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import type { Link, Divider, Section } from "../../types/Links";
import { useSections } from "../../context/SectionsContext";
import LinkItem from "../atom/LinkItem";

const isLink = (item: Link | Divider): item is Link => "href" in item;

const CoursePopup: FC = () => {
  const { sectionId, courseId } = useParams();
  const navigate = useNavigate();
  const { getSection, loadSection } = useSections();
  const [sections, setSections] = useState<Section[]>(
    () => getSection(sectionId ?? "") ?? [],
  );
  const [isClosing, setIsClosing] = useState(false);
  const isClosingRef = useRef(false);

  useEffect(() => {
    if (sections.length || !sectionId) return;
    loadSection(sectionId).then(setSections);
  }, [sectionId]);

  const course = sections
    .flatMap((s) => s.courses)
    .find((c) => c.id === courseId);

  const ref = useRef<HTMLDivElement>(null);
  const linkContainer = useRef<HTMLDivElement>(null);
  const [btnHover, setBtnHover] = useState<{ t: number; w: number; h: number }>(
    {
      t: 0,
      w: 0,
      h: 0,
    },
  );

  const onClose = () => {
    isClosingRef.current = true;
    setIsClosing(true);
  };

  const handleAnimationEnd = (e: React.AnimationEvent) => {
    if (isClosingRef.current && e.animationName === "pop-out")
      navigate("../", { relative: "path" });
  };

  const [showBackground, setShowBackground] = useState(false);
  useEffect(() => {
    if (!course) return;
    setShowBackground(false);
    const lastDelay = (course.links.length - 1) * 60;
    const popInDuration = 300;
    const timer = setTimeout(
      () => setShowBackground(true),
      lastDelay + popInDuration,
    );
    return () => clearTimeout(timer);
  }, [courseId]);

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
      <div
        className={`animate-fade-in fixed inset-0 z-11 bg-black/20 dark:bg-black/40 transition-colors backdrop-blur-sm ${isClosing ? "animate-fade-out" : ""}`}
      />
      <div
        ref={ref}
        onAnimationEnd={handleAnimationEnd}
        className={`fixed top-1/2 left-1/2 -translate-1/2 z-12 flex flex-col w-[calc(100%-2rem)] max-w-2xl max-h-[calc(100%-2rem)] rounded-2xl border border-base shadow-xl overflow-hidden ${isClosing ? "animate-pop-out" : "animate-pop-in"}`}
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-4 px-5 py-4 bg-mantle border-b border-base">
          <div>
            <h2 className="text-text font-semibold leading-tight">
              {course.name}
            </h2>
            {course.desc &&
              course.desc.split("\n").map((item, index) => (
                <p key={`desc-${index}`} className="text-surface-2 text-sm">
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
          className="group relative bg-crust/90 flex flex-col overflow-y-auto custom-scroll p-3"
        >
          {showBackground && (
            <div
              id="fondoDeLink"
              className="absolute rounded-sm sm:bg-base transition-all duration-150 pointer-events-none"
              style={{ top: btnHover.t, width: btnHover.w, height: btnHover.h }}
            />
          )}
          {course.links.map((item, index) =>
            !isLink(item) ? (
              <span
                key={`divider-${index}`}
                className="animate-pop-in pt-2 mb-1 px-2 text-subtext-0 border-b border-mantle"
                style={{ animationDelay: `${index * 60}ms` }}
              >
                {item.name}
              </span>
            ) : (
              <div
                key={`link-${index}`}
                className="animate-pop-in"
                style={{ animationDelay: `${index * 60}ms` }}
              >
                <LinkItem
                  link={item}
                  linkContainer={linkContainer}
                  setBtnHover={setBtnHover}
                />
              </div>
            ),
          )}
        </div>
      </div>
    </>
  );
};

export default CoursePopup;
