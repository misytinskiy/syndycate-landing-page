"use client";
import styles from "@/styles/MarqueeBanner.module.css";
import { useDictionary } from "./LanguageProvider";

export default function MarqueeBanner() {
  const marqueeText = useDictionary().marquee?.text;

  return (
    <div className={styles.wrapper}>
      <div className={styles.track}>
        {Array.from({ length: 6 }).map((_, i) => (
          <span key={i} className={styles.item}>
            <svg
              width="80"
              height="80"
              viewBox="0 0 80 80"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="80" height="80" rx="40" fill="black" />
              <path
                d="M40 66L39.5519 53.9765C39.2777 46.6205 33.3421 40.7212 25.9445 40.4523L13.5 40L25.9445 39.5477C33.3421 39.2788 39.2777 33.3795 39.5519 26.0235L40 14L40.4481 26.0235C40.7223 33.3795 46.6579 39.2788 54.0555 39.5477L66.5 40L54.0555 40.4523C46.6579 40.7212 40.7223 46.6205 40.4481 53.9765L40 66Z"
                fill="white"
              />
            </svg>

            <span className={styles.text}>
              {marqueeText || "You don’t need more time. You need the right space."}
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
