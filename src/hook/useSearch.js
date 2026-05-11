import { useEffect } from "react";
import { useState, useMemo } from "react";

/**
 * useSearch — filtra el vector `sections` por query de texto.
 *
 * @param {Array} sections  - El JSON completo (array de años/secciones).
 * @returns {{ query, setQuery, filtered }}
 *   - query     : string actual del buscador
 *   - setQuery  : setter para conectar al <input>
 *   - filtered  : copia profunda de sections con solo los cursos/links que hacen match
 */
export function useSearch(sections) {
  const [query, setQuery] = useState("");

  const [debouncedQuery, setDebouncedQuery] = useState("");

  useEffect(() => {
    const timeout = setTimeout(() => setDebouncedQuery(query), 300);
    return () => clearTimeout(timeout);
  }, [query]);

  const filtered = useMemo(() => {
    const q = debouncedQuery.trim().toLowerCase();

    // Sin búsqueda → devolver todo sin tocar
    if (!q) return sections;

    return sections
      .map((section) => {
        // Filtrar cursos dentro de cada año
        const matchedCourses = section.courses
          .map((course) => {
            // El nombre del curso hace match → incluir todos sus links
            if (course.name.toLowerCase().includes(q)) {
              return course;
            }

            // Filtrar links individuales dentro del curso
            const matchedLinks = course.links.filter((link) =>
              link.name?.toLowerCase().includes(q),
            );

            if (matchedLinks.length === 0) return null;

            return { ...course, links: matchedLinks };
          })
          .filter(Boolean); // quitar cursos sin resultados

        if (matchedCourses.length === 0) return null;

        return { ...section, courses: matchedCourses };
      })
      .filter(Boolean); // quitar años sin resultados
  }, [sections, debouncedQuery]);

  return { query, setQuery, filtered };
}
