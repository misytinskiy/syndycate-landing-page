"use client";
import { useLayoutEffect } from "react";
import { gsap } from "gsap";

/**
 * Плавающие «градиентные пузыри» с безопасным рефлоу.
 *
 * Опции:
 * - boundsStrategy: "clamp" | "none" | "stick"  (по умолчанию: "clamp")
 * - speedRange: [min,max]
 * - scaleRange, rotateRange, ease
 * - reflowDuration, reflowEase
 * - freezeWhileResizing: boolean                  (паузить на resize/RO)
 * - freezeOn: Array<{ref, className?: string, selector?: string}>
 *      className — фризим, если на ref есть этот класс
 *      selector  — фризим, если внутри ref найден элемент по селектору
 */
export function useFloatingBlobs(containerRef, itemRefs, options = {}) {
  const opts = {
    boundsStrategy: options.boundsStrategy || "clamp",
    speedRange: options.speedRange || [18, 28],
    scaleRange: options.scaleRange || [1.01, 1.06],
    rotateRange: options.rotateRange || [-4, 4],
    ease: options.ease || "sine.inOut",
    reflowDuration: options.reflowDuration ?? 0.35,
    reflowEase: options.reflowEase || "power2.out",
    freezeWhileResizing: options.freezeWhileResizing ?? false,
    freezeOn: options.freezeOn || [],
  };

  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const items = itemRefs.map((r) => r?.current).filter(Boolean);
    if (!items.length) return;

    const rnd = gsap.utils.random;
    const ease = opts.ease;

    const moveMap = new WeakMap(); // твин перемещения
    const rotMap = new WeakMap(); // твин поворота/масштаба
    const ratios = new WeakMap(); // для "stick": относительные позиции

    let frozen = false;

    const getBounds = (el) => {
      const s = container.getBoundingClientRect();
      const e = el.getBoundingClientRect();
      const allowOverflow = opts.boundsStrategy === "none";
      return {
        maxX: Math.max(0, s.width - e.width) + (allowOverflow ? e.width : 0),
        maxY: Math.max(0, s.height - e.height) + (allowOverflow ? e.height : 0),
      };
    };

    const clampXY = (el, x, y) => {
      if (opts.boundsStrategy === "none") return { x, y };
      const { maxX, maxY } = getBounds(el);
      return {
        x: Math.max(0, Math.min(maxX, x)),
        y: Math.max(0, Math.min(maxY, y)),
      };
    };

    const killMove = (el) => {
      const t = moveMap.get(el);
      if (t) {
        t.kill();
        moveMap.delete(el);
      }
    };
    const pauseRot = (el) => rotMap.get(el)?.pause();
    const resumeRot = (el) => rotMap.get(el)?.resume();

    const placeInside = (el) => {
      const { maxX, maxY } = getBounds(el);
      const x = rnd(0, maxX);
      const y = rnd(0, maxY);
      gsap.set(el, { x, y, force3D: true });
      if (opts.boundsStrategy === "stick" && (maxX || maxY)) {
        ratios.set(el, { rx: maxX ? x / maxX : 0, ry: maxY ? y / maxY : 0 });
      }
    };

    const floatToNext = (el) => {
      killMove(el);
      const { maxX, maxY } = getBounds(el);
      const x = rnd(0, maxX);
      const y = rnd(0, maxY);
      const t = gsap.to(el, {
        x,
        y,
        duration: rnd(opts.speedRange[0], opts.speedRange[1], 0.1),
        ease,
        overwrite: "auto",
        onComplete: () => {
          moveMap.delete(el);
          if (!frozen) floatToNext(el);
        },
      });
      moveMap.set(el, t);
    };

    const startAll = () => {
      items.forEach((el, i) => {
        placeInside(el);
        floatToNext(el);
        const r = gsap.to(el, {
          rotate: rnd(opts.rotateRange[0], opts.rotateRange[1]),
          scale: rnd(opts.scaleRange[0], opts.scaleRange[1]),
          duration: rnd(5, 9, 0.1),
          yoyo: true,
          repeat: -1,
          ease,
          delay: i * 0.15,
        });
        rotMap.set(el, r);
      });
    };

    const stopAll = () => {
      items.forEach((el) => {
        killMove(el);
        rotMap.get(el)?.kill();
        rotMap.delete(el);
      });
    };

    const freeze = () => {
      if (frozen) return;
      frozen = true;
      items.forEach((el) => {
        killMove(el);
        pauseRot(el);
      });
    };

    const unfreeze = () => {
      if (!frozen) return;
      frozen = false;
      items.forEach((el) => {
        resumeRot(el);
        floatToNext(el);
      });
    };

    const reflow = (smooth = true) => {
      items.forEach((el) => {
        const { maxX, maxY } = getBounds(el);
        const curX = Number(gsap.getProperty(el, "x")) || 0;
        const curY = Number(gsap.getProperty(el, "y")) || 0;

        let nx = curX,
          ny = curY;
        if (opts.boundsStrategy === "stick" && (maxX || maxY)) {
          const r = ratios.get(el) || { rx: 0, ry: 0 };
          nx = r.rx * maxX;
          ny = r.ry * maxY;
        } else {
          const c = clampXY(el, curX, curY);
          nx = c.x;
          ny = c.y;
        }

        if (smooth) {
          gsap.to(el, {
            x: nx,
            y: ny,
            duration: opts.reflowDuration,
            ease: opts.reflowEase,
            overwrite: "auto",
          });
        } else {
          gsap.set(el, { x: nx, y: ny });
        }

        if (opts.boundsStrategy === "stick" && (maxX || maxY)) {
          ratios.set(el, {
            rx: maxX ? nx / maxX : 0,
            ry: maxY ? ny / maxY : 0,
          });
        }
      });
    };

    const ctx = gsap.context(() => {
      startAll();

      // window resize
      const onWinResize = () => {
        if (opts.freezeWhileResizing) freeze();
        reflow(true);
        if (opts.freezeWhileResizing) {
          gsap.delayedCall(Math.max(0.01, opts.reflowDuration), () =>
            unfreeze()
          );
        }
      };
      window.addEventListener("resize", onWinResize);

      // ResizeObserver на контейнер — c raf-дебаунсом
      let ro;
      let roRaf = 0;

      const scheduleReflow = () => {
        if (roRaf) return;
        if (opts.freezeWhileResizing) freeze();

        roRaf = requestAnimationFrame(() => {
          roRaf = 0;
          reflow(true);
          if (opts.freezeWhileResizing) {
            gsap.delayedCall(Math.max(0.01, opts.reflowDuration), () =>
              unfreeze()
            );
          }
        });
      };

      if ("ResizeObserver" in window) {
        ro = new ResizeObserver(scheduleReflow);
        ro.observe(container);
      }

      // Freeze по классам/селектору
      const mos = [];
      const checkFreezeOn = () => {
        const shouldFreeze = (opts.freezeOn || []).some(
          ({ ref, className, selector }) => {
            const el = ref?.current;
            if (!el) return false;
            if (className && el.classList.contains(className)) return true;
            if (selector && el.querySelector?.(selector)) return true;
            return false;
          }
        );
        shouldFreeze ? freeze() : unfreeze();
      };

      (opts.freezeOn || []).forEach(({ ref, className, selector }) => {
        const root = ref?.current;
        if (!root) return;
        const mo = new MutationObserver(checkFreezeOn);
        mo.observe(root, {
          attributes: true,
          attributeFilter: className ? ["class"] : undefined,
          childList: Boolean(selector),
          subtree: Boolean(selector),
        });
        mos.push(mo);
      });
      checkFreezeOn();

      return () => {
        window.removeEventListener("resize", onWinResize);
        if (ro) ro.disconnect();
        mos.forEach((mo) => mo.disconnect());
      };
    }, container);

    return () => {
      stopAll();
      ctx.revert();
    };
  }, [
    containerRef,
    itemRefs,
    opts.boundsStrategy,
    opts.speedRange[0],
    opts.speedRange[1],
    opts.scaleRange[0],
    opts.scaleRange[1],
    opts.rotateRange[0],
    opts.rotateRange[1],
    opts.ease,
    opts.reflowDuration,
    opts.reflowEase,
    opts.freezeWhileResizing,
    Array.isArray(options.freezeOn) ? options.freezeOn.length : 0,
  ]);
}
