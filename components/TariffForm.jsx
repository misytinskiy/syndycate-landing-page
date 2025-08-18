"use client";
import { useMemo, useState } from "react";
import styles from "@/styles/TariffForm.module.css";
import CustomSelect from "./CustomSelect";

export default function TariffForm({ tariff, onClose, onSubmit }) {
  const [name, setName] = useState("");
  const [method, setMethod] = useState("");
  const [details, setDetails] = useState("");
  const [accept, setAccept] = useState(false);
  const [sending, setSending] = useState(false);

  const detailsPlaceholder = useMemo(() => {
    if (method === "telegram") return "TELEGRAM NICKNAME OR LINK";
    if (method === "call") return "TELEPHONE NUMBER";
    if (method === "whatsapp") return "WHATSAPP NUMBER";
    return "";
  }, [method]);

  const canSubmit =
    !!name.trim() && !!method && !!details.trim() && accept && !sending;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!canSubmit) return;

    try {
      setSending(true);

      const payload = {
        plan: tariff?.title,
        mode: tariff?.mode,
        name,
        method,
        details,
        accept,
      };

      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok || data.ok === false) {
        console.error("Sheets error:", data.error);
        alert("Не удалось отправить. Проверь URL GAS и права доступа.");
        return;
      }

      await onSubmit?.(payload);
    } finally {
      setSending(false);
      onClose?.();
    }
  };

  return (
    <div className={styles.modalGrid} role="document">
      {/* LEFT */}
      <div className={styles.leftCol}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.headings}>
            <h3 className={styles.title}>{tariff?.title}</h3>
            <p className={styles.mode}>{tariff?.mode}</p>
          </div>

          <div className={styles.inputsContainer}>
            <input
              className={styles.input}
              placeholder="NAME"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <CustomSelect
              value={method}
              onChange={(val) => {
                setMethod(val);
                setDetails("");
              }}
              placeholder="CHOOSE CONTACT METHOD"
              options={[
                { value: "call", label: "CALL ME" },
                { value: "telegram", label: "TELEGRAM" },
                { value: "whatsapp", label: "WHATSAPP" },
              ]}
            />
            {!!method && (
              <input
                className={styles.input}
                placeholder={detailsPlaceholder}
                value={details}
                onChange={(e) => setDetails(e.target.value)}
              />
            )}
            <label className={styles.checkboxRow}>
              <input
                type="checkbox"
                checked={accept}
                onChange={(e) => setAccept(e.target.checked)}
              />

              <span className={styles.cbText}>
                I ACCEPT THE{" "}
                <button
                  type="button"
                  className={styles.linkBtn}
                  onClick={() => (window.location.href = "/privacy-policy")}
                >
                  PRIVACY POLICY
                </button>{" "}
                AND CONTRACTUAL OFFERS
              </span>
            </label>

            <div className={styles.inlineSupport}>
              <span>OR CONTACT US DIRECTLY</span>
              <button
                type="button"
                className={styles.linkBtn}
                onClick={() => (window.location.href = "/support")}
              >
                SUPPORT
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* RIGHT */}
      <div className={styles.rightCol}>
        <ul className={styles.list}>
          {tariff?.bullets?.map((b) => {
            const muted =
              b.startsWith("NO ") || b.toLowerCase().includes("not included");
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

        <div className={styles.extra}>
          <span className={styles.star}>*</span>
          <div className={styles.extraLines}>
            {tariff?.extra?.map((e) => {
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

        <div className={styles.bottomRow}>
          <div className={styles.priceWrap}>
            <div>
              <span className={styles.priceSymbol}>$</span>
              <span className={styles.price}>
                {(tariff?.price || "").replace("$", "")}
              </span>
            </div>
          </div>
          <div className={styles.ctaRow}>
            <button
              type="submit"
              className={`${styles.ctaText} ${
                !canSubmit ? styles.disabled : ""
              }`}
              disabled={!canSubmit}
              onClick={handleSubmit}
            >
              {sending ? "SENDING..." : tariff?.cta || "RESERVE YOUR SPOT"}
            </button>
            <button
              type="button"
              className={`${styles.ctaArrow} ${
                !canSubmit ? styles.disabled : ""
              }`}
              disabled={!canSubmit}
              onClick={handleSubmit}
              aria-label="Submit"
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
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
