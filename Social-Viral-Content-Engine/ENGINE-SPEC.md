# Social Viral Content Engine - Product Specification

## Goal
Reduce the decision time between what to post and a justified editorial choice by comparing backlog opportunities with verifiable timely topics.

## Workflow
1. Load researched ideas.
2. Fetch/import current trend candidates from approved sources.
3. Import owned-account performance and audience questions.
4. Normalise and deduplicate.
5. Score candidates and apply audience/evidence/freshness gates.
6. Present top 10 with rationale.
7. Amit chooses Pick / Develop / Watch / Reject.
8. Export selected idea to Content Bank/calendar.
9. Record results at 24h and 7d.

## Candidate fields
id, title, audience_problem, audience_segment, franchise, format, hooks, source_url, source_name, published_at, observed_at, checked_at, geography/scope, signal_type, evidence_summary, evidence_confidence, trend_momentum (only if evidence supports it), duplicate_key, effort, last_published_at, recent_performance.

## Weighted score (0-5 per dimension)
- Audience relevance 25
- Timeliness / trend momentum 20
- Utility / save potential 15
- Shareability 15
- Originality / Amit POV 10
- Credibility / evidence 10
- Production feasibility 5

Formula: sum((dimension score / 5) × weight). Relevance is a gate: poor-fit trends must not beat useful evergreen ideas just because they are popular.

## Evidence freshness
Fresh: checked within 7 days. Recent: 8-30 days. Stale: >30 days. Undated: no reliable timestamp. Show confidence separately from score. Stale/undated sources cap timeliness. Weak evidence blocks factual claims from publication.

## Recommendation card
Rank, topic, audience problem, score breakdown, freshness, confidence, sources/dates, why now, franchise, format, three hooks, effort, CTA, original perspective Amit should add.

## MVP phases
1. CSV/JSON import, transparent scoring, shortlist, filters, manual override.
2. Source-backed trend ingestion with freshness/confidence.
3. Owned-account performance exports and audience questions.
4. Feedback-driven suggestions and duplicate prevention.

## Integrations / non-goals
Start with CSV/manual URLs. Add permitted APIs after checking access and terms. Secrets stay server-side. No private Instagram scraping, auto-publishing, engagement manipulation or guaranteed reach.