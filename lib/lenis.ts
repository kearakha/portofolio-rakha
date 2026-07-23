import type Lenis from "lenis";

export let lenisInstance: Lenis | null = null;

export function setLenisInstance(lenis: Lenis) {
  lenisInstance = lenis;
}
