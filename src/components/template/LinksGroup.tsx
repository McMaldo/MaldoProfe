import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import CondensedMessage from "../atom/CondensedMessage";
import LinkItem from "../atom/LinkItem";
import type { Course, Link as LinkType, Divider } from "../../types/Links";

const isLink = (item: LinkType | Divider): item is LinkType => "href" in item;

const parseDate = (date: string): Date => {
  const [day, month] = date.split("/").map(Number);
  return new Date(new Date().getFullYear(), month - 1, day);
};

const getClosestLinks = (links: (LinkType | Divider)[], limit = 3) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Solo links con fecha
  const dated = links
    .filter((l): l is LinkType => isLink(l) && !!l.date)
    .map((l) => ({
      link: l,
      dist: Math.abs(parseDate(l.date).getTime() - today.getTime()),
    }))
    .sort((a, b) => a.dist - b.dist)
    .slice(0, limit)
    .map((l) => l.link);

  // Reordenar según el orden original para no romper la secuencia visual
  const datedIds = new Set(dated.map((l) => l.id));
  return links.filter((l) => isLink(l) && datedIds.has((l as LinkType).id));
};

export default function LinksGroup({
  course,
  sectionId,
}: {
  course: Course;
  sectionId: string;
}) {
  const [btnHover, setBtnHover] = useState({ t: 0, w: 0, h: 0 });
  const linkContainer = useRef<HTMLDivElement>(null);
  const linkSubContainer = useRef<HTMLDivElement>(null);
  const [isListOpened, setListOpened] = useState(false);

  const allLinks = course.links;
  const visibleLinks = getClosestLinks(allLinks);
  const hasMore = allLinks.filter(isLink).length > visibleLinks.length;

  return (
    <article className="animate-scale-in w-full flex flex-col z-0 hover:z-8">
      <button
        className={`z-2 ${isListOpened ? "rounded-t-md" : "rounded-md"} bg-mantle py-2 px-4 text-start border border-transparent transition-all active:bg-surface-0 hover:bg-base active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none flex items-center justify-between overflow-visible`}
        type="button"
        onClick={() => setListOpened(!isListOpened)}
      >
        <span>{course.name}</span>
        {course.desc &&
          (course.desc.includes("<br>") || course.desc.includes("\n") ? (
            <CondensedMessage msg={course.desc} />
          ) : (
            <span className="text-surface-1 text-sm">{course.desc}</span>
          ))}
      </button>

      <div
        ref={linkContainer}
        className={`border border-t-0 ${
          isListOpened ? "border-mantle rounded-b-md" : "border-transparent"
        } overflow-hidden transition-all duration-200 ease-in-out`}
        style={{
          height: isListOpened
            ? (linkSubContainer.current?.getBoundingClientRect().height ?? 0)
            : 0,
        }}
      >
        <div
          ref={linkSubContainer}
          className="group relative w-full flex flex-col items-end p-2"
        >
          {visibleLinks.map((item, i) =>
            !isLink(item) ? (
              <span
                key={i}
                className="z-1 pt-1 mx-3 text-subtext-0 font-light w-[calc(100%-1.5rem)] border-b border-mantle text-sm"
              >
                {item.name}
              </span>
            ) : (
              <LinkItem
                key={item.id ?? i}
                link={item}
                linkContainer={linkContainer}
                setBtnHover={setBtnHover}
              />
            ),
          )}

          {hasMore && (
            <Link
              to={`/${sectionId}/${course.id}`}
              className="w-fit py-1 px-4 text-subtext-0 bg-mantle hover:text-text hover:bg-surface-0 rounded-md transition-colors text-center"
            >
              Ver Curso →
            </Link>
          )}

          <div
            className="absolute w-0 left-2 rounded-md group-hover:bg-mantle transition-all duration-150"
            style={{ top: btnHover.t, width: btnHover.w, height: btnHover.h }}
          />
        </div>
      </div>
    </article>
  );
}
