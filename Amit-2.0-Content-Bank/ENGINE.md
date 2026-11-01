# Social Viral Content Engine

## Purpose

A decision-support tool that chooses the next best Instagram content idea from:
- The existing 40-idea researched backlog.
- New timely topics discovered from current trend sources.

The engine should help Amit decide what to create next, not autonomously publish content.

## Candidate sources

### Backlog
Load structured ideas from IDEA-BANK.csv or JSON. Preserve source URLs, research dates and evidence notes.

### Trend discovery
Use a pluggable provider interface. Potential inputs:
- Google Trends or another trend-data provider.
- Instagram account insights / creator trend observations.
- Design and technology publications.
- Research reports and product release notes.
- Audience questions, comments and submitted dilemmas.

Every trend candidate must include:
- Exact topic and why it is trending.
- Source URL and publisher.
- Published/observed date.
- Date checked.
- Geography / audience scope where known.
- Evidence type (search interest, publication volume, platform trend, product launch, audience demand).
- Confidence level.

Never scrape private or restricted Instagram data, bypass access controls, fabricate trend scores, or label a topic viral without evidence. If live provider data is not connected, clearly show “trend data unavailable” and rank the existing backlog only.

## Scoring

Rate 0-5 and apply these weights:

- Audience relevance: 25%
- Timeliness / trend momentum: 20%
- Utility / save potential: 15%
- Shareability: 15%
- Originality / Amit's distinct POV: 10%
- Credibility / evidence: 10%
- Production feasibility: 5%

Score = sum((dimension / 5) × weight).

Separate from score:
- Evidence confidence: low / medium / high.
- Trend freshness: fresh (≤7 days), recent (8-30 days), stale (>30 days) or undated.
- Effort estimate: 15-30m, 45-75m, 2-3h.
- Audience: 0-2, 2-5, 5-10+ years.
- Format: Reel, carousel, Story, Collab.

Hard gates:
- No publish recommendation for unsupported factual claims.
- Flag potentially sensitive or high-stakes career claims for review.
- Do not use trend momentum alone to recommend an idea with poor audience relevance.
- Penalise duplicates and topics published in the last 30 days unless a new angle exists.

## Decision output

Show a ranked shortlist (top 5-10), including:
1. Topic / title.
2. Source type and source date.
3. Score and confidence.
4. Why it fits the core audience.
5. Suggested franchise and format.
6. Hook options (3).
7. Production effort.
8. Recommended CTA.
9. What Amit must verify / add from experience.

Decision labels:
- Publish next
- Develop further
- Watch trend
- Reject / duplicate

## Weekly selection ritual

Every Sunday:
1. Refresh trends.
2. Import new audience questions.
3. Run scoring.
4. Inspect top 10 candidates.
5. Select four: two discovery pieces, one save-worthy educational piece, one trust/community piece.
6. Check franchise and format balance.
7. Move chosen ideas to production.

## Prototype

The current prototype is a static local-first HTML tool using editable seed data. Live trends require a provider/API integration and should not be implied until configured.
