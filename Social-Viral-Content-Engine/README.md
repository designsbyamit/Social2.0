# Social Viral Content Engine

A decision-support engine to determine which content idea Amit should pick next.

## The question it answers
"Should I pick one of my researched backlog ideas, or is there a timely topic emerging that is more relevant to young designers right now?"

## Inputs
- The 40+ idea bank in `../Amit-2.0-Content-Bank/IDEA-BANK.csv`.
- Fresh, source-backed signals from permitted trend providers.
- Instagram account insights and performance exports supplied by the account owner.
- Audience questions, comments, DMs or portfolio dilemmas, with privacy respected.
- Past post performance and recently published topics.

## Output
A ranked top 5-10 shortlist with score, evidence confidence, freshness, audience fit, recommended franchise/format, three hooks, effort estimate and rationale. Final editorial choice stays with Amit.

## MVP
See `ENGINE-SPEC.md` and `prototype/`. The prototype is backlog-first. It must clearly disclose that live trend data is not connected until an approved source adapter has been configured.

## Ranking
- Audience relevance: 25%
- Trend momentum / timeliness: 20%
- Utility / save potential: 15%
- Shareability: 15%
- Originality / Amit's POV: 10%
- Credibility / evidence: 10%
- Production feasibility: 5%

Every trend requires source URL, source date, check date, scope and confidence. Popularity alone is not enough. Audience relevance is a gate. Unsupported factual claims cannot be recommended for publication.

## Suggested architecture
1. Ingestion adapters (idea CSV, audience questions, approved trend sources).
2. Normalisation and deduplication.
3. Transparent scoring and freshness/confidence checks.
4. Ranked shortlist with explanations.
5. Editorial override and selection.
6. Performance feedback loop.

Keep API keys server-side. No scraping restricted/private data, no false virality claims, no auto-publishing.
