"use client";
import styles from "@/styles/FooterSection.module.css";
import { downloadPrivacyPolicy } from "@/lib/downloadUtils";

export default function FooterSection() {
  return (
    <footer className={styles.section}>
      {/* горизонтальная линия */}
      <span className={styles.hLine} />

      {/* огромный логотип */}
      <h2 className={styles.wordmark}>SYNDICATE</h2>

      {/* нижняя строка */}
      <div className={styles.metaRow}>
        <span className={styles.meta}>©2025</span>

        <button className={styles.privacy} onClick={downloadPrivacyPolicy}>
          PRIVACY POLICY
        </button>

        <span className={styles.meta}>ALL RIGHTS RESERVED</span>
      </div>
    </footer>
  );
}
