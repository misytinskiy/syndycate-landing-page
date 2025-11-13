export const DEFAULT_LANGUAGE = "en";

export const languages = [
  { code: "en", label: "EN" },
  { code: "he", label: "HE" },
];

export const dictionaries = {
  en: {
    header: {
      nav: {
        program: "Program",
        tariffs: "Tariffs",
        faq: "FAQ",
      },
      menuButton: "MENU",
    },
    hero: {
      timer: {
        label: "Time until start:",
        days: "D",
        hours: "H",
        minutes: "M",
      },
      heading: {
        topLine: "THE",
        highlightLines: ["NEW ERA", "OF TRADING"],
        bottomLine: "IN ISRAEL",
      },
      subheadingLines: [
        "CLOSED-COMMUNITY TRAINING FOR THOSE WHO WANT TO MASTER THE MARKET",
        "AND TRADE WITH CONFIDENCE",
      ],
      cta: "Reserve your spot",
    },
  },
  he: {
    header: {
      nav: {
        program: "התוכנית",
        tariffs: "תעריפים",
        faq: "שאלות נפוצות",
      },
      menuButton: "תפריט",
    },
    hero: {
      timer: {
        label: "זמן עד ההתחלה:",
        days: "י",
        hours: "ש",
        minutes: "ד",
      },
      heading: {
        topLine: "העידן",
        highlightLines: ["החדש", "של המסחר"],
        bottomLine: "בישראל",
      },
      subheadingLines: [
        "הכשרה קהילתית סגורה למי שרוצה לשלוט בשוק",
        "ולסחור בביטחון",
      ],
      cta: "שריין את המקום שלך",
    },
  },
};

export function getDictionary(language) {
  return dictionaries[language] ?? dictionaries[DEFAULT_LANGUAGE];
}
