"use client";
import styles from "@/styles/ProgramSection.module.css";

const modules = [
  "Introduction",
  "Market Structure",
  "Liquidity",
  "Premium / Discount Zones",
  "Fair Value Gap",
  "Supply & Demand",
  "Order Flow",
  "Multi-Timeframe Analysis",
];

export default function ProgramSection() {
  return (
    <section className={styles.wrapper}>
      {/* горизонтальная линия-разделитель */}
      <span className={styles.hLine} />

      {/* левая колонка */}
      <div className={styles.left}>
        <h2 className={styles.title}>
          NEW PROGRAM <br /> — 37 MODULES <br />
          <span className={styles.primary}>
            A STEP-BY-STEP SYSTEM TO BUILD
          </span>{" "}
          <br />
          REAL TRADING SKILLS
        </h2>
      </div>

      {/* правая колонка */}
      <div className={styles.right}>
        <p className={styles.paragraph}>
          THE PROGRAM IS DESIGNED FOR BOTH BEGINNERS AND EXPERIENCED TRADERS.
          YOU’LL GAIN STRUCTURED THEORETICAL AND PRACTICAL KNOWLEDGE, MASTER
          ESSENTIAL TRADING TOOLS, AND DEVELOP THE DISCIPLINE REQUIRED TO
          SUCCEED IN A MARKET THAT DOESN’T FORGIVE MISTAKES
        </p>
        <p className={styles.paragraph}>
          THE COURSE IS CONSTANTLY UPDATED, ENSURING <br /> YOU ALWAYS HAVE
          ACCESS TO THE LATEST VERSION. ADAPT TO THE MARKET — IT WILL NEVER
          ADAPT TO YOU
        </p>

        {/* список модулей */}
        <ul className={styles.moduleList}>
          {modules.map((item, i) => (
            <li key={item} className={styles.moduleItem}>
              <div className={styles.leftPart}>
                <span className={styles.index}>
                  /{String(i + 1).padStart(2, "0")}
                </span>
                <span className={styles.moduleTitle}>{item}</span>
              </div>

              {/* квадратная кнопка-стрелка */}
              <button className={styles.iconBtn}>
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10.9497 1.04936L1.05025 10.9489M10.9497 1.04936V10.9489M10.9497 1.04936H1.05025"
                    stroke="#0EFEF2"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </li>
          ))}
        </ul>

        {/* «The whole program» + стрелка */}
        <div className={styles.fullRow}>
          <button className={styles.fullTextBtn}>The whole program</button>
          <button className={styles.fullArrowBtn}>
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.9497 1.04936L1.05025 10.9489M10.9497 1.04936V10.9489M10.9497 1.04936H1.05025"
                stroke="#0EFEF2"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>

      <span className={styles.gradLeft} />
    </section>
  );
}
