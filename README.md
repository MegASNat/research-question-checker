# Research Question Checker

Build "Research Question Checker": a single-page website (no backend, no database, no login, no API calls; everything runs in the browser and nothing is saved or sent).

WHO IT'S FOR
Priya, 16, an 11th grader doing independent research with no mentor, mostly on her phone. She wants to know in under a minute whether her research question is doable in 8 weeks, and exactly what to fix if not.

CORE FLOW (one page, two views)
1. Questions view: headline, subheadline, 5 yes/no questions, a live counter "X of 5 answered", a "Check my question" button, and a footer privacy note.
2. She picks Yes or No for each question (she can change answers, in any order).
3. She taps "Check my question".
4. If any question is unanswered: show an error message above the button listing the missing question numbers, mark each missing question with an icon plus the text "Not answered yet" (not color alone), and move keyboard focus to the first missing question. No score is shown.
5. If all 5 are answered: replace the questions with the Results view: score "N/100" (each Yes = 20 points), a label, then one tip per No in question order under the heading "What to fix". If all 5 are Yes, show the all-clear message instead of tips. Move focus to the score heading so screen readers announce it.
6. "Start over" clears every answer, resets the counter to "0 of 5 answered", and returns to the top of the Questions view.
Tapping "Check my question" twice quickly must show the result once.

SCORE LABELS
100 = "Ready to go" (#15803D) · 60 or 80 = "Almost there" (#B45309) · 0, 20 or 40 = "Needs rework" (#B91C1C). Always show the label as words next to the score.

EXACT COPY
Headline: Is your research question doable?
Subheadline: Answer 5 quick yes/no questions. Get a feasibility score and a tip for every "no". Takes about a minute.
Questions and the tip shown for a No:
1. "Can you get the data or sources you need?" → Tip: "Look for a public dataset first (data.gov, Our World in Data, Kaggle, Pew Research). If none fits, change your question to match data you can collect yourself, like a short anonymous survey."
2. "Can you finish it in 8 weeks?" → Tip: "Shrink the scope: one group instead of several, one year instead of ten, one factor instead of many. Plan backwards from week 8."
3. "Is your question specific about who, what and where?" → Tip: "Name exactly who, what and where. \"How does social media affect teens?\" becomes \"Is daily TikTok time linked to sleep hours among 11th graders at my school?\""
4. "Can it be answered with evidence, not just opinion?" → Tip: "Swap words like \"best\" or \"should\" for something you can measure or compare: a number, a difference, or a relationship you can test."
5. "Can you do it safely and ethically without special approval?" → Tip: "If your study involves people, especially minors, you may need consent and approval. Use anonymous surveys or public data, and ask a teacher to look over your plan before you start."
Buttons: "Check my question" · "Start over"
Counter: "X of 5 answered"
Error: "Answer all 5 questions to see your score. Still missing: question 2, question 4." (list the actual missing numbers)
Tips heading: "What to fix"
All-clear: "No tips needed. Your question passed every check, so go start researching!"
Footer: "Nothing you enter is saved or sent anywhere."
Tone: encouraging, direct, student-to-student.

LOOK ("Calm notebook")
Background #FBF8F3, text #1F2937, muted text #4B5563, borders #E5E0D8, accent and primary buttons #2F6F5E with white text, focus outline #2F6F5E (2px, offset). Headings in Fraunces, everything else in Inter, base font 16px or larger. One centered column, max width about 640px, generous spacing. Each question is a card; Yes and No are large pill-shaped choices at least 44px tall; the selected one is filled with the accent color.

QUALITY
- Accessibility: every text/background pair at least 4.5:1 contrast; each question is a fieldset with a legend and two real radio inputs (Yes/No) so it works with keyboard (Tab + arrow keys) and screen readers; visible focus on everything; the result is announced (aria-live or focus on the score heading).
- Responsive: works at 390px, 768px and 1280px with no sideways scrolling, including when all 5 tips show.
- Performance: first screen visible in under 3 seconds on a phone; no heavy libraries.
- Page title: "Research Question Checker". Add a short meta description.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/fca128c5-ba7c-4fb9-93f9-6857fb95e018).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
