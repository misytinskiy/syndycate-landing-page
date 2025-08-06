"use client";
import Image from "next/image";
import styles from "@/styles/AdvantagesSection.module.css";

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
  return (
    <section className={styles.section} id="advantages">
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
    </section>
  );
}
