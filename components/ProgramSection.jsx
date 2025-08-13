"use client";
import { useEffect, useRef, useState } from "react";
import styles from "@/styles/ProgramSection.module.css";
import { flushSync } from "react-dom";
import { useFloatingBlobs } from "@/lib/useFloatingBlobs";

export const modules = [
  {
    title: "Introduction",
    answer:
      "Understanding what is trading, how it works, and your first steps.",
  },
  {
    title: "Market Structure",
    answer:
      "Market Structure Range, strong and weak swings, advanced structure.",
  },
  {
    title: "Liquidity",
    answer: "Definition, operating principles, and structural liquidity.",
  },
  {
    title: "Premium / Discount Zones",
    answer: "Using the Fibonacci grid and P/D zones.",
  },
  {
    title: "Fair Value Gap",
    answer:
      "Market imbalance, efficient vs. inefficient price delivery, rebalancing and price interaction with gaps, IFVG.",
  },
  {
    title: "Supply & Demand",
    answer:
      'Order Block, Blocks: Breaker, Mitigation, Rejection, Propulsion. "buy to sell" and "sell to buy" manipulation. Price delivery mechanics.',
  },
  {
    title: "Order Flow",
    answer:
      "How price reacts to liquidity, order flow and its components, types of order flow, inducement, examples.",
  },
  {
    title: "Multi-Timeframe Analysis",
    answer:
      "Effective chart analysis, optimal entry and target identification, recognition of key interest zones.",
  },
  {
    title: "Sessions / Part 1",
    answer:
      "Optimal trading periods, liquidity across sessions, raids on previous session high/low, Asia/London and London/New York.",
  },
  {
    title: "Sessions / Part 2",
    answer:
      "Session dynamics, workflow scheme, principle of operation based solely on liquidity and balance.",
  },
  {
    title: "Market Context",
    answer:
      "How to identify context? Context interpretation from SNDCT mentors.",
  },
  {
    title: "Risk Management",
    answer:
      "Risk/reward, how to calculate volume in TradingView for any asset, high vs low RR.",
  },
  {
    title: "Backtest",
    answer: "What is backtest. How to backtest correctly.",
  },
  {
    title: "Statics",
    answer:
      "What is statics, statics in dynamics, how to create your own setup.",
  },
  {
    title: "Dynamics",
    answer: "What is dynamics, example of applying a dynamic approach.",
  },
  {
    title: "Trading Strategy",
    answer:
      "Creating your own trading strategy, optimization, trading strategy templates.",
  },
  {
    title: "Indices",
    answer:
      "How to trade indices, correlations between indices. GER40, NAS100, S&P500.",
  },
  {
    title: "News",
    answer:
      "Forex news calendar, how news affects the market, NFP/CPI reports, FOMC meetings.",
  },
  {
    title: "Useful",
    answer:
      "AMD/PO3, SMT Divergence, causes of resweeps, price assignment, and spread.",
  },
  {
    title: "Technical Psychology",
    answer:
      "Trading plan and rules, managing emotions during trading, risk management and psychology.",
  },
  {
    title: "Roadmap",
    answer:
      "Turning knowledge into action: steps to take after completing your course.",
  },
  {
    title: "Crypto",
    answer: "Trading features, spot, drop, farming/staking.",
  },
  {
    title: "Prop Trading",
    answer: "What is prop trading? How to choose the right prop? Prop FAQ.",
  },
  {
    title: "Forex Market",
    answer:
      "Terminology, contract types, trading platforms, fundamentals of brokerage services, and market basics.",
  },
  {
    title: "Algorithms & Dynamics",
    answer: "Trading algorithms, models and long-term strategies.",
  },
  {
    title: "Working with XAU",
    answer:
      "How to trade using 4H/15M charts? Understanding price action and key features.",
  },
  {
    title: "Gold & Indices - Differences from forex",
    answer:
      "Timing manipulations, timing strategies for indices and gold, specifics of trading U.S. indices, and how to trade high risk/reward setups.",
  },
  {
    title: "Market Manipulations",
    answer:
      "Why does sweep and reversal not happen? Reversals, why do we get BE and then TP? How to understand key fractals?",
  },
];

export default function ProgramSection() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [openedIdx, setOpenedIdx] = useState(null);

  const wrapperRef = useRef(null);
  const listRef = useRef(null);
  const rowRefs = useRef([]);

  const sectionRef = useRef(null);
  const gradRef = useRef(null);
  const rowAnimTimerRef = useRef(null);

  useFloatingBlobs(sectionRef, [gradRef], {
    boundsStrategy: "stick",
    freezeWhileResizing: true,
    reflowDuration: 0.25,
    reflowEase: "power2.out",
    freezeOn: [
      { ref: wrapperRef, className: styles.animating }, // анимация «весь список»
      { ref: listRef, className: styles.rowAnimating }, // анимация «одна строка»
    ],
  });

  useEffect(() => {
    if (openedIdx == null) return;
    const el = rowRefs.current[openedIdx];
    if (el) el.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [openedIdx]);

  const toggleRow = (idx) => {
    const list = listRef.current;
    const row = rowRefs.current[idx];
    const answer = row?.querySelector(`.${styles.answerWrapper}`);

    // если по какой-то причине не нашли элементы — просто переключаем
    if (!list || !answer) {
      setOpenedIdx((cur) => (cur === idx ? null : idx));
      return;
    }

    // сообщаем хуку, что идёт локальная анимация высоты
    list.classList.add(styles.rowAnimating);

    const off = (e) => {
      if (e.propertyName !== "max-height") return; // ждём конца transition у answerWrapper
      list.classList.remove(styles.rowAnimating);
      answer.removeEventListener("transitionend", off);
    };
    answer.addEventListener("transitionend", off);

    setOpenedIdx((cur) => (cur === idx ? null : idx));
  };

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

    const targetRow = list.children[VISIBLE_COUNT - 1] || list.lastElementChild;
    const wrapperTop = wrapper.getBoundingClientRect().top;
    const endH = targetRow
      ? targetRow.getBoundingClientRect().bottom - wrapperTop
      : 0;

    const delta = startH - endH;
    smoothFollow(delta);

    requestAnimationFrame(() => {
      wrapper.style.height = `${endH}px`;
    });

    const onEnd = (e) => {
      if (e.propertyName !== "height") return;
      wrapper.removeEventListener("transitionend", onEnd);

      wrapper.style.height = `${endH}px`;

      flushSync(() => setIsExpanded(false));

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          wrapper.classList.remove(styles.animating);
          wrapper.style.height = "";
        });
      });
    };
    wrapper.addEventListener("transitionend", onEnd);
  };
  const visibleModules = isExpanded ? modules : modules.slice(0, 8);

  return (
    <section className={styles.programSection} id="program" ref={sectionRef}>
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
                const idx = i; // индекс внутри текущего (видимого) списка
                const opened = openedIdx === idx;

                return (
                  <li
                    key={`${i}-${item.title}`}
                    className={`${styles.moduleItem} ${
                      opened ? styles.open : ""
                    }`}
                    ref={(el) => (rowRefs.current[idx] = el)}
                  >
                    <button
                      className={styles.rowBtn}
                      onClick={() => toggleRow(idx)}
                    >
                      <div className={styles.leftPart}>
                        <span className={styles.index}>
                          /{String(i + 1).padStart(2, "0")}
                        </span>
                        <span className={styles.moduleTitle}>{item.title}</span>
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
                      <p className={styles.answer}>{item.answer}</p>
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

      <span className={styles.gradient} ref={gradRef}>
        <svg
          width="259"
          height="516"
          viewBox="0 0 259 516"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          overflow="visible"
        >
          <g opacity="0.6" filter="url(#filter0_if_500_2179)">
            <circle
              cx="-27"
              cy="230"
              r="106"
              fill="url(#paint0_linear_500_2179)"
            />
          </g>
          <defs>
            <filter
              id="filter0_if_500_2179"
              x="-313"
              y="-56"
              width="572"
              height="572"
              filterUnits="userSpaceOnUse"
              color-interpolation-filters="sRGB"
            >
              <feFlood flood-opacity="0" result="BackgroundImageFix" />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="BackgroundImageFix"
                result="shape"
              />
              <feColorMatrix
                in="SourceAlpha"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                result="hardAlpha"
              />
              <feOffset dy="4" />
              <feGaussianBlur stdDeviation="11.6" />
              <feComposite
                in2="hardAlpha"
                operator="arithmetic"
                k2="-1"
                k3="1"
              />
              <feColorMatrix
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 1 0 0 0 0 0.95 0 0 0 0.4 0"
              />
              <feBlend
                mode="normal"
                in2="shape"
                result="effect1_innerShadow_500_2179"
              />
              <feGaussianBlur
                stdDeviation="90"
                result="effect2_foregroundBlur_500_2179"
              />
            </filter>
            <linearGradient
              id="paint0_linear_500_2179"
              x1="-27"
              y1="124"
              x2="-27"
              y2="336"
              gradientUnits="userSpaceOnUse"
            >
              <stop stop-color="#0EFEF2" />
              <stop offset="1" stop-color="#0A0A0A" />
            </linearGradient>
          </defs>
        </svg>
      </span>
    </section>
  );
}
