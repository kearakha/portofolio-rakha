"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { MarqueeData } from "@/lib/queries";

gsap.registerPlugin(ScrollTrigger);

type Props = { marquee: MarqueeData | null };

export default function Marquee({ marquee }: Props) {
  const trackRef = useRef<HTMLDivElement>(null);
  const tech = marquee?.tech ?? [];

  useEffect(() => {
    const track = trackRef.current;
    if (!track || tech.length === 0) return;

    let resetTimer: ReturnType<typeof setTimeout>;

    const ctx = gsap.context(() => {
      const loop = gsap.to(track, {
        xPercent: -50,
        repeat: -1,
        duration: 24,
        ease: "none",
      });
      const skewTo = gsap.quickTo(track, "skewX", {
        duration: 0.4,
        ease: "power3",
      });

      ScrollTrigger.create({
        trigger: document.documentElement,
        start: "top top",
        end: "bottom bottom",
        onUpdate: (self) => {
          const v = self.getVelocity();
          skewTo(gsap.utils.clamp(-14, 14, v / -420));
          loop.timeScale(1 + gsap.utils.clamp(0, 4, Math.abs(v) / 420));
          clearTimeout(resetTimer);
          resetTimer = setTimeout(() => {
            skewTo(0);
            loop.timeScale(1);
          }, 130);
        },
      });
    });

    return () => {
      clearTimeout(resetTimer);
      ctx.revert();
    };
  }, [tech]);

  if (tech.length === 0) return null;

  const line = (key: string) => (
    <span
      key={key}
      aria-hidden={key === "b"}
      className="flex gap-[46px] pr-[46px] text-[26px] font-bold text-gray-500 whitespace-nowrap tracking-[-0.01em]"
    >
      {tech.map((item, i) => (
        <span key={i} className="flex gap-[46px]">
          <span>{item}</span>
          <span>·</span>
        </span>
      ))}
    </span>
  );

  return (
    <div className="bg-[#fafafa] py-[26px] overflow-hidden border-t border-b border-gray-200">
      <div ref={trackRef} className="flex w-max will-change-transform">
        {line("a")}
        {line("b")}
      </div>
    </div>
  );
}
