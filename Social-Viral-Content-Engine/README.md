# Social Viral Content Engine

A decision-support engine that recommends the next Instagram post by comparing the existing idea bank with timely, evidence-backed opportunities.

## Current working prototype
The integrated prototype lives at [Amit-2.0-Content-Bank/engine](../Amit-2.0-Content-Bank/engine/index.html). It loads the complete idea-bank CSV and the source-backed watchlist, supports audience/format/type filters, shows transparent editorial scores and links to evidence.

The standalone `prototype/` folder is an earlier visual demo. Use the integrated prototype as the current implementation.

## Current research signals
See [trend-watchlist.json](./trend-watchlist.json). Current entries include:
- AI output quality and privacy concerns in UX work (NN/g, 23 Oct 2026).
- Agent-aware design context, code layers and Specs (Figma, 15 Oct 2026).
- AI UX Designer job-title growth in Design & Make industries (Autodesk, 13 Jul 2026).

These are research/product/career signals, not verified social-platform virality trends. The engine must never imply otherwise.

## Inputs
- The 40-entry idea bank at `../Amit-2.0-Content-Bank/IDEA-BANK.csv`.
- Source-backed research/product/career signals.
- Audience questions and account-owner supplied performance exports as future integrations.

**Data-quality note:** the repository currently has 40 idea-bank entries, but most are still seeds marked "research needed". Do not call all 40 fully researched until each has evidence and a research date.

## Ranking
Audience relevance 25%; timeliness 20%; utility 15%; shareability 15%; originality 10%; credibility 10%; production feasibility 5%.

Scores are editorial estimates, not predictions of reach or virality. Trend candidates require source URL, publication date, check date, scope and evidence confidence. Amit makes the final editorial decision.

## Next implementation steps
1. Add manual score adjustment and persist decisions.
2. Add a permitted trend-source adapter.
3. Connect owned-account Insights exports and audience questions.
4. Add 24-hour / 7-day performance feedback.
5. Prevent repeated topics and diversify franchise/format mix.

No auto-publishing, restricted scraping, engagement manipulation or guaranteed reach.