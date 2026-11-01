import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { QUESTIONS, scoreFor, labelFor, missingNumbers } from "@/lib/checker";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Research Question Checker" },
      {
        name: "description",
        content:
          "Check in a minute if your research question is doable in 8 weeks, with a tip for every weak spot.",
      },
      { property: "og:title", content: "Research Question Checker" },
      {
        property: "og:description",
        content: "5 yes/no questions, a feasibility score, and exactly what to fix.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Index,
});

type Answer = "yes" | "no" | undefined;

function Index() {
  const [answers, setAnswers] = useState<Answer[]>([undefined, undefined, undefined, undefined, undefined]);
  const [showErrors, setShowErrors] = useState(false);
  const [done, setDone] = useState(false);
  const lock = useRef(false);
  const scoreRef = useRef<HTMLHeadingElement>(null);
  const topRef = useRef<HTMLHeadingElement>(null);
  const focusTarget = useRef<"score" | "top" | null>(null);

  const answered = answers.filter(Boolean).length;
  const missing = missingNumbers(answers);

  useEffect(() => {
    if (focusTarget.current === "score") scoreRef.current?.focus();
    if (focusTarget.current === "top") {
      window.scrollTo({ top: 0 });
      topRef.current?.focus();
    }
    focusTarget.current = null;
  }, [done]);

  const setAnswer = (i: number, v: "yes" | "no") =>
    setAnswers((a) => a.map((x, j) => (j === i ? v : x)));

  const check = () => {
    if (lock.current || done) return;
    if (missing.length) {
      setShowErrors(true);
      document.getElementById(`q${missing[0]}-yes`)?.focus();
      return;
    }
    lock.current = true;
    focusTarget.current = "score";
    setDone(true);
  };

  const reset = () => {
    setAnswers([undefined, undefined, undefined, undefined, undefined]);
    setShowErrors(false);
    lock.current = false;
    focusTarget.current = "top";
    setDone(false);
  };

  const score = scoreFor(answers);
  const label = labelFor(score);
  const tips = QUESTIONS.filter((_, i) => answers[i] === "no");

  return (
    <main className="mx-auto w-full max-w-[640px] px-5 py-10 sm:py-16">
      <header className="mb-8">
        <h1 ref={topRef} tabIndex={-1} className="font-display text-3xl font-semibold leading-tight sm:text-4xl">
          Is your research question doable?
        </h1>
        <p className="mt-3 text-lg text-muted-foreground">
          Answer 5 quick yes/no questions. Get a feasibility score and a tip for every "no". Takes about a minute.
        </p>
      </header>

      {!done ? (
        <form
          noValidate
          onSubmit={(e) => {
            e.preventDefault();
            check();
          }}
        >
          <ol className="space-y-4">
            {QUESTIONS.map((q, i) => {
              const n = i + 1;
              const isMissing = showErrors && !answers[i];
              return (
                <li key={n}>
                  <fieldset
                    aria-describedby={isMissing ? `q${n}-err` : undefined}
                    className="rounded-2xl border border-border bg-card p-5"
                  >
                    <legend className="float-left w-full text-lg font-medium">
                      <span className="text-muted-foreground">{n}. </span>
                      {q.question}
                    </legend>
                    <div className="clear-both flex gap-3 pt-4">
                      {(["yes", "no"] as const).map((v) => (
                        <label key={v} className="pill">
                          <input
                            id={`q${n}-${v}`}
                            type="radio"
                            name={`q${n}`}
                            value={v}
                            checked={answers[i] === v}
                            onChange={() => setAnswer(i, v)}
                            className="sr-only"
                          />
                          <span>{v === "yes" ? "Yes" : "No"}</span>
                        </label>
                      ))}
                    </div>
                    {isMissing && (
                      <p id={`q${n}-err`} className="mt-3 flex items-center gap-2 font-medium text-needs">
                        <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <circle cx="12" cy="12" r="10" />
                          <path d="M12 7v6M12 17h.01" strokeLinecap="round" />
                        </svg>
                        Not answered yet
                      </p>
                    )}
                  </fieldset>
                </li>
              );
            })}
          </ol>

          <p className="mt-6 text-muted-foreground" aria-live="polite">
            {answered} of 5 answered
          </p>

          <div aria-live="assertive">
            {showErrors && missing.length > 0 && (
              <p className="mt-3 rounded-xl border border-needs bg-card p-4 font-medium text-needs">
                Answer all 5 questions to see your score. Still missing:{" "}
                {missing.map((m) => `question ${m}`).join(", ")}.
              </p>
            )}
          </div>

          <button type="submit" className="btn-primary mt-4 w-full sm:w-auto">
            Check my question
          </button>
        </form>
      ) : (
        <section aria-labelledby="score-heading">
          <div className="rounded-2xl border border-border bg-card p-6">
            <h2 id="score-heading" ref={scoreRef} tabIndex={-1} className="font-display flex flex-wrap items-baseline gap-x-4 gap-y-1">
              <span className="text-5xl font-semibold">{score}/100</span>
              <span className={`text-2xl font-semibold ${label.cls}`}>{label.text}</span>
            </h2>
          </div>

          {tips.length === 0 ? (
            <p className="mt-6 text-lg">No tips needed. Your question passed every check, so go start researching!</p>
          ) : (
            <>
              <h3 className="font-display mt-8 text-2xl font-semibold">What to fix</h3>
              <ul className="mt-4 space-y-4">
                {tips.map((t) => (
                  <li key={t.question} className="rounded-2xl border border-border bg-card p-5 break-words">
                    <p className="font-medium">{t.question}</p>
                    <p className="mt-2 text-muted-foreground">{t.tip}</p>
                  </li>
                ))}
              </ul>
            </>
          )}

          <button type="button" onClick={reset} className="btn-primary mt-8 w-full sm:w-auto">
            Start over
          </button>
        </section>
      )}

      <footer className="mt-12 border-t border-border pt-6 text-muted-foreground">
        Nothing you enter is saved or sent anywhere.
      </footer>
    </main>
  );
}
