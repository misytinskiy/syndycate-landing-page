"use client";
import styles from "@/styles/ParticipationSection.module.css";
import tStyles from "@/styles/TariffForm.module.css";
import TariffForm from "@/components/TariffForm";
import { useCallback, useEffect, useState } from "react";

/** данные по тарифам */
const tariffs = [
  {
    id: "t1",
    title: "BEGINNER",
    mode: "SELF-PACED LEARNING",
    bullets: [
      "LIFETIME ACCESS TO MATERIALS",
      "ACCESS TO MENTOR SETUPS",
      "REGULAR UPDATES",
      "NO LIVE CONFERENCES",
      "NO HOMEWORK ASSIGNMENTS",
      "NO TRADING STRATEGY OPTIMIZATION",
      "NO ASSISTANCE WITH PROP CHALLENGE",
      "NO FINAL EXAM",
    ],
    extra: [
      "1 months of free community access",
      "Prop firm account for top 1 student — not included",
      "Community Access: 1 months free",
    ],
    price: "$149",
    cta: "Buy now",
  },
  {
    id: "t2",
    title: "ADVANCE",
    mode: "GROUP LEARNING",
    bullets: [
      "LIFETIME ACCESS TO MATERIALS",
      "ACCESS TO MENTOR SETUPS",
      "CHAT WITH MENTORS",
      "REGULAR UPDATES",
      "LIVE CONFERENCES",
      "HOMEWORK ASSIGNMENTS",
      "TRADING STRATEGY OPTIMIZATION",
      "HELP PASSING PROP CHALLENGE",
      "FINAL EXAM",
    ],
    extra: [
      "2 months of free community access",
      "Prop firm account for the top 1 student in the group",
      "Community Access: 2 months free",
    ],
    price: "$699",
    oldPrice: "$749",
    cta: "Reserve your spot",
  },
  {
    id: "t3",
    title: "MENTORSHIP",
    mode: "INDIVIDUAL LEARNING",
    bullets: [
      "LIFETIME ACCESS TO MATERIALS",
      "ACCESS TO MENTOR SETUPS",
      "CHAT WITH MENTORS",
      "REGULAR UPDATES",
      "LIVE CONFERENCES",
      "HOMEWORK ASSIGNMENTS",
      "TRADING STRATEGY OPTIMIZATION",
      "HELP PASSING PROP CHALLENGE",
      "FINAL EXAM",
      "ONGOING 1-ON-1 SUPPORT FROM YOUR MENTOR",
      "LIFETIME ACCESS TO THE PRIVATE COMMUNITY",
      "WE WORK WITH YOU UNTIL YOU GET RESULTS",
      "PERSONALIZED ANALYSIS AND TAILORED TRADING STRATEGY",
    ],
    extra: ["Community Access: 2 months free"],
    price: "$???",
    cta: "Check with support",
  },
];

export default function ParticipationSection() {
  const [active, setActive] = useState(null);

  // закрытие по Esc
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") setActive(null);
    };
    if (active) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [active]);

  // блокировка скролла под модалкой
  useEffect(() => {
    if (!active) return;
    const { style } = document.documentElement;
    const prev = style.overflow;
    style.overflow = "hidden";
    return () => {
      style.overflow = prev || "";
    };
  }, [active]);

  const handleOverlayClick = useCallback((e) => {
    // закрываем, если клик мимо карточки
    if (e.target.dataset.overlay === "1") setActive(null);
  }, []);

  const handleFormSubmit = async (payload) => {
    // TODO: сюда интеграция с бэком/телеграмом/почтой
    console.log("FORM SUBMIT:", payload);
  };
  return (
    <section className={styles.section} id="tariffs">
      {/* линия */}
      <span className={styles.hLine} />

      {/* <TARIFFS> */}
      <div className={styles.about}>
        <span className={styles.bracket} />
        <span className={styles.aboutText}>TARIFFS</span>
        <span className={styles.bracket} />
      </div>

      {/* заголовок */}
      <h2 className={styles.title}>
        PARTICIPATION
        <br />
        FORMATS
      </h2>

      <div className={styles.grid}>
        {tariffs.map((t) => (
          <div key={t.id} className={styles.card}>
            <h3 className={styles.cardTitle}>{t.title}</h3>
            <p className={styles.mode}>{t.mode}</p>

            <ul className={styles.list}>
              {t.bullets.map((b) => {
                const muted =
                  b.startsWith("NO ") ||
                  b.toLowerCase().includes("not included");
                return (
                  <li
                    key={b}
                    className={`${styles.bullet} ${muted ? styles.muted : ""}`}
                  >
                    <span className={styles.bulletIcon}>&lt;</span>
                    {b}
                  </li>
                );
              })}
            </ul>

            {/* дополнительный блок у нижнего края */}
            <div className={styles.extra}>
              <span className={styles.star}>*</span>
              <div className={styles.extraLines}>
                {t.extra.map((e) => {
                  const mutedExtra = e.toLowerCase().includes("not included");
                  return (
                    <p
                      key={e}
                      className={`${styles.extraText} ${
                        mutedExtra ? styles.muted : ""
                      }`}
                    >
                      {e}
                    </p>
                  );
                })}
              </div>
            </div>

            {/* цена + кнопка */}
            <div className={styles.bottomRow}>
              <div className={styles.priceWrap}>
                <div>
                  <span className={styles.priceSymbol}>$</span>
                  <span className={styles.price}>
                    {t.price.replace("$", "")}
                  </span>
                </div>

                {t.oldPrice && <s className={styles.oldPrice}>{t.oldPrice}</s>}
              </div>

              <div className={styles.fullRow}>
                <button
                  className={styles.fullTextBtn}
                  onClick={() => setActive(t)}
                >
                  Reserve your spot
                </button>
                <button
                  className={styles.fullArrowBtn}
                  onClick={() => setActive(t)}
                >
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M10.9497 1.04936L1.05025 10.9489M10.9497 1.04936V10.9489M10.9497 1.04936H1.05025"
                      stroke="black"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {active && (
        <div
          className={tStyles.overlay}
          data-overlay="1"
          onClick={handleOverlayClick}
        >
          <div
            className={tStyles.modal}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
          >
            <button
              className={tStyles.close}
              aria-label="Close"
              onClick={() => setActive(null)}
            >
              ×
            </button>

            <TariffForm
              tariff={active}
              onClose={() => setActive(null)}
              onSubmit={handleFormSubmit}
            />
          </div>
        </div>
      )}
    </section>
  );
}
