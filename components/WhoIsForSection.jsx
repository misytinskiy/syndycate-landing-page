"use client";
import styles from "@/styles/WhoIsForSection.module.css";
import { useDictionary } from "./LanguageProvider";

export default function WhoIsForSection() {
  const whoCopy = useDictionary().whoIsFor ?? {};
  const items = whoCopy.items ?? [];
  const tag = whoCopy.tag || "WHO IS THIS FOR?";
  const titlePrefix = whoCopy.title?.prefix || "WHO IS";
  const titleSuffix = whoCopy.title?.suffix || "THIS FOR?";

  return (
    <section className={styles.section}>
      <div className={styles.headerRow}>
        <div className={styles.about}>
          <span className={styles.bracket} />
          <span className={styles.aboutText}>{tag}</span>
          <span className={styles.bracket} />
        </div>
        <h2 className={styles.title}>
          <span>{titlePrefix}</span> {titleSuffix}
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
                {item.bullets?.map((b, i) => (
                  <li key={`${item.id}-${i}`} className={styles.bullet}>
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
