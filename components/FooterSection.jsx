"use client";
import styles from "@/styles/FooterSection.module.css";
import { downloadPrivacyPolicy } from "@/lib/downloadUtils";
import { useDictionary } from "./LanguageProvider";

export default function FooterSection() {
  const footerCopy = useDictionary().footer ?? {};

  return (
    <footer className={styles.section}>
      {/* горизонтальная линия */}
      <span className={styles.hLine} />

      {/* огромный логотип */}
      <h2 className={styles.wordmark}>SYNDICATE</h2>

      {/* нижняя строка */}
      <div className={styles.metaRow}>
        <span className={styles.meta}>
          {footerCopy.copyright || "©2025"}
        </span>

        <button className={styles.privacy} onClick={downloadPrivacyPolicy}>
          {footerCopy.privacy || "PRIVACY POLICY"}
        </button>

        <span className={styles.meta}>
          {footerCopy.rights || "ALL RIGHTS RESERVED"}
        </span>
      </div>
    </footer>
  );
}
