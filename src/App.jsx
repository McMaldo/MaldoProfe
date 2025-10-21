import LinksGroup from "./components/LinksGroup";
import courses from "./links.json";

export default function App() {
  return (
    <>
      {courses.map((course, index) => (
        <LinksGroup key={index} course={course} />
      ))}
    </>
  );
}
