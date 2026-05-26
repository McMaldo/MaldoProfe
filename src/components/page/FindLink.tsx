import { useParams, Link as LinkRRD } from "react-router-dom";
import type { Course, Divider, Link, Section } from "../../types/Links";
import { FC, useEffect, useState } from "react";

const isLink = (item: Link | Divider): item is Link => "href" in item;

type ValidationError = {
  field: "una sección válida" | "un curso válido" | "una clase válida";
  value: string | undefined;
};

const FindLink: FC<{ linkList: Section[] }> = ({ linkList }) => {
  const { sectionSearch, courseSearch, classSearch } = useParams();
  const [errors, setErrors] = useState<ValidationError[]>([]);

  useEffect(() => {
    const errs: ValidationError[] = [];

    const section = linkList?.find((s: Section) => s.id === sectionSearch);
    if (!section) {
      errs.push({ field: "una sección válida", value: sectionSearch });
      setErrors(errs);
      return;
    }

    const course = section.courses.find((c: Course) => c.id === courseSearch);
    if (!course) {
      errs.push({ field: "un curso válido", value: courseSearch });
      setErrors(errs);
      return;
    }

    const linkItem = course.links
      .filter(isLink)
      .find((l: Link) => l.id === classSearch);
    if (!linkItem) {
      errs.push({ field: "una clase válida", value: classSearch });
      setErrors(errs);
      return;
    }

    window.location.href = linkItem.href;
  }, [linkList, sectionSearch, courseSearch, classSearch]);

  const params = [
    { label: "Sección", value: sectionSearch },
    { label: "Curso", value: courseSearch },
    { label: "Clase", value: classSearch },
  ];

  const hasError = (value: string | undefined) =>
    errors.some((e) => e.value === value);

  return (
    <main className="size-full flex-1 flex flex-col items-center justify-center gap-4">
      <article className="bg-mantle rounded-lg p-4 flex flex-col items-center justify-center gap-4">
        <div className="flex gap-3 items-center flex-wrap justify-center">
          <span className="text-subtext-1">Ingresando a</span>
          {params.map(({ label, value }, i) => (
            <span
              key={i}
              className={`px-2 py-1 rounded bg-base ${
                hasError(value)
                  ? "text-red-600 border border-red-400  dark:text-red-400 dark:border-red-600"
                  : ""
              }`}
              title={label}
            >
              {value ?? "—"}
            </span>
          ))}
        </div>

        {errors.length > 0 && (
          <div className="flex flex-col gap-1 items-center text-subtext-1">
            <span>No se encontraron los siguientes datos:</span>
            {errors.map((e, i) => (
              <span key={i}>
                "
                <span className="text-red-600 dark:text-red-400">
                  {e.value ?? "—"}
                </span>
                " no es {e.field}
              </span>
            ))}
            <LinkRRD
              to="/"
              className="mt-3 px-4 py-1 rounded-md bg-base hover:bg-surface-0 text-sm transition-colors"
            >
              Volver al Inicio
            </LinkRRD>
          </div>
        )}
      </article>
    </main>
  );
};

export default FindLink;
