# SEO Content Extract - Bright Support

Generated on: 2026-03-23
Source: Next.js metadata, structured data, robots/sitemap, and blog JSON content in this repository.

## 1) Global SEO Metadata

Source: `src/app/layout.tsx`

- metadataBase: `https://www.brightsupport.com.au`
- Default title: `Bright Support | NDIS Support Services Shepparton`
- Title template: `%s | Bright Support NDIS Shepparton`
- Description: `Trusted NDIS disability support provider in Shepparton. Daily living, community nursing, physiotherapy, companionship and more.`
- Keywords: `NDIS, NDIS provider Shepparton, disability support Shepparton, aged care, community nursing, physiotherapy, Mooroopna, Australia, NDIS support services`
- Author: `Bright Support`

Open Graph (global):
- Title: `Bright Support | NDIS Disability & Support Services in Shepparton`
- Description: `NDIS registered disability & support services provider in Shepparton & Mooroopna. Daily living support, community nursing, physiotherapy, and more.`
- Type: `website`
- Locale: `en_AU`
- Site name: `Bright Support`
- Image: `/images/og-image.png` (1200x630)

Twitter (global):
- Card: `summary_large_image`
- Title: `Bright Support | NDIS Support Services Shepparton`
- Description: `Trusted NDIS disability & support services provider. Daily living, nursing, physiotherapy & more.`
- Image: `/images/og-image.png`

## 2) Structured Data (JSON-LD)

Sources:
- `src/components/StructuredData.tsx`
- `src/app/layout.tsx`
- `src/app/_locale_impl/services/[slug]/page.tsx`

Implemented schema types:
- `Organization`
- `LocalBusiness`
- `FAQPage`
- `Service`

Key Organization/Business SEO entities:
- Name: `Bright Support`
- Address: `279 Wyndham St, Shepparton VIC 3630, AU`
- Phone: `+61-1800-407-508`
- Email: `care@brightsupport.com.au`
- SameAs: `https://www.facebook.com/brightsupportcare`
- Aggregate rating: `5.0` from `4` reviews
- Geo: `-36.38, 145.395`
- Map: `https://maps.google.com/?cid=2822930396149587949`
- Tax ID/ABN in structured data: `32659000978`

Homepage FAQ schema is explicitly injected with 5 NDIS-related Q&A entries.
Service pages inject `Service` schema with service title/description and area served (Shepparton, VIC, Australia).

## 3) Robots and Crawl Rules

Source: `src/app/robots.ts`

- User-agent: `*`
- Allow: `/`
- Disallow:
  - `/api/`
  - `/admin/`
  - `/blog?*`
  - `/blog/?*`
- Sitemap reference: `https://www.brightsupport.com.au/sitemap.xml`

## 4) Sitemap SEO Configuration

Source: `src/app/sitemap.ts`

Base URL:
- `https://www.brightsupport.com.au`

Main pages included:
- `/`
- `/about-us/`
- `/our-services/`
- `/blog/`
- `/contact-us/`
- `/career/`
- `/privacy-policy/`
- `/thank-you/`
- `/our-location/`
- `/accommodation-support-services/`
- `/landing/ndis-support`

Service URLs included in sitemap:
- `/dailylivingin-homesupport/`
- `/communitynursingandcomplexcare/`
- `/physiotherapyservices/`
- `/communityparticipationgroupprograms/`
- `/companion-care-services/`
- `/ndis-transport-service-provider/`
- `/ndis-hydrotherapy-services/`
- `/ndispersonaltrainingsessions/`
- `/positivebehavioursupport/`
- `/ndis-cleaning-services/`
- `/independent-living-accommodation-support/`
- `/ndis-support-coordination/`

Sitemap alternates:
- `en`
- `x-default`

## 5) Public Page-Level Metadata

### Privacy Policy

Source: `src/app/privacy-policy/page.tsx`

- Title: `Privacy Policy | Bright Support Australia`
- Description: `Learn how Bright Support collects, uses, and protects your personal information in accordance with Australian privacy legislation and the Public Records Act 1973.`
- Open Graph URL: `https://www.brightsupport.com.au/privacy-policy`

### Blog Listing

Source: `src/app/_locale_impl/blog/page.tsx` (used by `src/app/blog/page.tsx`)

- Title: `All NDIS Blog Posts & Resources | Bright Support Shepparton`
- Description: `Explore our complete collection of NDIS blog posts, disability support guides, and community resources for participants and families in Shepparton, Victoria.`
- Keywords:
  - `NDIS blog`
  - `disability support tips`
  - `NDIS Shepparton`
  - `NDIS resources`
  - `NDIS guides`
  - `disability information`
  - `person-first language`

### Blog Post Template (Dynamic)

Source: `src/app/_locale_impl/blog/[slug]/page.tsx` (used by `src/app/blog/[slug]/page.tsx`)

Per post:
- Title: `${post.title} | Bright Support Shepparton`
- Description: `post.metaDescription || post.excerpt`
- Keywords: `post.keywords`
- OG type: `article`
- OG url: `/blog/${slug}/`
- OG image: `post.featuredImage` (if present)
- Published/modified times: from post JSON fields

### Service Page Metadata (Dynamic)

Source: `src/app/_locale_impl/services/[slug]/page.tsx`

Service metadata values:
- `daily-living-in-home-support`
  - Title: `Daily Living & In-Home Support Services - NDIS Shepparton | Bright Support`
  - Description: `Empowering independence with expert daily living and in-home support for NDIS participants in Shepparton. Personal care, meal prep, and household assistance.`
- `support-coordination`
  - Title: `NDIS Support Coordination Shepparton | Bright Support`
  - Description: `Expert NDIS Support Coordination to help you navigate your plan, connect with the right providers, and achieve your personal goals.`
- `community-nursing-complex-care`
  - Title: `Community Nursing & Complex Care - NDIS Services Shepparton`
  - Description: `Expert community nursing and complex care services in Shepparton. Medication management, wound care, catheter care, and support for complex medical needs by qualified Registered Nurses.`
- `physiotherapy-services`
  - Title: `Physiotherapy Services - NDIS Provider Shepparton`
  - Description: `NDIS physiotherapy services in Shepparton. Personalised treatment for neurological, musculoskeletal, and cardio-pulmonary conditions. Home visits available.`
- `community-participation-group-programs`
  - Title: `Community Participation & Group Programs - NDIS Shepparton`
  - Description: `NDIS community participation and group programs in Shepparton. Social activities, skills development, and community outings to build connections and enhance quality of life.`
- `companionship`
  - Title: `Companionship Services - NDIS Support Shepparton`
  - Description: `NDIS companionship services in Shepparton. Meaningful companionship and emotional support to reduce isolation and improve wellbeing through genuine connections.`
- `travel-transport-assistance`
  - Title: `Travel & Transport Assistance - NDIS Shepparton`
  - Description: `NDIS travel and transport assistance in Shepparton. Safe, reliable transport to appointments, social outings, and community activities. Wheelchair-accessible vehicles available.`
- `hydrotherapy-pool-session`
  - Title: `Hydrotherapy & Pool Sessions - NDIS Shepparton`
  - Description: `NDIS hydrotherapy and pool session services in Shepparton. Water-based therapy for pain management, mobility improvement, and rehabilitation.`
- `personal-training-sessions`
  - Title: `Personal Training Sessions - NDIS Shepparton`
  - Description: `NDIS personal training sessions in Shepparton. Tailored exercise programs to improve physical fitness, strength, and overall wellbeing.`
- `positive-behaviour-support`
  - Title: `Positive Behaviour Support - NDIS Shepparton`
  - Description: `NDIS positive behaviour support services in Shepparton. Evidence-based strategies to understand behaviour and develop positive support plans.`
- `professional-cleaning`
  - Title: `Professional Cleaning Services - NDIS Shepparton`
  - Description: `NDIS professional cleaning services in Shepparton. Reliable house cleaning, laundry, and home maintenance support for NDIS participants.`
- `independent-living-accommodation-support`
  - Title: `Independent Living & Accommodation Support - NDIS Shepparton`
  - Description: `NDIS independent living and accommodation support in Shepparton. Assistance finding suitable accommodation, tenancy support, and supported independent living (SIL).`

Fallback for unknown service slug:
- Title: `NDIS Support Services`
- Description: `NDIS disability and support services by Bright Support in Shepparton.`

## 6) Public Routes Wired to Service Metadata

Wrapper sources: `src/app/*/page.tsx`

- `/dailylivingin-homesupport/` -> `daily-living-in-home-support`
- `/communitynursingandcomplexcare/` -> `community-nursing-complex-care`
- `/physiotherapyservices/` -> `physiotherapy-services`
- `/communityparticipationgroupprograms/` -> `community-participation-group-programs`
- `/companion-care-services/` -> metadata slug currently set to `companion-care-services` (fallback metadata), page render slug uses `companionship`
- `/ndis-transport-service-provider/` -> `travel-transport-assistance`
- `/ndis-hydrotherapy-services/` -> `hydrotherapy-pool-session`
- `/ndispersonaltrainingsessions/` -> `personal-training-sessions`
- `/positivebehavioursupport/` -> `positive-behaviour-support`
- `/ndis-cleaning-services/` -> `professional-cleaning`
- `/independent-living-accommodation-support/` -> `independent-living-accommodation-support`
- `/accommodation-support-services/` -> `independent-living-accommodation-support`
- `/ndis-support-coordination/` -> `support-coordination`

## 7) Blog SEO Content Inventory (Current Slugs)

Source: `src/data/blog-posts.json`

Current blog URLs included in SEO metadata generation and sitemap:
- `/blog/understandingyourndisplanacompleteguideforsheppartonparticipants/`
- `/blog/complete-guide-ndis-services-shepparton-2025/`
- `/blog/ndis-eligibility-do-you-qualify-step-by-step/`
- `/blog/what-is-ndis-daily-living-support-everything-you-need-know/`
- `/blog/how-choose-right-ndis-provider-10-point-checklist/`
- `/blog/ndis-community-nursing-complex-care-need-know/`
- `/blog/physiotherapy-under-ndis-services-costs-how-access/`
- `/blog/independent-living-accommodation-sil-shepparton-guide/`
- `/blog/positive-behaviour-support-pbs-under-ndis-explained/`
- `/blog/best-disability-support-services-near-shepparton-local-guide/`
- `/blog/ndis-success-stories-our-participants-achieved-goals/`
- `/blog/understanding-ndis-funding-budget-make-it-work-for-you/`
- `/blog/day-in-life-ndis-support-shepparton-community/`

Per-post SEO fields available in JSON:
- `title`
- `metaDescription` (falls back to `excerpt`)
- `keywords`
- `featuredImage` / `coverImage`
- `publishedAt`
- `updatedAt`

## 8) Other SEO-Relevant Files

- Security/cache headers: `public/_headers`
- Redirect rules: `public/_redirects`
- Google verification file: `public/google0cee0b285403e4d2.html`

## 9) Notes

- Metadata exists in `_locale_impl` layout files for about/contact/career/services, but these are not directly used by the public wrapper pages unless routed through those segments.
- The companion care page has a metadata slug mismatch (`companion-care-services` vs `companionship`) that causes fallback metadata for that route while rendering companionship content.
