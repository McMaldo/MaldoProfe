import { useState, useEffect } from "react";

export function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    h: window.innerHeight,
    w: window.innerWidth,
  });

  useEffect(() => {
    function handleResize() {
      setWindowSize({ h: window.innerHeight, w: window.innerWidth });
    }

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowSize;
}
