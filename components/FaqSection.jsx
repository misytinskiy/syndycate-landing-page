"use client";
import { useState } from "react";
import styles from "@/styles/FaqSection.module.css";

const faqs = [
  {
    q: "HOW LONG WILL I HAVE ACCESS TO THE MATERIALS?",
    a: "LIFETIME ACCESS WITH ALL PLANS",
  },
  {
    q: "I MISSED A LIVE SESSION — WHAT SHOULD I DO?",
    a: "EVERY SESSION IS RECORDED. THE REPLAY WILL BE IN YOUR DASHBOARD WITHIN 24 H.",
  },
  {
    q: "I DON’T HAVE A TRADING DEPOSIT YET — WHAT SHOULD I DO?",
    a: "THE COURSE TEACHES RISK-FREE SIMULATION FIRST. YOU CAN START WITHOUT CAPITAL.",
  },
  {
    q: "CAN I JOIN THE COMMUNITY WITHOUT TAKING THE COURSE?",
    a: "YES. COMMUNITY-ONLY ACCESS IS AVAILABLE AS A SEPARATE PLAN.",
  },
];

export default function FaqSection() {
  const [openId, setOpenId] = useState(null);

  return (
    <section className={styles.section} id="faq">
      <div className={styles.columns}>
        {/* левая колонка */}
        <div className={styles.left}>
          <h2 className={styles.faq}>FAQ</h2>
        </div>

        {/* правая колонка */}
        <div className={styles.right}>
          <ul className={styles.list}>
            {faqs.map(({ q, a }, i) => {
              const opened = openId === i;
              return (
                <li
                  key={q}
                  className={`${styles.item} ${opened ? styles.open : ""}`}
                >
                  {/* вопросная строка */}
                  <button
                    className={styles.questionRow}
                    onClick={() => setOpenId(opened ? null : i)}
                  >
                    <span className={styles.question}>{q}</span>
                    <span className={styles.iconBox}>
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 12 12"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className={styles.icon}
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

                  {/* ответ (collapsible) */}
                  <div className={styles.answerWrapper}>
                    <p className={styles.answer}>{a}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
