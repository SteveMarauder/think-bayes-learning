# 貝氏慢學 · Bayes Notes

A learner-friendly bilingual companion to Allen B. Downey's **Think Bayes: Bayesian Statistics in Python, second edition (2021)**.

## What is included

- All 20 chapters and all 195 entries in the supplied PDF's table of contents.
- Two aligned Chinese/English concept-guide blocks and a short example for each entry.
- 177 original concept checks with explanations; the first cookie case includes three checks and a small Bayes-table experiment.
- A 36-term concept index, chapter search, previous/next navigation and mobile navigation.
- The 70 original numbered exercises indexed separately, with exact source pages.
- An on-demand original PDF viewer preserving the book's English, charts, tables, equations and layout.
- Chinese, English and side-by-side modes; switching languages retains selected answers and reading position by concept block.
- Browser-local reading/practice records, export and merge-import. No analytics or remote quiz-data storage.

The Chinese and English guides are newly authored educational adaptations, **not a complete literal translation or the original English prose**. The original English is shown in the PDF viewer. Content is an initial concept-guide edition, not an author-reviewed translation. Full independent reruns of every original program and exercise are not claimed. Source-specific mathematical/version notes appear in relevant sections, including Chapters 13, 16 and 19.

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

`content.json` is the canonical published content source. Its stable source IDs preserve the original table-of-contents mapping. Each lesson contains its chapter, original title, Chinese guide title, two aligned blocks, example, quiz, source page range and optional review note. Both languages use the same question and option IDs. Reading and practice remain separate records.

- `index.html`, `styles.css`, `app.js`: interface and behavior.
- `content.json`: 195 guides, exercises, concept index and source metadata.
- `assets/think-bayes-2e.pdf`: supplied 2021 source edition.
- `assets/prior-comparison.png`: original plot excerpt from printed p. 50.
- `vendor/`: PDF.js 6.5.438, Apache-2.0.
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
