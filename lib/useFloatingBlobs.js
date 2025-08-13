"use client";
import { useLayoutEffect } from "react";
import { gsap } from "gsap";

export function useFloatingBlobs(containerRef, itemRefs, options = {}) {
  const opts = {
    clampToContainer: options.clampToContainer ?? true,
    speedRange: options.speedRange || [18, 28],
    scaleRange: options.scaleRange || [1.01, 1.06],
    rotateRange: options.rotateRange || [-4, 4],
    ease: options.ease || "sine.inOut",
  };

  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const items = itemRefs.map((r) => r.current).filter(Boolean);
    if (!items.length) return;

    const rnd = gsap.utils.random;
    const ease = opts.ease;

    const getBounds = (el) => {
      const s = container.getBoundingClientRect();
      const e = el.getBoundingClientRect();
      return {
        maxX: Math.max(0, s.width - e.width),
        maxY: Math.max(0, s.height - e.height),
      };
    };

    const placeInside = (el) => {
      const { maxX, maxY } = getBounds(el);
      const x = rnd(0, opts.clampToContainer ? maxX : maxX + el.offsetWidth);
      const y = rnd(0, opts.clampToContainer ? maxY : maxY + el.offsetHeight);
      gsap.set(el, { x, y });
    };

    const floatToNext = (el) => {
      const { maxX, maxY } = getBounds(el);
      const x = rnd(0, opts.clampToContainer ? maxX : maxX + el.offsetWidth);
      const y = rnd(0, opts.clampToContainer ? maxY : maxY + el.offsetHeight);
      const duration = rnd(opts.speedRange[0], opts.speedRange[1], 0.1);
      gsap.to(el, { x, y, duration, ease, onComplete: () => floatToNext(el) });
    };

    const ctx = gsap.context(() => {
      items.forEach((el, i) => {
        placeInside(el);
        floatToNext(el);
        gsap.to(el, {
          rotate: rnd(opts.rotateRange[0], opts.rotateRange[1]),
          scale: rnd(opts.scaleRange[0], opts.scaleRange[1]),
          duration: rnd(5, 9, 0.1),
          yoyo: true,
          repeat: -1,
          ease,
          delay: i * 0.15,
        });
      });

      const onResize = () => {
        items.forEach((el) => {
          const { maxX, maxY } = getBounds(el);
          const curX = Number(gsap.getProperty(el, "x")) || 0;
          const curY = Number(gsap.getProperty(el, "y")) || 0;
          gsap.set(el, {
            x: Math.max(0, Math.min(maxX, curX)),
            y: Math.max(0, Math.min(maxY, curY)),
          });
        });
      };
      window.addEventListener("resize", onResize);
      return () => window.removeEventListener("resize", onResize);
    }, container);

    return () => ctx.revert();
  }, [containerRef, itemRefs, JSON.stringify(options)]);
}
