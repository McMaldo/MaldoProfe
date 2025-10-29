import { lazy, StrictMode, Suspense } from "react";
const FaultyTerminal = lazy(() => import("./FaultyTerminal"));
import { useWindowSize } from "../hook/useWindowSize.jsx";

export default function Heading() {
  let windowSize = useWindowSize();
  const box = <div className="size-full bg-gray-900"></div>;
  return (
    <>
      {windowSize.w >= 600 ? (
        <Suspense fallback={box}>
          <FaultyTerminal
            scale={0.9}
            gridMul={[3, 1]}
            digitSize={1.2}
            timeScale={0.4}
            pause={false}
            scanlineIntensity={1}
            glitchAmount={0.5}
            flickerAmount={0.5}
            noiseAmp={1}
            chromaticAberration={0}
            dither={0}
            curvature={0.2}
            tint="#101828"
            mouseReact={false}
            mouseStrength={0}
            pageLoadAnimation={true}
            brightness={1}
          />
        </Suspense>
      ) : (
        box
      )}
    </>
  );
}
