import { useState, useEffect } from "react";
import FaIcon from "./FaIcon";
import { useRandomNumber } from "../hook/useRandomNumber";

export default function Hero() {
  const [ready, setReady] = useState(false);
  const [heroImgNumber, nextHeroImgNumber] = useRandomNumber(8);

  useEffect(() => {
    const timer = setTimeout(() => setReady(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="animate-scale-in relative w-full max-w-3xl aspect-video rounded-md overflow-hidden bg-mantle">
      <div
        className={`select-none transition-opacity duration-300 ${ready ? "opacity-100" : "opacity-0"}`}
      >
        <img
          className="opacity-hero-img-dark absolute size-full object-cover object-center"
          src={`/img/hero-dark-${heroImgNumber}.gif`}
          alt=""
        />
        <img
          className="opacity-hero-img-light absolute size-full object-cover object-center"
          src={`/img/hero-light-${heroImgNumber}.gif`}
          alt=""
        />
      </div>
      <div className="absolute top-0 left-0 size-full flex flex-col gap-4 items-center justify-center lg:items-start lg:justify-end p-4">
        <div className="flex gap-4 flex-wrap justify-center">
          {["Computación", "Informática", "NTICX"].map((tag, tagIndex) => (
            <span
              key={tagIndex}
              className="bg-base text-font-light py-1 px-3 rounded-full text-sm"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
      <button
        className="absolute bottom-4 right-4 bg-mantle p-1 sm:p-2 rounded-lg"
        onClick={() => nextHeroImgNumber()}
      >
        <FaIcon name="dice" />
      </button>
    </div>
  );
}
