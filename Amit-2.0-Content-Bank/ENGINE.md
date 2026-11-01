# Social Viral Content Engine

## Purpose
Choose the next best Instagram content idea by comparing the existing idea bank with new, timely and source-backed research/product/career signals.

## Current implementation
The integrated browser prototype is in [engine/](./engine/index.html). It automatically loads:
- [IDEA-BANK.csv](./IDEA-BANK.csv), currently 40 entries.
- [trend-watchlist.json](../Social-Viral-Content-Engine/trend-watchlist.json), a source-backed set of current signals.

It filters by audience, format and candidate type, ranks a shortlist, links to evidence and supports copying an idea into production. When browser auto-loading is unavailable (for example, some local file contexts), import the CSV manually.

**Important:** the 40 idea-bank entries are not all fully researched. Most remain seeds marked "research needed". The prototype uses transparent editorial baseline estimates for these entries; scores are not measured performance or virality predictions.

## Candidate sources
- Backlog ideas from the CSV.
- Permitted trend-data providers.
- Official product announcements and release notes.
- Research reports and practitioner surveys.
- Audience questions and account-owner supplied performance exports.

Every timely signal should include exact topic, source URL, publisher, publication/observation date, date checked, scope, evidence type and confidence. Distinguish a product announcement or research report from measured platform trend momentum.

Never scrape private/restricted Instagram data, bypass access controls, fabricate trend scores, or label a topic viral without evidence. If live trend provider data is not connected, clearly show that and rank the backlog only.

## Scoring
Rate each dimension 0-5:
- Audience relevance: 25%
- Timeliness / trend recency: 20%
- Utility / save potential: 15%
- Shareability: 15%
- Originality / Amit's distinct POV: 10%
- Credibility / evidence: 10%
- Production feasibility: 5%

Score = sum((dimension / 5) × weight).

Current backlog scores are editorial estimates derived from audience fit, topic wording, utility labels, source availability and effort. Trend scores are also editorial judgements. They are not observed reach predictions.

Separate from score:
- Evidence confidence: low / medium / high.
- Source freshness: fresh (≤7 days), recent (8-30 days), stale (>30 days) or undated.
- Effort estimate.
- Audience segment: 0-2, 2-5, 5-10+ years.
- Format: Reel, carousel, Story, Collab.

Hard gates:
- No publish recommendation for unsupported factual claims.
- Flag high-stakes career and labour-market claims for review.
- Do not let popularity outweigh audience relevance.
- Penalise duplicates and topics published in the last 30 days unless a new angle exists.

## Decision output
Show a ranked shortlist with topic, score, rationale, source, freshness, confidence, audience fit, franchise, format, hooks, effort and verification needed.

Decision labels: Publish next / Develop further / Watch / Reject or duplicate.

## Weekly selection ritual
1. Refresh source-backed signals.
2. Import audience questions and performance results.
3. Score backlog and new candidates.
4. Review top 10 manually.
5. Select four posts across franchise and format mix.
6. Produce and publish.
7. Capture 24-hour and 7-day performance.
8. Feed learnings into the next selection cycle.
