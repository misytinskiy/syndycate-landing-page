"use client";
import { useEffect, useRef, useState } from "react";
import styles from "@/styles/ProgramSection.module.css";
import { flushSync } from "react-dom";

const modules = [
  "Introduction",
  "Market Structure",
  "Liquidity",
  "Premium / Discount Zones",
  "Fair Value Gap",
  "Supply & Demand",
  "Order Flow",
  "Multi-Timeframe Analysis",
  "Sessions / Part 1",
  "Sessions / Part 2",
  "Market Context",
  "Risk Management",
  "Backtest",
  "Statics",
  "Dynamics",
  "Trading Strategy",
  "Indices",
  "News",
  "Useful",
  "Technical Psychology",
  "Roadmap",
  "Crypto",
  "Prop Trading",
  "Forex Market",
  "Algorithms & Dynamics",
  "Working with XAU",
  "Gold & Indices - Differences from forex",
  "Market Manipulations",
];

export default function ProgramSection() {
  const [isExpanded, setIsExpanded] = useState(false); // вместо opened/showAll
  const [openedIdx, setOpenedIdx] = useState(null);

  const wrapperRef = useRef(null);
  const listRef = useRef(null);
  const rowRefs = useRef([]);

  // скролл к открытому пункту
  useEffect(() => {
    if (openedIdx == null) return;
    const el = rowRefs.current[openedIdx];
    if (el) el.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [openedIdx]);

  const VISIBLE_COUNT = 8;
  const DURATION = 1000;

  const easeOutQuad = (t) => t * (2 - t);
  const smoothFollow = (delta) => {
    if (delta <= 0) return;
    const startY = window.scrollY || document.documentElement.scrollTop;
    const t0 = performance.now();
    const step = (now) => {
      const p = Math.min(1, (now - t0) / DURATION);
      const y = startY - delta * easeOutQuad(p);
      window.scrollTo(0, y);
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  const toggleExpand = () => {
    const wrapper = wrapperRef.current;
    const list = listRef.current;
    if (!wrapper || !list) {
      setIsExpanded((v) => !v);
      return;
    }

    const startH = wrapper.getBoundingClientRect().height;
    wrapper.style.height = `${startH}px`;
    wrapper.classList.add(styles.animating);
    void wrapper.offsetHeight;

    if (!isExpanded) {
      // expand как было
      setIsExpanded(true);
      requestAnimationFrame(() => {
        const endH = wrapper.scrollHeight;
        wrapper.style.height = `${endH}px`;
      });
      const onEnd = (e) => {
        if (e.propertyName !== "height") return;
        wrapper.classList.remove(styles.animating);
        wrapper.style.height = "";
        wrapper.removeEventListener("transitionend", onEnd);
      };
      wrapper.addEventListener("transitionend", onEnd);
      return;
    }

    // collapse — расчёт целевой высоты без урезания списка
    const targetRow = list.children[VISIBLE_COUNT - 1] || list.lastElementChild;
    const wrapperTop = wrapper.getBoundingClientRect().top;
    const endH = targetRow
      ? targetRow.getBoundingClientRect().bottom - wrapperTop
      : 0;

    const delta = startH - endH;
    smoothFollow(delta);

    // едем к endH
    requestAnimationFrame(() => {
      wrapper.style.height = `${endH}px`;
    });

    const onEnd = (e) => {
      if (e.propertyName !== "height") return;
      wrapper.removeEventListener("transitionend", onEnd);

      // ЛОК: не отпускаем высоту, пока не урежем список
      wrapper.style.height = `${endH}px`;

      // Синхронно урезаем список, чтобы не было кадра с auto и полным списком
      flushSync(() => setIsExpanded(false));

      // Теперь, когда DOM уже с 8 пунктами, можно отпустить height на следующий кадр
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          wrapper.classList.remove(styles.animating);
          wrapper.style.height = "";
        });
      });
    };
    wrapper.addEventListener("transitionend", onEnd);
  };
  // какие элементы отображать
  const visibleModules = isExpanded ? modules : modules.slice(0, 8);

  return (
    <section className={styles.programSection} id="program">
      <span className={styles.hLine} />
      <div className={styles.columns}>
        <div className={styles.stickyColumn}>
          {/* твой заголовок как был */}
          <h2 className={styles.title}>
            <span className={styles.titleDesktop}>
              NEW PROGRAM <br /> — 28 MODULES <br />
              <span className={styles.primary}>
                A STEP-BY-STEP SYSTEM TO BUILD
              </span>
              <br /> REAL TRADING SKILLS
            </span>

            <span className={styles.titleTablet}>
              NEW PROGRAM <br /> — 28 MODULES <br />
              <span className={styles.primary}>
                A STEP-BY-STEP SYSTEM TO BUILD
              </span>{" "}
              REAL TRADING <br /> SKILLS
            </span>
          </h2>
        </div>

        <div className={styles.contentColumn}>
          {/* абзацы как были */}
          <p className={styles.paragraph}>
            THE PROGRAM IS DESIGNED FOR BOTH BEGINNERS AND EXPERIENCED TRADERS.
            YOU’LL GAIN STRUCTURED THEORETICAL AND PRACTICAL KNOWLEDGE, MASTER
            ESSENTIAL TRADING TOOLS, AND DEVELOP THE DISCIPLINE REQUIRED TO
            SUCCEED IN A MARKET THAT DOESN’T FORGIVE MISTAKES
          </p>
          <p className={styles.paragraph}>
            THE COURSE IS CONSTANTLY UPDATED, ENSURING <br /> YOU ALWAYS HAVE
            ACCESS TO THE LATEST VERSION.
            <span> ADAPT TO THE MARKET — IT WILL NEVER ADAPT TO YOU</span>
          </p>

          {/* обёртка с анимируемой высотой */}
          <div ref={wrapperRef} className={styles.moduleWrapper}>
            <ul ref={listRef} className={styles.moduleList}>
              {visibleModules.map((item, i) => {
                const idx = i; // индекс в видимом списке
                const opened = openedIdx === idx;
                return (
                  // в map:
                  <li
                    key={item}
                    className={`${styles.moduleItem} ${
                      opened ? styles.open : ""
                    }`}
                    ref={(el) => (rowRefs.current[idx] = el)}
                  >
                    <button
                      className={styles.rowBtn}
                      onClick={() => setOpenedIdx(opened ? null : idx)}
                    >
                      <div className={styles.leftPart}>
                        <span className={styles.index}>
                          /{String(modules.indexOf(item) + 1).padStart(2, "0")}
                        </span>
                        <span className={styles.moduleTitle}>{item}</span>
                      </div>
                      <span className={styles.iconBtn}>
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 12 12"
                          fill="none"
                          className={styles.icon}
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M10.95 1.05L1.05 10.95M10.95 1.05V10.95M10.95 1.05H1.05"
                            stroke="#0EFEF2"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                    </button>

                    <div className={styles.answerWrapper}>
                      <p className={styles.answer}>
                        TEST TEXT • HERE WILL BE A SHORT DESCRIPTION OF THE
                        MODULE.
                      </p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* кнопка */}
          <div className={styles.fullRow} onClick={toggleExpand}>
            <button className={styles.fullTextBtn}>
              {isExpanded ? "Hide program" : "The whole program"}
            </button>
            <button
              className={`${styles.fullArrowBtn} ${
                isExpanded ? styles.rotated : ""
              }`}
            >
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10.95 1.05L1.05 10.95M10.95 1.05V10.95M10.95 1.05H1.05"
                  stroke="#0EFEF2"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
