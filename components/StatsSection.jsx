"use client";
import styles from "@/styles/StatsSection.module.css";

const stats = [
  {
    id: "s1",
    value: "37",
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
  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <div className={styles.rightText}>
          <h2 className={styles.title}>
            <span className={styles.primary}>WHAT IS SYNDICATE</span> <br />
            IN NUMBERS?
          </h2>
          <p className={styles.subtext}>
            WE ARE HAPPY TO PROVIDE YOU WITH <br />
            ALL OUR COMPETENCIES AND MANY <br />
            YEARS OF EXPERIENCE TO ACHIEVE <br />
            YOUR FINANCIAL GOALS
          </p>
        </div>
      </div>

      <div className={styles.grid}>
        {stats.map((stat) => (
          <div key={stat.id} className={`${styles.card} ${styles[stat.area]}`}>
            <div className={styles.valueRow}>
              <div className={styles.value}>{stat.value}</div>
              <div className={styles.note}>{stat.note}</div>
            </div>
            <p className={styles.desc}>{stat.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
