"use client";
import { useState } from "react";
import styles from "@/styles/ProgramSection.module.css";

/* полный список из 37 модулей */
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
  "Sessions / Part 3",
  "Sessions / Part 4",
  "Market Context",
  "Risk Management",
  "Backtest",
  "Statics",
  "Dynamics",
  "Trading Strategy",
  "ICT Mentorship",
  "Indices",
  "R. Wyckoff",
  "News",
  "Useful / Part 1",
  "Useful / Part 2",
  "Technical Psychology",
  "Roadmap",
  "Crypto",
  "Prop Trading",
  "Forex Market",
  "Microstructure & Market Participants",
  "Order System",
  "Overnight Arbitrage vs Market Makers",
  "Algorithms & Dynamics",
  "Microstructures",
  "Working with Imbalance (XAU)",
  "Gold & Indices",
  "Market Manipulations",
];

export default function ProgramSection() {
  const [opened, setOpened] = useState(false);
  const visible = opened ? modules : modules.slice(0, 8);

  return (
    <section className={styles.programSection}>
      <span className={styles.hLine} />
      <div className={styles.columns}>
        <div className={styles.stickyColumn}>
          <h2 className={styles.title}>
            NEW PROGRAM <br /> — 37 MODULES <br />
            <span className={styles.primary}>
              A STEP-BY-STEP SYSTEM TO BUILD
            </span>
            <br />
            REAL TRADING SKILLS
          </h2>
        </div>

        <div className={styles.contentColumn}>
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
          <div
            className={`${styles.moduleWrapper} ${
              opened ? styles.expanded : ""
            }`}
          >
            <ul className={styles.moduleList}>
              {modules.map((item, i) => (
                <li key={item} className={styles.moduleItem}>
                  <div className={styles.leftPart}>
                    <span className={styles.index}>
                      /{String(i + 1).padStart(2, "0")}
                    </span>
                    <span className={styles.moduleTitle}>{item}</span>
                  </div>
                  <button className={styles.iconBtn}>
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
                </li>
              ))}
            </ul>
          </div>

          {/* кнопка «The whole program» */}
          <div className={styles.fullRow} onClick={() => setOpened(!opened)}>
            <button className={styles.fullTextBtn}>
              {opened ? "Hide program" : "The whole program"}
            </button>
            <button
              className={`${styles.fullArrowBtn} ${
                opened ? styles.rotated : ""
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
