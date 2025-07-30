"use client";
import styles from "@/styles/Header.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>SNDCT</div>

      <div className={styles.line} />

      <div className={styles.circles}>
        <nav className={styles.nav}>
          <button>MENU</button>
          <button>MENU</button>
          <button>MENU</button>
          <button>MENU</button>
        </nav>
        <div className={styles.circlesRow}>
          <div className={styles.circle}></div>
          <div className={styles.circle}></div>
        </div>
      </div>
    </header>
  );
}
