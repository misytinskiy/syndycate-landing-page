"use client";
import { useEffect, useRef, useState } from "react";
import s from "@/styles/TariffForm.module.css";

export default function CustomSelect({
  value,
  onChange,
  placeholder = "CHOOSE CONTACT METHOD",
  options = [],
}) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef(null);
  const btnRef = useRef(null);
  const [hoverIdx, setHoverIdx] = useState(-1);

  const current = options.find((o) => o.value === value);

  useEffect(() => {
    const onDoc = (e) => {
      if (!wrapRef.current) return;
      if (!wrapRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  const openMenu = () => {
    setOpen((v) => !v);
    setHoverIdx(() =>
      Math.max(
        0,
        options.findIndex((o) => o.value === value)
      )
    );
  };

  const choose = (val) => {
    onChange?.(val);
    setOpen(false);
    btnRef.current?.focus();
  };

  const onKey = (e) => {
    if (
      !open &&
      (e.key === "Enter" || e.key === " " || e.key === "ArrowDown")
    ) {
      e.preventDefault();
      setOpen(true);
      return;
    }
    if (!open) return;

    if (e.key === "Escape") {
      setOpen(false);
      return;
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHoverIdx((i) => Math.min(options.length - 1, i < 0 ? 0 : i + 1));
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      setHoverIdx((i) => Math.max(0, i < 0 ? 0 : i - 1));
    }
    if (e.key === "Enter") {
      e.preventDefault();
      if (hoverIdx >= 0) choose(options[hoverIdx].value);
    }
  };

  return (
    <div className={s.selectWrap} ref={wrapRef}>
      <button
        ref={btnRef}
        type="button"
        className={`${s.input} ${s.selectTrigger}`}
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={openMenu}
        onKeyDown={onKey}
      >
        <span className={current ? "" : s.placeholder}>
          {current ? current.label : placeholder}
        </span>
        <svg
          className={s.caret}
          width="10"
          height="6"
          viewBox="0 0 10 6"
          aria-hidden="true"
        >
          <path
            d="M1 1L5 5L9 1"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {open && (
        <ul className={s.menu} role="listbox" tabIndex={-1}>
          {options.map((opt, idx) => {
            const active = hoverIdx === idx;
            const selected = value === opt.value;
            return (
              <li
                key={opt.value}
                role="option"
                aria-selected={selected}
                className={`${s.option} ${active ? s.optionActive : ""} ${
                  selected ? s.optionSelected : ""
                }`}
                onMouseEnter={() => setHoverIdx(idx)}
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => choose(opt.value)}
              >
                {opt.label}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
