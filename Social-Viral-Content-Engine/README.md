# Social Viral Content Engine

A decision-support engine that recommends the next Instagram post by comparing the researched backlog with timely, evidence-backed opportunities.

Inputs: 40+ idea bank at ../Amit-2.0-Content-Bank/IDEA-BANK.csv; fresh signals from permitted trend providers; account-owner supplied Instagram insights; audience questions; recent post performance.

Output: top 5-10 candidates with score, evidence confidence, freshness, audience fit, recommended franchise/format, hooks, effort and rationale. Amit makes the final editorial decision.

Ranking: audience relevance 25%; timeliness 20%; utility 15%; shareability 15%; originality 10%; credibility 10%; feasibility 5%.

Every trend needs source URL, source date, checked date, scope and confidence. Popularity alone is not enough. Unsupported claims cannot be recommended for publishing. No live provider means backlog-only mode with explicit disclosure.

Architecture: ingestion adapters → normalisation/deduplication → scoring/evidence gates → ranked shortlist → editorial override → performance feedback. No auto-publishing, restricted scraping, engagement manipulation or guaranteed reach.