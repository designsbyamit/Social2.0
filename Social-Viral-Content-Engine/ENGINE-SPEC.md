# Social Viral Content Engine - Product Specification

## Product goal
Reduce the decision time between "what should I post?" and a justified editorial choice. The system should combine evergreen backlog opportunities with evidence-backed timely topics.

## Core workflow
1. Load 40 researched ideas.
2. Fetch or import fresh trend candidates from connected approved sources.
3. Import recent account performance and audience questions.
4. Normalise candidates and detect duplicates.
5. Score candidates across weighted dimensions.
6. Apply hard gates for evidence, audience fit and recency.
7. Present ranked top 10 with clear reasoning.
8. Let Amit accept, reject, watch or develop an idea.
9. Export selected idea to the Content Bank / calendar.
10. Record performance after 24 hours and 7 days.

## Candidate schema
```json
{
  "id": "TREND-001",
  "title": "Agentic interfaces in enterprise products",
  "audience_problem": "Designers are unclear how interaction patterns change when software takes actions.",
  "audience_segment": ["2-5", "5-10+"],
  "franchise": "AI x Design Lab",
  "format": "Carousel",
  "hooks": ["The interface changes when the software can act.", "Designing for agents is not just chat design.", "Five questions to ask before designing an AI agent."],
  "source_url": "https://example.com/source",
  "source_published_at": "2026-11-01",
  "checked_at": "2026-11-01",
  "signal_type": "industry_news",
  "evidence_summary": "Describe the verifiable signal, not an inferred viral score.",
  "evidence_confidence": "medium",
  "trend_momentum": 3,
  "scores": {"relevance": 5, "timeliness": 3, "utility": 4, "shareability": 4, "originality": 4, "credibility": 3, "feasibility": 4}
}
```

The example is a schema illustration, not a claim that this specific topic is trending.

## Scoring and guardrails
Use 0-5 dimension scores. Weighted result:
`score = Σ (dimension_score / 5 × weight)`

Weights: relevance 25, timeliness 20, utility 15, shareability 15, originality 10, credibility 10, feasibility 5.

- Relevance is a hard gate: low-fit trends do not win just because they are popular.
- Timeliness uses source dates and comparable signals, not subjective excitement.
- Credibility is not the same as timeliness; show both.
- Freshness: 0-7 days fresh, 8-30 recent, >30 stale, missing undated.
- Deduplicate against the idea bank and the prior 30 days of posts.
- Flag unsupported labour-market, hiring, salary or layoff claims for manual verification.
- Never label a post "viral" based solely on an algorithmic score.

## Recommendation card
- Topic/title and rank.
- Audience and problem.
- Score plus per-dimension breakdown.
- Freshness, evidence confidence, source links and dates.
- Why it is relevant now.
- Suggested format/franchise.
- Hook variants.
- Estimated production effort.
- Original perspective needed from Amit.
- Decision controls: Pick / Develop / Watch / Reject.

## MVP screens
1. Dashboard / today's recommendation.
2. Ranked candidates with filters and score breakdown.
3. Candidate detail and source evidence.
4. Trend source status and last checked time.
5. Decision log and performance feedback.

## Integration strategy
- Start with CSV imports and manual source URLs.
- Add permitted trend APIs or exports after confirming access and terms.
- Any provider requiring secrets must run server-side.
- Never scrape private Instagram or bypass access controls.
- Add owned-account Insights exports only where the account owner can lawfully provide them.

## Non-goals
- Auto-publishing.
- Buying or guaranteeing reach.
- Engagement manipulation.
- Claiming a topic is trending without verifiable evidence.
