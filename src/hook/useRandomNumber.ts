import { useState } from "react";

export function useRandomNumber(
  maxNumber: number,
): [number, (total?: number) => void] {
  const [randomNumber, setRandomNumber] = useState<number>(() => {
    // Inicialización lazy
    return getNext(maxNumber);
  });

  const getRandomNumber = (total: number = maxNumber) => {
    setRandomNumber(getNext(total));
  };

  return [randomNumber, getRandomNumber];
}

// Lógica extraída fuera del hook para no recrearla en cada render
function getNext(total: number): number {
  let pool: number[] = JSON.parse(sessionStorage.getItem("heroPool") || "null");

  if (!pool || pool.length === 0) {
    pool = Array.from({ length: total }, (_, i) => i);
    for (let i = pool.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [pool[i], pool[j]] = [pool[j], pool[i]];
    }
  }

  const next = pool.shift()!;
  sessionStorage.setItem("heroPool", JSON.stringify(pool));
  return next;
}
