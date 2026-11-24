# 信念更新中 · Updating Beliefs

A learner-friendly bilingual companion to Allen B. Downey's **Think Bayes: Bayesian Statistics in Python, second edition (2021)**, with faithful Traditional Chinese translations of the book's main text.

## Version 3.4.1: purpose, attribution and third-party inventory

This is a **free, noncommercial personal learning project**, created for educational exchange and project sharing. There is currently no advertising, paid content, fundraising or commercial lead generation. This statement describes the project, not an exemption from copyright or an extra license from third parties. It is an independent, unofficial companion and translation draft, without author or publisher endorsement.

`#/licenses` provides Traditional Chinese, English and Japanese purpose statements, the source edition/copyright/changes, reuse terms, a complete media inventory, bundled software and font license links, the source book's embedded external references, and review limits. The welcome page, source home, course footer and each lesson link to these details; lesson references are grouped by the covering source pages and may include neighboring sections.

Book content and adapted educational materials use **CC BY-NC-SA 4.0**, subject to original notices and separate third-party rights. Original application code uses **MIT**. KaTeX program code uses MIT; its font files declare **SIL OFL 1.1**, with full copyright/reserved-font-name notices in `vendor/KATEX-FONTS-OFL.txt`. The embedded Babel/regenerator helpers' MIT notice is also included. Generated illustrations and welcome artwork are labeled as supplements and licensed only to the extent this project holds licensable rights.

- `CONTENT-LICENSE.txt`: purpose, source, changes and educational-content license scope.
- `THIRD-PARTY-NOTICES.txt`: software/fonts and source contributor credits.
- `rights-manifest.json`: file hashes, license documents and original PDF reference links.
- `RIGHTS-AUDIT.md`: technical review, corrections and unresolved underlying permissions.

The source preface credits David MacKay, Cameron Davidson-Pilon and Rasmus Bååth and says some problems/examples were used with permission. This project has not obtained/reviewed those agreements and does not claim independent clearance of all underlying quotations, datasets or third-party works. Future monetization must be reassessed before introduction. Report specific source, credit or rights concerns in [project Issues](https://github.com/SteveMarauder/think-bayes-learning/issues).

## Version 3.4: interleaved original and Chinese reading

The Chinese-English mode now places each source passage immediately above its corresponding Traditional Chinese translation. Source boundaries are recovered from the supplied PDF's text layout, while stored source/translation ranges preserve the existing text and Markdown exactly. Identical code/output and language-independent equations can be shown once as shared content. The PDF remains available as an optional panel below the reading flow.

New readers start in interleaved mode. Existing Chinese-only preferences switch to interleaved mode once for this release; selecting Chinese afterwards is remembered. English and Japanese preferences, lesson/quiz IDs, read progress, imported backups and theme choices remain compatible. Paragraph anchors are identical across English, Chinese and interleaved modes.

`node scripts/verify-parallel-reader.mjs` verifies all 195 sections: source/translation hashes, complete contiguous ranges, no dropped or duplicated text, stable paragraph identities, and escaped source HTML. The paragraph alignment supports comparison with the original PDF; translations retain their existing draft status.

## Version 3.3: standalone welcome cover

The root route is now a full-screen welcome cover with a generated scientific sculpture, animated observation particles, subtle pointer parallax, staged typography and a prominent Enter learning link to `#/map`. It uses the same light/dark and language preferences as the course, without showing course navigation before entry. The original learning/source home remains at `#/home`; original chapter, exercise, progress and source-anchor links remain usable. Clicking the course brand returns to the cover.

The artwork is decorative, not a statistical plot or an original book figure. Built-in image generation provenance and the full prompt are recorded in `assets/welcome/generation.json`. WebP and JPEG copies are encoded from the unmodified generated image. Pause controls stop motion, reduced-motion preferences disable it, and observers/listeners/frame callbacks are released when leaving the cover. Existing browser storage and export formats remain compatible.

## Version 3.2: a living probability homepage

An animated, trilingual Bayesian coin demo introduces the course above the original author/source credits. A fixed 40-toss teaching sequence has 26 heads. Starting with Beta(1, 1), the plotted posterior is Beta(heads + 1, tails + 1); curves share the same density scale and the shaded equal-tail interval contains 90% posterior probability. This is independently authored teaching data, not a result from the book.

Visitors can pause, replay or scrub through all observations with a keyboard-accessible slider. Reduced-motion preferences disable autoplay and interpolation. Playback pauses when offscreen or in a hidden tab, stops after 40 observations, and releases all observers/listeners/frame callbacks on navigation. Themes and Chinese/English/Japanese remain available. The site is named 信念更新中 · Updating Beliefs. Existing browser storage and exported progress formats retain their original identifiers for compatibility.

## Version 3.1: visual learning supplements

Eight trilingual visual guides appear before the source translation in relevant sections and in a dedicated Visual guides collection. Three scientific-book-style illustrations (cookie bowls, Monty Hall doors, and marked/unmarked fish) were generated with the built-in image tool and visually checked. Five other guides use HTML/SVG with explicit, deterministic models: cookie Bayesian updating, Beta prior/posterior, a 90% credible interval, a normalized joint table, and a fixed-seed Metropolis simulation.

All visuals are labeled as site supplements, separate from original book figures. Modal enlargement has a sticky Close button and supports Escape/backdrop closing; it does not collapse an open source PDF. Chinese, English and Japanese captions state the assumptions. Dense charts can scroll sideways on narrow screens, with an onscreen hint.

Image provenance and normalized reproduction prompts: `assets/visuals/generation-prompts.json`. `node scripts/verify-visuals.mjs` checks lesson mappings, multilingual fields, assets, normalization, interval mass and the stated sampling example.

## Version 3: source home, connected route and Japanese edition

- A dedicated home page credits Allen B. Downey and the 2021 second edition, links to the author’s online book, code/notebooks and CC BY-NC-SA 4.0, and distinguishes the source from this site’s adaptations.
- The learning map uses 20 connected chapter nodes and 19 ordered edges. Completed chapters have a check, the last-opened chapter has a double ring, and the next unread chapter has a pennant. States can coexist; reading completion is separate from quiz performance. Desktop uses a serpentine route; small screens use a vertical route with the same chapter order. Locate controls support keyboard focus.
- Japanese includes all 195 source-section translation drafts, 195 concept guides, 177 checks and 36 glossary entries. Chinese, English and Japanese retain the same lesson/quiz IDs and browser progress. Japanese translations offer the original English text in a disclosure and the original PDF viewer.
- Japanese chapter translation files retain the exact existing English source hashes. Locale source files live under `locales/ja/chapters/`; `node scripts/build-japanese.mjs` validates coverage, code/output/math and writes the deterministic Japanese locale pack and manifest.

## Version 2.2 reading experience

- A five-stage visual learning route groups all 20 chapters once, in book order. Each stage has a goal, each chapter has a concrete destination, and the map distinguishes the earliest unread recommendation from the last opened section. Chapter links open the first unread section. Nothing is locked, and reading completion is separate from quiz performance.
- Stage shortcuts support keyboard navigation; light/dark palettes and compact mobile controls remain available.

- Faithful full-section translation drafts for the main text, printed pages 1–304, across all 195 table-of-contents entries. This includes the author's prose, quotations, exercises, code and numeric output. Original figures stay in the PDF; equations use locally bundled KaTeX where typeset math is available.
- The original PDF panel has an explicit **Close original** button. Closing persists across language changes and reloads. Pressing Esc closes an enlarged page first, then can collapse the original panel; the enlarged view also closes by its fixed Close button or backdrop.
- Supplementary concept guides/examples are in a separate, collapsed disclosure, so they are clearly distinguished from faithful source translation.
- Scientific book-inspired typography, fine chart lines and a restrained red accent. Header buttons switch between paper-white and charcoal-dark themes, remembering the choice in this browser. The first visit follows the operating-system preference; switching does not reset reading position, PDF state or selected quiz answers.
- Translations load by chapter and retain a SHA-256 reference to the exact extracted source section. The source is the supplied printed PDF; historical author notebooks are consulted only to clarify equation and code formatting.

The translation is a draft and is not an official or author-reviewed edition. The author's original claims, including printed errors and historical software versions, are retained in translation. Mathematical corrections and version notes are shown separately.

## What is included

- All 20 chapters and all 195 entries in the supplied PDF's table of contents.
- Two aligned Chinese/English concept-guide blocks and a short example for each entry.
- 177 original concept checks with explanations; the first cookie case includes three checks and a small Bayes-table experiment.
- A 36-term concept index, chapter search, previous/next navigation and mobile navigation.
- The 70 original numbered exercises indexed separately, with exact source pages.
- An on-demand original PDF viewer preserving the book's English, charts, tables, equations and layout.
- Chinese, English and side-by-side modes; switching languages retains selected answers and reading position by concept block.
- Browser-local reading/practice records, export and merge-import. No analytics or remote quiz-data storage.

The main Chinese reading area follows the original source in full, rather than replacing it with a summary. Separately labeled supplementary Chinese/English guides and quizzes are newly authored educational adaptations. Original English is available as extracted text and in the faithful PDF page viewer. Full independent reruns of every original program and exercise are not claimed. Source-specific review notes appear in relevant sections, including a unit typo in Chapter 12 and mathematical/software-version care in Chapters 13, 16 and 19.

## Run locally

Node.js 22 or later is sufficient. No package installation is needed.

```sh
npm start
```

Open the printed `http://127.0.0.1:4173` address. Do not double-click `index.html`: ES modules, content loading and the PDF worker need HTTP.

```sh
npm run check
```

This validates JavaScript syntax, source/lesson coverage, both language fields, question/option identities, correct-answer references, original page mapping and local assets. Browser checks should additionally verify PDF rendering, responsive layout and retained quiz answers across language changes/reloads.

## Deploy to GitHub Pages

The application is buildless and uses relative paths and hash routes, so it supports a project URL such as `/think-bayes-learning/`.

1. Push this directory to the `main` branch of a GitHub repository.
2. In **Settings → Pages**, choose **Deploy from a branch**, branch **main**, folder **/(root)**.
3. Save and wait for the GitHub Pages deployment to finish.

The `.nojekyll` file keeps the static assets unchanged. No API key, server, database or paid hosting is required. PDF.js is bundled locally; the original PDF is about 19 MB and loads on demand. Optional links to the author's online edition may reflect revisions after the supplied PDF.

## Content organization

`content.json` is the canonical course/navigation source. `translations/ch01.json` through `ch20.json` hold faithful translated text paired with the exact extracted English source and source hash. Stable IDs preserve the original table-of-contents mapping and existing learner progress. Supplementary guide blocks, examples and quizzes remain independent of the translated text. Both languages use the same question and option IDs. Reading and practice remain separate records.

- `index.html`, `styles.css`, `tech.css`, `app.js`: interface and behavior.
- `content.json`: 195 guides, exercises, concept index and source metadata.
- `translations/`: complete main-text translation drafts and their source coverage manifest.
- `assets/think-bayes-2e.pdf`: supplied 2021 source edition.
- `assets/prior-comparison.png`: original plot excerpt from printed p. 50.
- `vendor/`: PDF.js 6.5.438, Marked 18.2.1, DOMPurify 3.4.18 and KaTeX 0.19.1, including local fonts and license notices. Markdown is sanitized, and math rendering uses `trust: false`.
- `server.mjs`: local-only static server with PDF range responses.
- `scripts/verify.mjs`: content integrity checks.

Original PDF pages are mapped by `pdfPage = printPage + 16` for the main text. Some page ranges include neighboring sections sharing the same page. Extracted text is an accessibility/reference aid; check equations against the original page rendering.

## Attribution and licenses

**Allen B. Downey. Think Bayes: Bayesian Statistics in Python, Second Edition. 2021. ISBN 9781492089469.**

- [Original book](https://allendowney.github.io/ThinkBayes2/)
- [Original source and notebooks](https://github.com/AllenDowney/ThinkBayes2)
- Book text and this site's adapted educational material: [CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/). See `CONTENT-LICENSE.txt`.
- Original application code: MIT. See `LICENSE`.
- PDF.js: Apache-2.0. See `vendor/PDFJS-LICENSE.txt`.

This is an independent learning companion. It does not imply endorsement by the author or publisher.
