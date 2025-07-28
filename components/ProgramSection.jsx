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
      {/* Левая колонка */}
      <div className={styles.left}>
        <h2 className={styles.title}>
          NEW PROGRAM — 37 MODULES <br />
          <span className={styles.primary}>
            A STEP-BY-STEP SYSTEM TO BUILD
          </span>{" "}
          <br />
          REAL TRADING SKILLS
        </h2>
      </div>

      {/* Правая колонка */}
      <div className={styles.right}>
        <p className={styles.paragraph}>
          THE PROGRAM IS DESIGNED FOR BOTH BEGINNERS AND EXPERIENCED TRADERS.
          YOU’LL GAIN STRUCTURED THEORETICAL AND PRACTICAL KNOWLEDGE, MASTER
          ESSENTIAL TRADING TOOLS, AND DEVELOP THE DISCIPLINE REQUIRED TO
          SUCCEED IN A MARKET THAT DOESN’T FORGIVE MISTAKES
        </p>
        <p className={styles.paragraph}>
          THE COURSE IS CONSTANTLY UPDATED, ENSURING YOU ALWAYS HAVE ACCESS TO
          THE LATEST VERSION. ADAPT TO THE MARKET — IT WILL NEVER ADAPT TO YOU
        </p>

        <ul className={styles.moduleList}>
          {modules.map((item, i) => (
            <li key={item} className={styles.moduleItem}>
              <div className={styles.leftPart}>
                <span className={styles.index}>
                  /{String(i + 1).padStart(2, "0")}
                </span>
                <span className={styles.moduleTitle}>{item}</span>
              </div>
              <span className={styles.icon}>↗</span>
            </li>
          ))}
        </ul>

        <button className={styles.fullButton}>
          The whole program <span className={styles.icon}>↗</span>
        </button>
      </div>
    </section>
  );
}
