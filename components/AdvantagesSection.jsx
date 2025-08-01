"use client";
import styles from "@/styles/AdvantagesSection.module.css";

const cards = [
  {
    id: "a1",
    value: "20",
    note: "(01)",
    desc: "CHANNELS FILLED WITH EDUCATIONAL CONTENT, HELPFUL LINKS, MARKET ANALYSIS, LIVE STREAMS, AND INTUITIVE NAVIGATION",
  },
  {
    id: "a2",
    value: "10",
    note: "(02)",
    desc: "CHATS FOR TRADE REVIEWS, MARKET TALKS, PSYCHOLOGY, AND REAL CONNECTION",
  },
  {
    id: "a3",
    value: "20",
    note: "(03)",
    desc: "CHANNELS FILLED WITH EDUCATIONAL CONTENT, HELPFUL LINKS, MARKET ANALYSIS, LIVE STREAMS, AND INTUITIVE NAVIGATION",
  },
  {
    id: "a4",
    value: "LIVE",
    note: "(04)",
    desc: "CALLS WHERE MENTORS HOST Q&A SESSIONS, ANALYZE THE MARKET, AND PERFORM BACKTESTING.",
  },
  {
    id: "a5",
    value: "24/7",
    note: "(05)",
    desc: "HELP WITH ANY QUESTIONS THAT COME UP DURING LEARNING",
  },
  {
    id: "a6",
    value: "REGULAR",
    note: "(06)",
    desc: "MORNING CALLS WITH MARKET OVERVIEWS",
  },
];

export default function AdvantagesSection() {
  return (
    <section className={styles.section} id="advantages">
      {/* header row */}
      <div className={styles.headerRow}>
        {/* left — <OUR ADVANTAGES> */}
        <div className={styles.about}>
          <span className={styles.bracket} />
          <span className={styles.aboutText}>OUR&nbsp;ADVANTAGES</span>
          <span className={styles.bracket} />
        </div>

        {/* right — main title + subtitle */}
        <div className={styles.rightText}>
          <h2 className={styles.title}>
            SYNDICATE
            <br />
            COMMUNITY SERVER
          </h2>
          <p className={styles.subtext}>
            “A FOCUSED ENVIRONMENT TURNS SLOW LEARNERS
            <br />
            INTO FAST EARNERS.”
          </p>
        </div>
      </div>

      {/* cards grid */}
      <div className={styles.grid}>
        {cards.map((c) => (
          <div key={c.id} className={styles.card}>
            <div className={styles.topRow}>
              <span className={styles.value}>{c.value}</span>
              <span className={styles.note}>{c.note}</span>
            </div>
            <p className={styles.desc}>{c.desc}</p>
          </div>
        ))}
      </div>

      <span className={styles.gradLeft} />
      <span className={styles.gradRight} />
    </section>
  );
}
