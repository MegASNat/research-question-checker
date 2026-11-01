export const QUESTIONS = [
  {
    question: "Can you get the data or sources you need?",
    tip: "Look for a public dataset first (data.gov, Our World in Data, Kaggle, Pew Research). If none fits, change your question to match data you can collect yourself, like a short anonymous survey.",
  },
  {
    question: "Can you finish it in 8 weeks?",
    tip: "Shrink the scope: one group instead of several, one year instead of ten, one factor instead of many. Plan backwards from week 8.",
  },
  {
    question: "Is your question specific about who, what and where?",
    tip: 'Name exactly who, what and where. "How does social media affect teens?" becomes "Is daily TikTok time linked to sleep hours among 11th graders at my school?"',
  },
  {
    question: "Can it be answered with evidence, not just opinion?",
    tip: 'Swap words like "best" or "should" for something you can measure or compare: a number, a difference, or a relationship you can test.',
  },
  {
    question: "Can you do it safely and ethically without special approval?",
    tip: "If your study involves people, especially minors, you may need consent and approval. Use anonymous surveys or public data, and ask a teacher to look over your plan before you start.",
  },
];

export type Ans = "yes" | "no" | undefined;

export const scoreFor = (a: Ans[]) => a.filter((x) => x === "yes").length * 20;

export const labelFor = (s: number) =>
  s === 100
    ? { text: "Ready to go", cls: "text-ready" }
    : s >= 60
      ? { text: "Almost there", cls: "text-almost" }
      : { text: "Needs rework", cls: "text-needs" };

export const missingNumbers = (a: Ans[]) =>
  a.map((x, i) => (x ? null : i + 1)).filter((x): x is number => x !== null);
