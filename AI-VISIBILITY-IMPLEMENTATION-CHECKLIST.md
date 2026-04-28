# AI Visibility Implementation Checklist

## Goal
Improve visibility in AI responses and AI overviews for local intent queries in Shepparton.

## Priority Matrix
| Action | Impact | Difficulty | Status |
|---|---|---|---|
| Add `llms.txt` | Directs AI crawlers to important pages | Low (Technical) | Completed |
| FAQ Schema (page-specific) | Increases likelihood of AI Overview extraction | Medium | Completed |
| Entity Linking (brand + place + service graph) | Strengthens knowledge graph association | Medium | In Progress |
| Citation Building (off-site corroboration) | Builds external verification trust | High (Ongoing) | Planned |

## Sprint 1 (This Week)
- [x] Add `public/llms.txt` with priority URLs and canonical references.
- [x] Remove sitewide generic FAQ schema from global layout.
- [x] Add page-specific FAQ schema to high-intent service page route.
- [x] Strengthen schema graph links between Organization, LocalBusiness, Service, and Shepparton place entity.
- [ ] Expand `sameAs` with additional verified profiles (LinkedIn, YouTube, etc.) once URLs are confirmed.

## Sprint 2 (Next 2 Weeks)
- [x] Add page-specific FAQ schema to top 5 transactional pages.
- [ ] Add more entity-rich internal links from blog posts to service and location pages.
- [ ] Add mention consistency pass: Bright Support + Shepparton + NDIS phrasing across key pages.

## Sprint 3 (Ongoing)
- [ ] Build citation tracker sheet with NAP consistency checks.
- [ ] Submit and optimize trusted AU local directories and NDIS-relevant listings.
- [ ] Review AI answer coverage weekly for target queries and iterate content/schema.

## KPIs
- AI answer mention rate for target queries.
- Search Console impressions/clicks for local transactional terms.
- Rich result impressions for FAQ-enhanced pages.
- Count of verified consistent third-party citations.
