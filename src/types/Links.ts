export interface Link {
  id: string;
  name: string;
  href: string;
  date: string;
}
export interface Divider {
  name: string;
}
export interface Course {
  id: string;
  name: string;
  desc: string;
  links: (Link | Divider)[];
}
export interface Section {
  id: string; // Años, ej: 2025, 2026
  name: string; // Titulo completo
  courses: Course[];
}
