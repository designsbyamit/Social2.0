# Social Viral Content Engine - Prototype

Open `index.html` through GitHub Pages or a local web server. It imports the 40 seeded topics from the parent Content Bank's `IDEA-BANK.csv`.

## What works in this first prototype

- Imports and ranks the current idea bank.
- Filters backlog versus manually added trend candidates.
- Scores each candidate using the defined weighted model.
- Displays source freshness and evidence confidence separately.
- Allows manual trend candidate entry with source URL, source date and notes.
- Exports the top 15 as CSV.
- Emits a browser `idea-selected` event for future integration with a sprint board.

## What is not connected yet

- No automatic live trend discovery.
- No Instagram Insights integration.
- No persistent database; manually entered candidates are held in browser memory for this session.
- No automatic Notion sync.

These are deliberate boundaries: the tool must never imply a topic is trending or viral without fresh evidence.

## Next implementation steps

1. Add a backend/serverless endpoint for approved trend providers.
2. Store candidate records and evidence snapshots.
3. Add daily/weekly trend refresh with rate limits and source attribution.
4. Add Notion Content & Production Board sync.
5. Add performance feedback import from Instagram insights.
6. Add duplicate detection and recently-published topic penalty.
7. Add editorial decision log (picked, skipped, reason).
