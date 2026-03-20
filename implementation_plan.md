# Migration Strategy: WordPress → Vercel (Next.js)

Safe migration plan for `www.brightsupport.com.au` from WordPress to the new Next.js site on Vercel.

---

## Phase 1: Prepare the Codebase for Vercel

### Config Changes Required

#### [MODIFY] [next.config.ts](file:///Users/yash/Documents/practice/brightsupport/next.config.ts)
- **Remove** `output: 'export'` — Vercel runs Next.js natively (SSR), so static export is not needed and **prevents [vercel.json](file:///Users/yash/Documents/practice/brightsupport/vercel.json) redirects from working**
- **Remove** `basePath` / `assetPrefix` gh-pages logic — not needed on Vercel
- **Remove** `images.unoptimized: true` — Vercel supports Next.js Image Optimization natively

```diff
 const nextConfig: NextConfig = {
-  output: 'export',
-  basePath: deployTarget === 'gh-pages' ? '/brightsupport' : '',
-  assetPrefix: deployTarget === 'gh-pages' ? '/brightsupport' : '',
   images: {
-    unoptimized: true,
     formats: ['image/webp'],
     ...
   },
+  trailingSlash: true,
   ...
 };
```

#### [MODIFY] [package.json](file:///Users/yash/Documents/practice/brightsupport/package.json)
- Update `build` script: remove `DEPLOY_TARGET=gh-pages` and image optimization pre-step (Vercel handles this)
- Add a `build:vercel` script

```diff
 "scripts": {
-  "build": "DEPLOY_TARGET=gh-pages ... && next build && npm run copy-headers",
+  "build": "next build",
+  "build:gh-pages": "DEPLOY_TARGET=gh-pages NEXT_PUBLIC_DEPLOY_TARGET=gh-pages node scripts/optimize-images.mjs && next build && npm run copy-headers",
 }
```

#### [MODIFY] [vercel.json](file:///Users/yash/Documents/practice/brightsupport/vercel.json)
- Add security headers (fixes Screaming Frog warnings):

```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "X-Content-Type-Options", "value": "nosniff" },
        { "key": "X-Frame-Options", "value": "SAMEORIGIN" },
        { "key": "Referrer-Policy", "value": "strict-origin-when-cross-origin" }
      ]
    }
  ]
}
```

---

## Phase 2: Deploy to Vercel (Preview Only)

> [!IMPORTANT]
> Do NOT point your domain yet. Deploy first to a `.vercel.app` preview URL.

1. **Push code** to GitHub (`github.com/yashshah-dev/brightsupport`)
2. **Import project** on [vercel.com/new](https://vercel.com/new):
   - Select your GitHub repo
   - Framework preset: **Next.js** (auto-detected)
   - Build command: `next build` (or leave default)
   - No environment variables needed initially (add `NEXT_PUBLIC_GA_MEASUREMENT_ID` later)
3. **Deploy** — Vercel gives you a URL like `brightsupport-xxxx.vercel.app`
4. **Test thoroughly** on the preview URL:
   - ✅ All pages load correctly
   - ✅ All 50+ redirects from [vercel.json](file:///Users/yash/Documents/practice/brightsupport/vercel.json) work (test old WordPress URLs)
   - ✅ Sitemap at `/sitemap.xml` renders correctly
   - ✅ Robots.txt loads
   - ✅ Structured data validates (use [Google Rich Results Test](https://search.google.com/test/rich-results))
   - ✅ All 4 locales work (`/en/`, `/zh/`, `/ar/`, `/vi/`)
   - ✅ Contact form submits correctly
   - ✅ Images load (including the flags in footer)

---

## Phase 3: Domain DNS Cutover (Launch Day)

> [!CAUTION]
> This is the critical step. DNS changes propagate in 5 min – 48 hrs.

### Pre-Cutover Checklist
- [ ] Preview site on Vercel fully tested
- [ ] Back up WordPress site (full backup via hosting panel or plugin like UpdraftPlus)
- [ ] Note current DNS records for `brightsupport.com.au` (screenshot them)
- [ ] Set WordPress DNS TTL to 300 seconds (5 min) at least 24 hours before cutover — this makes the switch faster
- [ ] Add `NEXT_PUBLIC_GA_MEASUREMENT_ID` env var in Vercel dashboard

### Cutover Steps

1. **Add domain in Vercel**: Dashboard → Project → Settings → Domains → Add `www.brightsupport.com.au` and `brightsupport.com.au`
2. **Update DNS records** at your domain registrar:
   - `A` record for `brightsupport.com.au` → `76.76.21.21` (Vercel)
   - `CNAME` record for `www` → `cname.vercel-dns.com`
3. Vercel will auto-provision an SSL certificate (takes ~5 minutes)
4. **Do NOT delete the WordPress site yet** — keep it for at least 2 weeks as a fallback

### Immediate Post-Launch Checks (within 30 minutes)
- [ ] Visit `https://www.brightsupport.com.au` — homepage loads
- [ ] Visit `https://brightsupport.com.au` — redirects to `www` version
- [ ] Test 5 old WordPress URLs — all 301 redirect correctly
- [ ] Check Google Search Console for crawl errors

---

## Phase 4: Post-Launch (Days 1–14)

| Day | Action |
|-----|--------|
| **Day 1** | Submit updated sitemap in Google Search Console |
| **Day 1** | Request indexing for homepage + top 5 pages via GSC URL Inspection |
| **Day 1** | Remove old Rank Math sitemaps (`/page-sitemap.xml`) from GSC |
| **Day 3** | Check GSC for any new 404 errors — add redirects if needed |
| **Day 7** | Compare organic traffic in GA4 vs previous week |
| **Day 14** | If everything stable, decommission WordPress hosting |
| **Day 30** | Full SEO comparison — rankings, indexed pages, Core Web Vitals |

---

## Verification Plan

### Automated (Pre-Launch on Preview URL)
```bash
# Test all old WordPress redirects return 301
curl -sI https://brightsupport-xxxx.vercel.app/dailylivingin-homesupport/ | head -3
curl -sI https://brightsupport-xxxx.vercel.app/physiotherapyservices/ | head -3
curl -sI https://brightsupport-xxxx.vercel.app/about-us/ | head -3
```

### Manual (Post-Launch)
1. Open `https://www.brightsupport.com.au` in Chrome
2. Run Lighthouse audit → SEO score should be 90+
3. Run Screaming Frog on the production URL (with JS rendering enabled) → verify all "outside head" issues are gone
4. Test Google Rich Results at `https://search.google.com/test/rich-results`

---

## Rollback Plan

If something goes critically wrong after DNS cutover:
1. Revert DNS records to point back to WordPress hosting
2. DNS propagates within 5 min (if TTL was lowered)
3. WordPress site is still running and untouched

> [!TIP]
> Keep the WordPress hosting active for **at least 2 weeks** after cutover. The cost of a few extra weeks of hosting is trivial compared to the risk of no fallback.
