import { lazy, Suspense, useState, useEffect } from "react";
const FaultyTerminal = lazy(() => import("./FaultyTerminal"));
import { useWindowSize } from "../hook/useWindowSize.jsx";

export default function Heading() {
  let windowSize = useWindowSize();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setReady(true), 8000);
    return () => clearTimeout(timer);
  }, []);

  const box = <div className="size-full bg-mantle"></div>;

  return (
    <div className="animate-scale-in relative w-full h-60 rounded-md overflow-hidden select-none">
      {windowSize.w >= 600 ? (
        ready ? (
          <Suspense fallback={box}>
            <FaultyTerminal
              scale={0.9}
              gridMul={[3, 1]}
              digitSize={1.2}
              timeScale={0.2}
              pause={false}
              scanlineIntensity={1}
              glitchAmount={0.5}
              flickerAmount={0.5}
              noiseAmp={1}
              chromaticAberration={0}
              dither={0}
              curvature={0.2}
              tint="#181825"
              mouseReact={false}
              mouseStrength={0}
              pageLoadAnimation={true}
              brightness={1}
              className="pageLoadAnimation"
            />
          </Suspense>
        ) : (
          box
        )
      ) : (
        box
      )}
      <div className="absolute top-0 left-0 size-full flex flex-col gap-4 items-center justify-center px-4">
        <h1 className="text-3xl text-center">Clases con MaldoProfe</h1>
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
    </div>
  );
}
