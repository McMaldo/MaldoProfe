import { useParams } from "react-router-dom";

export default function FindLink({ linkList }) {
  const { sectionSearch, courseSearch, classSearch } = useParams();
  const link = linkList
    .find((section) => section.id == sectionSearch)
    .courses.find((clase) => clase.id == courseSearch)
    .links.find((link) => link.id == classSearch).href;
  window.location.href = link;
  return;
}
