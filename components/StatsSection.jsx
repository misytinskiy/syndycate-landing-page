"use client";
import styles from "@/styles/StatsSection.module.css";
import { useRef, useLayoutEffect } from "react";
import { gsap } from "gsap";
import { useFloatingBlobs } from "@/lib/useFloatingBlobs";

const stats = [
  {
    id: "s1",
    value: "28",
    note: "(01)",
    description:
      "THEORETICAL & PRACTICAL MODULES DESIGNED FOR REAL TRADING RESULTS",
    area: "cell1",
  },
  {
    id: "s2",
    value: "90+",
    note: "(02)",
    description:
      "HOURS OF LIVE ONLINE SESSIONS WITH MENTORS (RECORDINGS INCLUDED)",
    area: "cell2",
  },
  {
    id: "s3",
    value: "60",
    note: "(03)",
    description:
      "DAYS OF ACCESS TO A PRIVATE SYNDICATE COMMUNITY WITH MARKET UPDATES",
    area: "cell3",
  },
  {
    id: "s4",
    value: "42",
    note: "(04)",
    description:
      "PRACTICAL ASSIGNMENTS WITH PERSONAL FEEDBACK + FINAL CERTIFICATION EXAM",
    area: "cell4",
  },
];

export default function StatsSection() {
  const sectionRef = useRef(null);
  const leftRef = useRef(null);
  const rightRef = useRef(null);

  useFloatingBlobs(sectionRef, [leftRef, rightRef], {
    speedRange: [5, 10], // ускорили ещё больше
    scaleRange: [1.02, 1.06],
    rotateRange: [-3, 3],
  });

  return (
    <section className={styles.section} id="next" ref={sectionRef}>
      {/* ───── декоративная горизонтальная линия ───── */}
      <span className={styles.hLine} />

      {/* ───── заголовочная строка с <ABOUT US> и основным тайтлом ───── */}
      <div className={styles.headerRow}>
        {/* левый блок  */}
        <div className={styles.about}>
          <span className={styles.bracket} />
          <span className={styles.aboutText}>&lt;ABOUT&nbsp;US&gt;</span>
          <span className={styles.bracket} />
        </div>

        {/* правый блок  */}
        <div className={styles.rightText}>
          <h2 className={styles.title}>
            <span className={styles.primary}>WHAT IS SYNDICATE</span>
            <br />
            IN NUMBERS?
          </h2>
          <p className={styles.subtext}>
            WE ARE HAPPY TO PROVIDE YOU WITH ALL OUR COMPETENCIES AND MANY YEARS
            OF EXPERIENCE TO ACHIEVE YOUR FINANCIAL GOALS
          </p>
        </div>
      </div>

      {/* ───── сетка карточек ───── */}
      <div className={styles.grid}>
        {stats.map((stat) => (
          <div key={stat.id} className={`${styles.card} ${styles[stat.area]}`}>
            <span className={styles.decor} />
            <div className={styles.note}>{stat.note}</div>
            <div className={styles.valueRow}>
              <div className={styles.value}>{stat.value}</div>
            </div>
            <p className={styles.desc}>{stat.description}</p>
          </div>
        ))}
      </div>

      <div className={styles.statsGraphBg}>
        <svg
          viewBox="0 0 1920 1146"
          className={styles.statsGraphSvg}
          xmlns="http://www.w3.org/2000/svg"
        >
          <g opacity="0.04" filter="url(#filter0_i_166_50)">
            <path
              d="M55.902 39.9013L-32 73V1151H1952V10L1884.78 126.609L1768.44 190.77L1674 267.5L1520.5 243.5L1426.5 330.5L1396.5 393L1320.5 578L1307 633.5L1281.5 617L1232 660.5L1187.5 718.5L1110 691.5L1006.5 727.5L951.5 769.5L905 691.5L829 670.5L790 599L762 617L646.914 524.303L568.836 492.732L421.988 546.199L269.969 505.462L249.286 538.561L206.37 505.462L168.106 590.5L55.902 39.9013Z"
              stroke="#0EDAFE"
              strokeWidth="5"
            />
          </g>
          <defs>
            <filter
              id="filter0_i_166_50"
              x="-34.5"
              y="0.658"
              width="1989"
              height="1156.84"
              filterUnits="userSpaceOnUse"
            >
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feBlend
                in="SourceGraphic"
                in2="BackgroundImageFix"
                mode="normal"
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
                in2="shape"
                mode="normal"
                result="effect1_innerShadow_166_50"
              />
            </filter>
          </defs>
        </svg>
      </div>

      {/* ───── фоновые градиенты ───── */}
      <span className={styles.gradLeft} ref={leftRef}>
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
      <span className={styles.gradRight} ref={rightRef}>
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
