import type {
  Dispatch,
  FC,
  MouseEvent,
  RefObject,
  SetStateAction,
} from "react";
import type { Link } from "../../types/Links";

const parseDate = (date: string): Date => {
  const [day, month] = date.split("/").map(Number);
  return new Date(new Date().getFullYear(), month - 1, day);
};

const getDateStatus = (date?: string): "past" | "today" | "future" | null => {
  if (!date) return null;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const d = parseDate(date);
  d.setHours(0, 0, 0, 0);
  if (d.getTime() === today.getTime()) return "today";
  if (d > today) return "future";
  return "past";
};

const LinkItem: FC<{
  link: Link;
  linkContainer: RefObject<HTMLDivElement | null>;
  setBtnHover: Dispatch<SetStateAction<{ t: number; w: number; h: number }>>;
}> = ({ link, linkContainer, setBtnHover }) => {
  const status = getDateStatus(link.date);
  const isFuture = status === "future";
  const isToday = status === "today";

  const handleMouseEnter = (e: MouseEvent) => {
    const position = linkContainer.current?.getBoundingClientRect().top ?? 0;
    const btn = (e.currentTarget as HTMLElement)
      .querySelector("div")
      ?.getBoundingClientRect();
    if (btn)
      setBtnHover({ t: btn.top - position, w: btn.width, h: btn.height });
  };

  const icon = link.href.includes("docs.google.com/document")
    ? "/icon/google_docs.ico"
    : link.href.includes("docs.google.com/spreadsheets")
      ? "/icon/google_spreadsheets.ico"
      : link.href.includes(".pdf")
        ? "/icon/pdf_logo.png"
        : `https://www.google.com/s2/favicons?domain_url=${link.href}`;

  return (
    <a
      href={isFuture ? undefined : link.href}
      target={isFuture ? undefined : "_blank"}
      onMouseEnter={handleMouseEnter}
      className={`z-1 w-full flex gap-2 items-center relative ${
        isFuture ? "opacity-40 cursor-not-allowed select-none" : ""
      }`}
    >
      {isToday && (
        <svg
          className="size-4 absolute -left-3 fill-surface-0"
          viewBox="0 0 58 67"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M57 31.4478C58.3333 32.2176 58.3333 34.1421 57 34.9119L3 66.0889C1.66667 66.8587 0 65.8964 0 64.3568V2.00299C0 0.463388 1.66667 -0.498868 3 0.270932L57 31.4478Z" />
        </svg>
      )}

      <div
        className={`py-1 px-2 font-light w-fit flex gap-2 items-center ${
          isToday ? "text-text font-medium" : "text-subtext-1"
        }`}
      >
        <img className="size-4" src={icon} alt="" />
        <span>{link.name.split("|")[0]}</span>
      </div>

      {link.date && (
        <span
          className={`flex-1 text-end text-sm ${
            isToday ? "text-surface-1" : "text-surface-0"
          }`}
        >
          {link.date}
        </span>
      )}
    </a>
  );
};

export default LinkItem;
