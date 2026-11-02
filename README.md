# Research Question Checker

A one-page site where a high school student answers 5 yes/no questions about their research question and gets a feasibility score with one tip for every "no".

## Links

- **Live site:** not published yet
- **Project documentation (Notion):** https://app.notion.com/p/40b11279ff5d814092e5d34184333520
- **Lovable project:** https://lovable.dev/projects/fca128c5-ba7c-4fb9-93f9-6857fb95e018

## What it does

Built for independent high school researchers who don't have a mentor to tell them whether their research question is realistic.

1. Answer 5 yes/no questions: Can you get the data? Can you finish in 8 weeks? Is it specific about who, what and where? Can it be answered with evidence? Can you do it safely and ethically without special approval?
2. Tap **Check my question**.
3. Get a score out of 100 (20 points per "yes") with a label (Ready to go, Almost there, Needs rework) and one practical tip for each "no".

Everything runs in your browser. Nothing you enter is saved or sent anywhere: there is no database and no login.

## How it's built

- **Stack:** React with TanStack Start (a React framework), Tailwind CSS for styling, built with Lovable, hosted on Lovable.
- **Main pieces:**
  - `src/routes/index.tsx`: the page itself (the questions view and the results view).
  - `src/lib/checker.ts`: the 5 questions, their tips, and the scoring rules.
  - `src/lib/checker.test.ts`: automatic tests for the scoring rules.
  - `src/styles.css`: colors and fonts ("Calm notebook" look).
- **Accessibility:** each question is a labelled radio group that works with a keyboard and screen readers; the score label is always written in words, not shown by color alone.

## How to run it locally

You need Node.js 20 or newer.

```sh
git clone https://github.com/MegASNat/research-question-checker.git
cd research-question-checker
npm install
npm run dev      # start the site locally; open the address it prints
npm test         # run the scoring tests
```

## Status and versions

- **Status:** Building (as of 2026-11-01).
- **v1.0:** will mark the launch-day version.

Made by Meg as part of a one-day build ("ship in a day"), 2026-11-01.
