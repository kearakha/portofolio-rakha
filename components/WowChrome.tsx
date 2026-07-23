"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { setLenisInstance } from "@/lib/lenis";

gsap.registerPlugin(ScrollTrigger);

export default function WowChrome() {
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const lenis = new Lenis({ duration: 1.15, smoothWheel: true });
    setLenisInstance(lenis);
    const raf = (time: number) => lenis.raf(time * 1000);
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    const progressTween = gsap.to(progressRef.current, {
      scaleX: 1,
      ease: "none",
      scrollTrigger: {
        trigger: document.documentElement,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.3,
      },
    });

    const ring = ringRef.current;
    const dot = dotRef.current;
    let tick: (() => void) | undefined;
    let move: ((e: MouseEvent) => void) | undefined;
    const hoverTargets: HTMLElement[] = [];
    const onEnter = () => {
      if (!ring) return;
      ring.style.width = "64px";
      ring.style.height = "64px";
      ring.style.background = "#fff";
    };
    const onLeave = () => {
      if (!ring) return;
      ring.style.width = "38px";
      ring.style.height = "38px";
      ring.style.background = "transparent";
    };

    if (ring && dot && matchMedia("(hover: hover)").matches) {
      let mx = window.innerWidth / 2;
      let my = window.innerHeight / 2;
      let rx = mx;
      let ry = my;
      const xs = gsap.quickSetter(dot, "x", "px");
      const ys = gsap.quickSetter(dot, "y", "px");
      move = (e: MouseEvent) => {
        mx = e.clientX;
        my = e.clientY;
        xs(mx);
        ys(my);
      };
      window.addEventListener("mousemove", move);
      tick = () => {
        rx += (mx - rx) * 0.18;
        ry += (my - ry) * 0.18;
        ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`;
      };
      gsap.ticker.add(tick);

      document.querySelectorAll<HTMLElement>("[data-cursor]").forEach((el) => {
        el.addEventListener("mouseenter", onEnter);
        el.addEventListener("mouseleave", onLeave);
        hoverTargets.push(el);
      });
    }

    return () => {
      lenis.destroy();
      gsap.ticker.remove(raf);
      progressTween.scrollTrigger?.kill();
      progressTween.kill();
      if (move) window.removeEventListener("mousemove", move);
      if (tick) gsap.ticker.remove(tick);
      hoverTargets.forEach((el) => {
        el.removeEventListener("mouseenter", onEnter);
        el.removeEventListener("mouseleave", onLeave);
      });
    };
  }, []);

  return (
    <>
      <div
        ref={ringRef}
        className="pointer-events-none fixed top-0 left-0 z-[9998] h-[38px] w-[38px] -translate-x-1/2 -translate-y-1/2 rounded-full border-[1.5px] border-white mix-blend-difference transition-[width,height,background] duration-250 ease-out [@media(hover:none)]:hidden"
        style={{ willChange: "transform" }}
      />
      <div
        ref={dotRef}
        className="pointer-events-none fixed top-0 left-0 z-[9999] h-[5px] w-[5px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white mix-blend-difference [@media(hover:none)]:hidden"
        style={{ willChange: "transform" }}
      />
      <div className="fixed top-0 left-0 right-0 z-[200] h-[2px]">
        <div
          ref={progressRef}
          className="h-full origin-left scale-x-0 bg-gray-900"
        />
      </div>
    </>
  );
}
