"use client";
import Image from "next/image";
import styles from "@/styles/ResultsSection.module.css";

const bullets = [
  "BUILD YOUR OWN OPTIMIZED TRADING STRATEGY",
  "UNDERSTAND MARKET LOGIC AT A DEEPER LEVEL",
  "RECEIVE LIFETIME ACCESS TO UPDATED COURSE MATERIALS",
  "STAY IN TOUCH WITH YOUR MENTORS EVEN AFTER THE PROGRAM ENDS",
  "GAIN ACCESS TO A PRIVATE COMMUNITY OF TRADERS",
];

export default function ResultsSection() {
  return (
    <section className={styles.section} id="results">
      <span className={styles.hLine} />

      <div className={styles.about}>
        <span className={styles.bracket} />
        <span className={styles.aboutText}>RESULTS</span>
        <span className={styles.bracket} />
      </div>

      <h2 className={styles.title}>
        AFTER THE PROGRAM,
        <br />
        YOU WILL
      </h2>

      <div className={styles.contentRow}>
        <ul className={styles.list}>
          {bullets.map((txt) => (
            <li key={txt} className={styles.listRow}>
              <span className={styles.listText}>{txt}</span>
              <span className={styles.tick}>
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 32 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect width="32" height="32" rx="5" fill="#0EFEF2" />

                  <path
                    d="M26.0435 8.54604C26.4288 8.91033 26.6537 9.41274 26.6687 9.94281C26.6837 10.4729 26.4876 10.9872 26.1235 11.3727L14.7902 23.3727C14.6065 23.5668 14.3858 23.7222 14.141 23.8296C13.8963 23.937 13.6325 23.9942 13.3653 23.998C13.098 24.0017 12.8328 23.9518 12.5851 23.8513C12.3375 23.7508 12.1125 23.6016 11.9235 23.4127L5.9235 17.4127C5.57022 17.0336 5.37789 16.5321 5.38703 16.014C5.39617 15.4958 5.60607 15.0015 5.97251 14.635C6.33894 14.2686 6.8333 14.0587 7.35144 14.0496C7.86957 14.0404 8.37103 14.2328 8.75016 14.586L13.2968 19.13L23.2168 8.62604C23.5811 8.2407 24.0835 8.0158 24.6136 8.0008C25.1437 7.9858 25.658 8.18192 26.0435 8.54604Z"
                    fill="#0A0A0A"
                    transform="translate(2 2) scale(0.85)"
                  />
                </svg>
              </span>
            </li>
          ))}
        </ul>

        {/* правая картинка */}
        <div className={styles.imageWrap}>
          <Image
            src="/program-results.png"
            alt="Program results illustration"
            fill
            sizes="(max-width: 768px) 100vw, 904px"
            className={styles.image}
            priority
          />
        </div>
      </div>

      <div className={styles.fullRow}>
        <button className={styles.fullTextBtn}>Reserve your spot</button>
        <button className={styles.fullArrowBtn}>
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
    </section>
  );
}
