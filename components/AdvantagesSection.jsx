"use client";
import Image from "next/image";
import styles from "@/styles/AdvantagesSection.module.css";
import { useFloatingBlobs } from "@/lib/useFloatingBlobs";
import { useRef } from "react";

const lead =
  "We aim to see our students grow by making solid trades. No matter their starting point, they all come looking for the same thing: a real trading community driven by support and experience. After over three years of learning and evolving, we’ve built a space where pros mentor newcomers and everyone levels up together.";

const cards = [
  {
    id: "a1",
    value: "20",
    desc: "CHANNELS FILLED WITH EDUCATIONAL CONTENT, HELPFUL LINKS, MARKET ANALYSIS, LIVE STREAMS, AND INTUITIVE NAVIGATION",
  },
  {
    id: "a2",
    value: "10",
    desc: "CHATS FOR TRADE REVIEWS, MARKET TALKS, PSYCHOLOGY, AND REAL CONNECTION",
  },
  {
    id: "a3",
    value: "35+",
    desc: "hours of educational materials <br/> and guides",
  },
  {
    id: "a4",
    value: "LIVE",
    desc: "CALLS WHERE MENTORS HOST Q&A SESSIONS, ANALYZE THE MARKET, AND PERFORM BACKTESTING",
  },
  {
    id: "a5",
    value: "24/7",
    desc: "HELP WITH ANY QUESTIONS THAT <br/> COME UP DURING LEARNING",
  },
  { id: "a6", value: "REGULAR", desc: "MORNING CALLS WITH MARKET OVERVIEWS" },
];

export default function AdvantagesSection() {
  const sectionRef = useRef(null);
  const gradRef = useRef(null);

  useFloatingBlobs(sectionRef, [gradRef], {
    speedRange: [5, 10], // ускорили ещё больше
    scaleRange: [1.02, 1.06],
    rotateRange: [-3, 3],
  });

  return (
    <section className={styles.section} id="advantages" ref={sectionRef}>
      {/* ───── ДЕКОРАТИВНЫЙ HEADER ROW ───── */}
      <div className={styles.headerRow}>
        {/* слева <OUR ADVANTAGES> */}
        <div className={styles.about}>
          <span className={styles.bracket} />
          <span className={styles.aboutText}>OUR&nbsp;ADVANTAGES</span>
          <span className={styles.bracket} />
        </div>

        {/* справа заголовок + подзаголовок */}
        <div className={styles.rightTitle}>
          <h2 className={styles.title}>
            SYNDICATE
            <br />
            COMMUNITY SERVER
          </h2>
          <p className={styles.subtext}>
            “A FOCUSED ENVIRONMENT TURNS SLOW LEARNERS INTO FAST EARNERS.”
          </p>
        </div>
      </div>

      {/* ───── БАННЕР 800 PX ───── */}
      <div className={styles.bannerWrap}>
        <Image
          src="/community-banner.png"
          alt="Syndicate community banner"
          fill
          sizes="100vw"
          className={styles.banner}
          priority
        />
      </div>

      {/* ───── НИЖНИЙ БЛОК ───── */}
      <div className={styles.bottom}>
        {/* левая колонка */}
        <p className={styles.lead}>{lead}</p>

        {/* правая колонка: карточки */}
        <div className={styles.cardsGrid}>
          {cards.map((c) => (
            <div key={c.id} className={styles.card}>
              <span className={styles.value}>{c.value}</span>
              <p
                className={styles.desc}
                dangerouslySetInnerHTML={{ __html: c.desc }}
              />
            </div>
          ))}
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
