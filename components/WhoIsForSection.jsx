"use client";
import styles from "@/styles/WhoIsForSection.module.css";

const items = [
  {
    id: "w1",
    number: "/01",
    title: "STARTING FROM SCRATCH",
    bullets: [
      "YOU WANT TO START YOUR TRADING JOURNEY FROM ZERO AND BUILD A SOLID FOUNDATION WITH THE RIGHT KNOWLEDGE AND STRUCTURE.",
    ],
  },
  {
    id: "w2",
    number: "/02",
    title: "FIXING A BAD START",
    bullets: [
      "TRADING FEELS MESSY AND CHAOTIC",
      "YOU'VE TRIED TOO MANY TOOLS BUT DON'T KNOW HOW TO USE THEM",
      "YOU HAVE NO CLEAR STRATEGY",
      "YOU'RE NOT CONFIDENT IN YOUR TRADES",
      "YOU STRUGGLE WITH EMOTIONAL DISCIPLINE",
      "YOU LACK A FULL-PICTURE UNDERSTANDING OF HOW MARKETS WORK",
      "YOU WANT TO MANAGE YOUR FIRST LIVE TRADING ACCOUNT",
    ],
  },
  {
    id: "w3",
    number: "/03",
    title: "LEVELING UP",
    bullets: [
      "YOU WANT TO OPTIMIZE YOUR TRADING STRATEGY",
      "YOU'RE LOOKING FOR A STRONG AND FOCUSED COMMUNITY",
      "YOU AIM FOR STABILITY AND CONSISTENCY",
      "YOU WANT TO ACCESS NEW TRADING MARKETS",
      "YOU PLAN TO BUILD A PORTFOLIO ACROSS MULTIPLE PROP FIRMS",
      "YOU'RE READY TO TURN TRADING INTO YOUR MAIN INCOME STREAM",
    ],
  },
];

export default function WhoIsForSection() {
  return (
    <section className={styles.section}>
      <div className={styles.headerRow}>
        <div className={styles.about}>
          <span className={styles.bracket} />
          <span className={styles.aboutText}>
            WHO&nbsp;IS&nbsp;THIS&nbsp;FOR?
          </span>
          <span className={styles.bracket} />
        </div>
        <h2 className={styles.title}>
          <span>WHO IS</span> THIS FOR?
        </h2>
      </div>

      <div className={styles.items}>
        {items.map((item) => (
          <div key={item.id} className={styles.item}>
            <div className={styles.number}>{item.number}</div>

            <div className={styles.content}>
              <div className={styles.itemHeader}>
                <h3 className={styles.itemTitle}>{item.title}</h3>
                <span className={styles.square} />
              </div>

              <ul className={styles.list}>
                {item.bullets.map((b, i) => (
                  <li key={i} className={styles.bullet}>
                    <span
                      className={`${styles.bulletIcon} ${
                        styles[`delay${i % 6}`]
                      }`}
                    >
                      &lt;
                    </span>
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
