"use client";
import styles from "@/styles/HeroSection.module.css";
import { useEffect, useState } from "react";

export default function HeroSection() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0 });
  const [arrowUp, setArrowUp] = useState(false);

  useEffect(() => {
    const targetDate = new Date("2025-09-01T00:00:00");
    const updateTimer = () => {
      const now = new Date();
      const diff = targetDate.getTime() - now.getTime();

      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0 });
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);

      setTimeLeft({ days, hours, minutes });
    };

    updateTimer();
    const interval = setInterval(updateTimer, 10000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const target = document.getElementById("next");
    if (!target) {
      console.log("₁  <#next> НЕ НАЙДЕН!");
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => setArrowUp(entry.isIntersecting),
      {
        threshold: 0.05,
        rootMargin: `-${EXTRA_OFFSET}px 0px 0px 0px`, //
      }
    );

    io.observe(target);
    return () => io.disconnect();
  }, []);

  const EXTRA_OFFSET = 150; // сколько нужно «перепрыгнуть» вниз

  const scrollToNext = () => {
    const el = document.getElementById("next");
    if (!el) return;

    const offsetTop =
      el.getBoundingClientRect().top + window.scrollY + EXTRA_OFFSET; // 👈 +100

    window.scrollTo({ top: offsetTop, behavior: "smooth" });
  };

  return (
    <section className={styles.hero}>
      <div className={styles.timerWrapper}>
        <svg
          width="29"
          height="110"
          viewBox="0 0 29 110"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0.839844 55.9091V53.1818C5.75462 53.1534 9.07848 52.2727 10.8114 50.5398C12.5728 48.7784 13.4535 45.4546 13.4535 40.5682V18.2386C13.4535 15.142 13.766 12.4574 14.391 10.1847C15.016 7.88353 15.9677 5.98012 17.2461 4.47443C18.5245 2.96875 20.1296 1.84659 22.0614 1.10796C24.0217 0.36932 26.3228 0 28.9648 0V2.72728C26.0103 2.69887 23.5813 3.22443 21.6779 4.30398C19.8029 5.38352 18.4109 7.07386 17.5018 9.375C16.6211 11.6477 16.1808 14.6023 16.1808 18.2386V40.5682C16.1808 43.3807 15.9109 45.767 15.3711 47.7273C14.8313 49.6591 13.9648 51.2358 12.7717 52.4574C11.5785 53.6506 10.0018 54.5313 8.04155 55.0994C6.08132 55.6392 3.68075 55.9091 0.839844 55.9091ZM28.9648 109.091C26.3228 109.091 24.0217 108.722 22.0614 107.983C20.1296 107.244 18.5245 106.122 17.2461 104.616C15.9677 103.111 15.016 101.207 14.391 98.9063C13.766 96.6335 13.4535 93.9489 13.4535 90.8523V68.5227C13.4535 63.6364 12.5728 60.3267 10.8114 58.5938C9.07848 56.8324 5.75462 55.9375 0.839844 55.9091V53.1818C3.68075 53.2102 6.08132 53.5085 8.04155 54.0767C10.0018 54.6165 11.5785 55.483 12.7717 56.6761C13.9648 57.8693 14.8313 59.446 15.3711 61.4063C15.9109 63.3381 16.1808 65.7102 16.1808 68.5227V90.8523C16.1808 94.4886 16.6211 97.4432 17.5018 99.7159C18.4109 102.017 19.8029 103.693 21.6779 104.744C23.5813 105.824 26.0103 106.364 28.9648 106.364V109.091ZM0.839844 55.9091V53.1818H10.0444V55.9091H0.839844Z"
            fill="#272727"
          />
        </svg>

        <div className={styles.timer}>
          <div>Time until start:</div>
          <div className={styles.timerValue}>
            {timeLeft.days}
            <span className={styles.gray}>D</span>:
            {String(timeLeft.hours).padStart(2, "0")}
            <span className={styles.gray}>H</span>:
            {String(timeLeft.minutes).padStart(2, "0")}
            <span className={styles.gray}>M</span>
          </div>
        </div>

        <svg
          width="29"
          height="110"
          viewBox="0 0 29 110"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M29 53.1818V55.9091C24.0852 55.9375 20.7472 56.8324 18.9858 58.5938C17.2528 60.3267 16.3864 63.6364 16.3864 68.5227V90.8523C16.3864 93.9489 16.0739 96.6335 15.4489 98.9063C14.8239 101.207 13.8722 103.111 12.5938 104.616C11.3153 106.122 9.69602 107.244 7.7358 107.983C5.80398 108.722 3.51705 109.091 0.875 109.091V106.364C3.85795 106.364 6.28693 105.824 8.16193 104.744C10.0369 103.693 11.4148 102.017 12.2955 99.7159C13.2045 97.4432 13.6591 94.4886 13.6591 90.8523V68.5227C13.6591 65.7102 13.929 63.3381 14.4688 61.4063C15.0085 59.446 15.875 57.8693 17.0682 56.6761C18.2614 55.4546 19.8381 54.5739 21.7983 54.0341C23.7585 53.4659 26.1591 53.1818 29 53.1818ZM0.875 0C3.51705 0 5.80398 0.36932 7.7358 1.10796C9.69602 1.84659 11.3153 2.96875 12.5938 4.47443C13.8722 5.98012 14.8239 7.88353 15.4489 10.1847C16.0739 12.4574 16.3864 15.142 16.3864 18.2386V40.5682C16.3864 45.4546 17.2528 48.7784 18.9858 50.5398C20.7472 52.2727 24.0852 53.1534 29 53.1818V55.9091C26.1591 55.8807 23.7585 55.5966 21.7983 55.0568C19.8381 54.4886 18.2614 53.608 17.0682 52.4148C15.875 51.2216 15.0085 49.6591 14.4688 47.7273C13.929 45.767 13.6591 43.3807 13.6591 40.5682V18.2386C13.6591 14.6023 13.2045 11.6477 12.2955 9.375C11.4148 7.07386 10.0369 5.38352 8.16193 4.30398C6.28693 3.22443 3.85795 2.69887 0.875 2.72728V0ZM29 53.1818V55.9091H19.7955V53.1818H29Z"
            fill="#272727"
          />
        </svg>
      </div>
      <div className={styles.titleWrap}>
        <h1 className={styles.title}>
          THE
          <span className={styles.cryptoIcons}>
            <svg
              width="178"
              height="89"
              viewBox="0 0 178 89"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M41.7188 29.0996C38.2478 30.0489 36.1562 32.7152 36.1562 35.2295C36.1562 37.7437 38.2478 40.41 41.7188 41.3557V29.0996ZM47.2812 47.645V59.8973C50.7522 58.9517 52.8438 56.2854 52.8438 53.7712C52.8438 51.2569 50.7522 48.5906 47.2812 47.645Z"
                fill="white"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M81.5827 44.5013C81.5827 64.9824 64.9805 81.5846 44.4994 81.5846C24.0182 81.5846 7.41602 64.9824 7.41602 44.5013C7.41602 24.0202 24.0182 7.41797 44.4994 7.41797C64.9805 7.41797 81.5827 24.0202 81.5827 44.5013ZM44.4994 19.4701C45.237 19.4701 45.9444 19.7631 46.466 20.2847C46.9876 20.8062 47.2806 21.5137 47.2806 22.2513V23.4268C53.3252 24.5097 58.4056 29.0524 58.4056 35.2305C58.4056 35.9681 58.1126 36.6755 57.591 37.1971C57.0694 37.7187 56.362 38.0117 55.6244 38.0117C54.8867 38.0117 54.1793 37.7187 53.6577 37.1971C53.1361 36.6755 52.8431 35.9681 52.8431 35.2305C52.8431 32.7162 50.7516 30.0499 47.2806 29.1006V41.9685C53.3252 43.0513 58.4056 47.5941 58.4056 53.7721C58.4056 59.9502 53.3252 64.4929 47.2806 65.5758V66.7513C47.2806 67.4889 46.9876 68.1964 46.466 68.7179C45.9444 69.2395 45.237 69.5326 44.4994 69.5326C43.7617 69.5326 43.0543 69.2395 42.5327 68.7179C42.0111 68.1964 41.7181 67.4889 41.7181 66.7513V65.5758C35.6735 64.4929 30.5931 59.9502 30.5931 53.7721C30.5931 53.0345 30.8861 52.3271 31.4077 51.8055C31.9293 51.2839 32.6367 50.9909 33.3743 50.9909C34.112 50.9909 34.8194 51.2839 35.341 51.8055C35.8626 52.3271 36.1556 53.0345 36.1556 53.7721C36.1556 56.2864 38.2471 58.9527 41.7181 59.8983V47.0341C35.6735 45.9513 30.5931 41.4086 30.5931 35.2305C30.5931 29.0524 35.6735 24.5097 41.7181 23.4268V22.2513C41.7181 21.5137 42.0111 20.8062 42.5327 20.2847C43.0543 19.7631 43.7617 19.4701 44.4994 19.4701Z"
                fill="white"
              />
              <g clip-path="url(#clip0_166_42)">
                <path
                  d="M133.499 7.41797C126.165 7.41797 118.995 9.59287 112.897 13.6676C106.799 17.7424 102.046 23.534 99.2388 30.3101C96.4321 37.0862 95.6977 44.5424 97.1286 51.7359C98.5594 58.9294 102.091 65.537 107.277 70.7232C112.464 75.9094 119.071 79.4412 126.265 80.8721C133.458 82.3029 140.914 81.5686 147.691 78.7618C154.467 75.9551 160.258 71.202 164.333 65.1037C168.408 59.0054 170.583 51.8357 170.583 44.5013C170.583 34.6662 166.676 25.2339 159.721 18.2794C152.767 11.325 143.334 7.41797 133.499 7.41797ZM148.564 67.493H118.991C118.268 67.4914 117.571 67.2196 117.038 66.7309C116.506 66.2422 116.175 65.572 116.111 64.8518C116.047 64.1317 116.255 63.4137 116.693 62.8388C117.132 62.264 117.769 61.8738 118.481 61.745C118.828 61.745 122.467 60.6094 122.467 53.5404V46.819H116.673C116.058 46.819 115.469 46.5748 115.034 46.1402C114.599 45.7055 114.355 45.116 114.355 44.5013C114.355 43.8866 114.599 43.2971 115.034 42.8624C115.469 42.4278 116.058 42.1836 116.673 42.1836H122.467V30.3169C122.421 28.5324 122.728 26.7564 123.369 25.0907C124.011 23.425 124.976 21.9024 126.208 20.6104C127.439 19.3183 128.914 18.2822 130.547 17.5615C132.18 16.8408 133.94 16.4497 135.724 16.4107C137.577 16.4246 139.405 16.8328 141.087 17.608C142.77 18.3833 144.268 19.5079 145.482 20.907C145.739 21.1916 145.938 21.5241 146.066 21.8854C146.195 22.2467 146.251 22.6299 146.232 23.013C146.213 23.3961 146.118 23.7716 145.954 24.1181C145.789 24.4646 145.558 24.7754 145.273 25.0326C144.989 25.2897 144.656 25.4884 144.295 25.6171C143.934 25.7458 143.55 25.802 143.167 25.7827C142.784 25.7633 142.409 25.6687 142.062 25.5042C141.716 25.3397 141.405 25.1085 141.148 24.824C140.491 24.0473 139.675 23.4201 138.756 22.9844C137.836 22.5487 136.834 22.3146 135.817 22.2977C133.766 22.3762 131.829 23.2639 130.43 24.7668C129.032 26.2696 128.285 28.2651 128.354 30.3169V42.1836H135.307C135.922 42.1836 136.511 42.4278 136.946 42.8624C137.381 43.2971 137.625 43.8866 137.625 44.5013C137.625 45.116 137.381 45.7055 136.946 46.1402C136.511 46.5748 135.922 46.819 135.307 46.819H128.354V53.5404C128.41 56.365 127.79 59.1621 126.546 61.6987H148.564C149.333 61.6987 150.07 62.0039 150.613 62.5472C151.156 63.0906 151.462 63.8275 151.462 64.5958C151.462 65.3642 151.156 66.1011 150.613 66.6444C150.07 67.1877 149.333 67.493 148.564 67.493Z"
                  fill="white"
                />
              </g>
              <defs>
                <clipPath id="clip0_166_42">
                  <rect
                    width="89"
                    height="89"
                    fill="white"
                    transform="translate(89)"
                  />
                </clipPath>
              </defs>
            </svg>
          </span>
          <br />
          <span className={styles.blue}>
            NEW ERA
            <br />
            OF TRADING
          </span>
          <br />
          IN ISRAEL
        </h1>

        <div className={styles.footerRow}>
          <div className={styles.scrollDown}>
            <button onClick={scrollToNext} className={styles.scrollBtn}>
              <svg
                width="40"
                height="40"
                viewBox="0 0 40 40"
                className={arrowUp ? styles.up : ""}
              >
                <circle cx="20" cy="20" r="19.5" fill="none" stroke="white" />
                <path
                  d="M13 16.5L20 23.5L27 16.5"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>

          <div className={styles.bottomRight}>
            <p>
              CLOSED-COMMUNITY TRAINING
              <br />
              FOR THOSE WHO WANT TO MASTER THE
              <br />
              MARKET AND TRADE WITH CONFIDENCE
            </p>
            <div className={styles.signIn}>
              <button className={styles.signInText}>Sign in</button>
              <button className={styles.signInArrow}>
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
      </div>
      <div className={styles.graphBg}>
        <svg
          viewBox="0 0 1920 769"
          className={styles.graphSvg}
          xmlns="http://www.w3.org/2000/svg"
        >
          <svg
            width="1920"
            height="769"
            viewBox="0 0 1920 769"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g opacity="0.6">
              <g filter="url(#filter0_i_106_2291)">
                <path
                  d="M60.902 538.561L-27 571.659V784H1957V10L1889.78 126.609L1773.44 190.77L1678.82 126.609L1573.33 217.758L1410.46 228.451L1345.31 294.649L1308.59 349.643L1249.13 330.803L1204.66 378.159L1134.34 365.429L1072.29 463.197L987.493 451.995L865.981 563.512L800.313 599.666L651.914 524.303L573.836 492.732L426.988 546.199L274.969 505.462L254.286 538.561L211.37 505.462L173.106 590.5L60.902 538.561Z"
                  fill="url(#paint0_linear_106_2291)"
                  fill-opacity="0.2"
                />
              </g>

              <path
                d="M60.902 538.561L-27 571.659V784H1957V10L1889.78 126.609L1773.44 190.77L1678.82 126.609L1573.33 217.758L1410.46 228.451L1345.31 294.649L1308.59 349.643L1249.13 330.803L1204.66 378.159L1134.34 365.429L1072.29 463.197L987.493 451.995L865.981 563.512L800.313 599.666L651.914 524.303L573.836 492.732L426.988 546.199L274.969 505.462L254.286 538.561L211.37 505.462L173.106 590.5L60.902 538.561Z"
                stroke="url(#paint1_linear_106_2291)"
                stroke-width="5"
              />
            </g>

            <defs>
              <filter
                id="filter0_i_106_2291"
                x="-29.5"
                y="0.658203"
                width="1989"
                height="789.842"
                filterUnits="userSpaceOnUse"
                color-interpolation-filters="sRGB"
              >
                <feFlood flood-opacity="0" result="BackgroundImageFix" />
                <feBlend
                  mode="normal"
                  in="SourceGraphic"
                  in2="BackgroundImageFix"
                  result="shape"
                />
                <feColorMatrix
                  in="SourceAlpha"
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                  result="hardAlpha"
                />
                <feOffset dy="4" />
                <feGaussianBlur stdDeviation="11.6" />
                <feComposite
                  in2="hardAlpha"
                  operator="arithmetic"
                  k2="-1"
                  k3="1"
                />
                <feColorMatrix
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 1 0 0 0 0 0.95 0 0 0 0.4 0"
                />
                <feBlend
                  mode="normal"
                  in2="shape"
                  result="effect1_innerShadow_106_2291"
                />
              </filter>
              <linearGradient
                id="paint0_linear_106_2291"
                x1="965"
                y1="10"
                x2="965"
                y2="784"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="#0EDAFE" />
                <stop offset="1" stop-color="#0A0A0A" />
              </linearGradient>
              <linearGradient
                id="paint1_linear_106_2291"
                x1="1907.4"
                y1="110.824"
                x2="-23.3896"
                y2="620.473"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="#0EDAFE" />
                <stop offset="0.264939" stop-color="#0EDAFE" />
                <stop offset="0.329122" stop-color="#0A0A0A" />
                <stop offset="0.421732" stop-color="#0A0A0A" />
                <stop offset="0.536866" stop-color="#0EDAFE" />
                <stop offset="0.612627" stop-color="#0A0A0A" />
                <stop offset="0.83627" stop-color="#0A0A0A" />
                <stop offset="0.91451" stop-color="#0A0A0A" />
                <stop offset="0.935155" stop-color="#0EDAFE" />
                <stop offset="0.943868" stop-color="#0A0A0A" />
                <stop offset="1" stop-color="#088298" />
              </linearGradient>
            </defs>
          </svg>
        </svg>
      </div>

      <div className={styles.dashLines}>
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className={styles.dashLine}
            style={{ left: `${812 + i * 152}px` }}
          />
        ))}
      </div>
    </section>
  );
}
