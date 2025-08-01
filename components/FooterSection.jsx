"use client";
import Link from "next/link";
import styles from "@/styles/FooterSection.module.css";

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

        <Link href="/privacy-policy" className={styles.privacy}>
          PRIVACY POLICY
        </Link>

        <span className={styles.meta}>ALL RIGHTS RESERVED</span>
      </div>
    </footer>
  );
}
