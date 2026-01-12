# Bright Support Blog Automation - Setup Guide

## Overview

Automated NDIS blog content generation system using n8n, AI agents (Claude Sonnet 4), and Google Sheets integration. Generates 2-3 SEO-optimized articles per week with person-first language, local Shepparton SEO, and NDIS compliance validation.

---

## Prerequisites

### Required Accounts & API Keys

1. **n8n Platform**
   - Self-hosted: Docker, DigitalOcean, AWS, etc.
   - OR n8n.cloud: https://n8n.io/cloud (recommended for beginners)
   - Cost: $20/month (cloud starter plan) or $20/month hosting (self-hosted)

2. **Anthropic Claude API**
   - Sign up: https://console.anthropic.com/
   - Models needed: Claude 3.5 Haiku, Claude Sonnet 4
   - Cost: ~$0.16 per article (~$3-5/month for 2 articles/week)

3. **OpenAI API**
   - Sign up: https://platform.openai.com/
   - Models needed: GPT-4 Mini (for output parsing)
   - Cost: ~$0.02 per article (~$0.50/month)

4. **Google Sheets API**
   - Free with Google Workspace account
   - Enable via Google Cloud Console: https://console.cloud.google.com/
   - Required scopes: `https://www.googleapis.com/auth/spreadsheets`

5. **Pexels API** (for stock images)
   - Sign up: https://www.pexels.com/api/
   - Free tier: 200 requests/hour
   - Alternative: Unsplash API (https://unsplash.com/developers)

6. **Slack** (for approval notifications)
   - Create workspace: https://slack.com/
   - Install n8n app: OAuth2 authentication
   - Optional but recommended for initial 20 articles

---

## Step 1: Google Sheets Setup

### 1.1 Create Blog Pipeline Sheet

1. **Go to Google Sheets**: https://sheets.google.com/
2. **Create new spreadsheet**: "Bright Support Blog Pipeline"
3. **Import CSV template**: 
   - File → Import → Upload
   - Upload `n8n/blog-pipeline-template.csv`
   - Or manually create columns below

### 1.2 Required Columns

| Column Name | Type | Description | Example |
|-------------|------|-------------|---------|
| `Topic` | Text | Article topic/title | "Understanding Your NDIS Plan" |
| `Primary_Keyword` | Text | Main SEO keyword | "NDIS plan Shepparton" |
| `Secondary_Keywords` | Text | Comma-separated keywords | "NDIS planning, plan management" |
| `Target_Audience` | Text | Who this article is for | "Participants" or "Families" |
| `Content_Cluster` | Text | Topic category | "NDIS Eligibility & Planning" |
| `CTA_Type` | Text | Call-to-action type | "Free Consultation" or "Download PDF" |
| `Completed` | Checkbox | Automation completion flag | FALSE (unchecked initially) |
| `Published_URL` | Text | Blog post URL after publish | (empty, filled by automation) |
| `row_number` | Number | Unique identifier | 1, 2, 3, ... (auto-increments) |

### 1.3 Content Clusters (Standardized)

Use these exact values for `Content_Cluster` column:
- "NDIS Eligibility & Planning"
- "Daily Living Support"
- "Community Nursing"
- "Allied Health Services"
- "Community Participation"
- "Accommodation Support"
- "Specialist Support Services"
- "Local NDIS Services"
- "NDIS Education"

### 1.4 CTA Types (Standardized)

Use these exact values for `CTA_Type` column:
- "Free Consultation" → Links to /contact-us
- "Download PDF" → Lead magnet download
- "Book Assessment" → Service-specific booking
- "Call Now" → Phone CTA (03) 5831 5786

### 1.5 Get Sheet ID

1. Copy the Google Sheet URL
2. Extract Sheet ID from URL format:
   ```
   https://docs.google.com/spreadsheets/d/[SHEET_ID]/edit
   ```
3. Save this ID for n8n configuration

---

## Step 2: n8n Installation

### Option A: n8n Cloud (Recommended)

1. **Sign up**: https://n8n.io/cloud
2. **Choose plan**: Starter ($20/month)
3. **Create workspace**
4. **Skip to Step 3** (workflow import)

### Option B: Self-Hosted (Docker)

```bash
# Create docker-compose.yml
cat > docker-compose.yml << 'YAML'
version: '3.8'

services:
  n8n:
    image: n8nio/n8n:latest
    restart: always
    ports:
      - "5678:5678"
    environment:
      - N8N_BASIC_AUTH_ACTIVE=true
      - N8N_BASIC_AUTH_USER=admin
      - N8N_BASIC_AUTH_PASSWORD=your-secure-password
      - N8N_HOST=localhost
      - N8N_PORT=5678
      - N8N_PROTOCOL=http
      - NODE_ENV=production
      - WEBHOOK_URL=http://localhost:5678/
    volumes:
      - n8n_data:/home/node/.n8n

volumes:
  n8n_data:
YAML

# Start n8n
docker-compose up -d

# Access at http://localhost:5678
```

---

## Step 3: Configure API Credentials in n8n

### 3.1 Anthropic Claude API

1. **Go to**: Settings → Credentials → New Credential
2. **Select**: "Anthropic API"
3. **Name**: "anthropicApi"
4. **API Key**: Paste from https://console.anthropic.com/settings/keys
5. **Save**

### 3.2 OpenAI API

1. **New Credential** → "OpenAI API"
2. **Name**: "openAiApi"
3. **API Key**: Paste from https://platform.openai.com/api-keys
4. **Organization ID**: (optional)
5. **Save**

### 3.3 Google Sheets API

1. **New Credential** → "Google Sheets OAuth2 API"
2. **Name**: "googleSheetsOAuth2Api"
3. **Click**: "Connect my account"
4. **Authorize**: n8n access to Google Sheets
5. **Save**

### 3.4 Pexels API

1. **New Credential** → "HTTP Request" (Generic)
2. **Name**: "pexelsApi"
3. **Authentication**: Header Auth
4. **Header Name**: `Authorization`
5. **Header Value**: Paste API key from https://www.pexels.com/api/
6. **Save**

### 3.5 Slack (Optional)

1. **New Credential** → "Slack OAuth2 API"
2. **Name**: "slackOAuth2Api"
3. **Click**: "Connect my account"
4. **Authorize**: n8n to post to Slack workspace
5. **Create channel**: `#blog-approvals`
6. **Save**

---

## Step 4: Import n8n Workflows

### 4.1 Import Main Workflow

1. **In n8n**: Click "+" → "Import from File"
2. **Upload**: `n8n/bright_support_blog_automation.json` (created in Step 5)
3. **Workflow name**: "Bright Support Blog Automation"
4. **Activate**: Toggle "Active" switch

### 4.2 Import SEO Validator Workflow

1. **Import**: `n8n/ndis_seo_validator.json`
2. **Workflow name**: "NDIS SEO Validator"
3. **Activate**: Toggle "Active"

---

## Step 5: Configure Workflow Nodes

### 5.1 Update Google Sheets Node

1. **Open workflow** → Find "Google Sheets (Read)" node
2. **Click to edit**
3. **Credentials**: Select "googleSheetsOAuth2Api"
4. **Spreadsheet ID**: Paste your Sheet ID from Step 1.5
5. **Sheet**: "Sheet1" (or your sheet name)
6. **Filters**:
   - Column: `Completed`
   - Operator: `=`
   - Value: `FALSE`
7. **Save**

### 5.2 Update Schedule Trigger

1. **Find**: "Schedule Trigger" node
2. **Mode**: "Interval"
3. **Interval**: "Days"
4. **Days Between Triggers**: 1
5. **Trigger at Hour**: 9 (9 AM)
6. **Trigger at Minute**: 0
7. **Timezone**: "Australia/Melbourne" (AEST)
8. **Save**

### 5.3 Update Slack Nodes (if using)

1. **Find**: "Slack Notification" nodes
2. **Credentials**: Select "slackOAuth2Api"
3. **Channel**: "#blog-approvals" (or your channel)
4. **Save**

---

## Step 6: Test the Workflow

### 6.1 Manual Test Run

1. **Open workflow**
2. **Click**: "Execute Workflow" button
3. **Monitor**: Node execution (green = success, red = error)
4. **Check**: Google Sheets for "Completed" checkbox update
5. **Verify**: Blog post added to `/src/lib/blog.ts` or data file

### 6.2 Test Checklist

- [ ] Google Sheets connection successful
- [ ] First uncompleted article fetched
- [ ] Content Writer generates full article
- [ ] SEO validation passes (>60% scores)
- [ ] Stock image fetched from Pexels
- [ ] Blog post published to Next.js
- [ ] Google Sheets row marked "Completed = TRUE"
- [ ] Slack notification received (if enabled)

### 6.3 Troubleshooting

**Error: "Google Sheets API not authorized"**
- Re-authorize Google Sheets credential
- Ensure Sheet ID is correct
- Check sharing permissions (n8n needs "Editor" access)

**Error: "Anthropic API rate limit"**
- Check API usage: https://console.anthropic.com/settings/usage
- Increase rate limits or wait 1 hour

**Error: "Content Writer returned empty output"**
- Check Claude Sonnet 4 API status
- Verify system prompt formatting
- Increase max tokens to 8192

**Error: "SEO validation failed"**
- Lower thresholds in "Is it good enough?" node
- Check NDIS-specific validation criteria
- Review person-first language detection

---

## Step 7: Populate Blog Topics

### 7.1 Add 50+ Article Ideas

Use topics from `LEAD-GENERATION-STRATEGY.md`:

**NDIS Eligibility & Planning** (15 articles)
1. Understanding Your NDIS Plan: A Complete Guide
2. NDIS Eligibility Checklist for Shepparton Residents
3. How to Write NDIS Goals That Get Funded
4. NDIS Plan Review: When and How to Request One
5. Core vs Capacity Building Supports Explained
6. NDIS Plan Management vs Self-Management
7. What is a Support Coordinator and Do You Need One?
8. Navigating Your First NDIS Planning Meeting
9. NDIS Funding Categories: A Simple Breakdown
10. How to Appeal an NDIS Decision in Victoria

... (See `blog-pipeline-template.csv` for full list)

### 7.2 Prioritize Articles

**Week 1-4 (High Priority - Foundational)**
- NDIS plan basics
- Eligibility requirements
- Local Shepparton services
- Person-first language education

**Week 5-8 (Medium Priority - Service Deep Dives)**
- Daily living support details
- Community nursing explainers
- Allied health service guides
- Community participation ideas

**Week 9-12 (Low Priority - Advanced Topics)**
- Plan management strategies
- Positive behaviour support
- SIL accommodation options
- NDIS appeals process

---

## Step 8: Enable & Monitor

### 8.1 Activate Workflow

1. **Go to**: Workflow list
2. **Find**: "Bright Support Blog Automation"
3. **Toggle**: "Active" switch to ON
4. **Confirm**: Green "Active" badge appears

### 8.2 Monitoring Dashboard

**Daily Checks**:
- Log into n8n dashboard
- Check "Executions" tab for successful runs
- Review Slack notifications (if enabled)
- Verify blog post quality on website

**Weekly Checks**:
- Google Sheets: Track "Completed" count (target: 2-3/week)
- Website: Test blog listing page load time
- Analytics: Monitor traffic to new posts
- SEO: Check Google Search Console for indexing

**Monthly Checks**:
- Review 20-30 published articles for consistency
- A/B test different AI prompts (compare engagement)
- Audit NDIS compliance (no violations?)
- Adjust SEO validation thresholds based on rankings

---

## Step 9: Human Review Process (First 20 Articles)

### 9.1 Enable Slack Approval Node

1. **In workflow** → Find "Slack Notification" node (currently disabled)
2. **Enable**: Click node → Toggle "Enabled" to ON
3. **Configure**: Approval buttons (Approve/Reject)
4. **Save workflow**

### 9.2 Review Checklist

For each article, verify:

**NDIS Compliance**
- [ ] Person-first language used throughout (no "disabled person")
- [ ] No medical advice without disclaimer
- [ ] Funding information includes "individual plans vary" note
- [ ] Privacy respected (no specific participant names)

**Local SEO**
- [ ] "Shepparton" mentioned 3-5 times naturally
- [ ] "Victoria" or "Greater Shepparton" mentioned 1-2 times
- [ ] Contact info: 279 Wyndham St, (03) 5831 5786
- [ ] Australian spelling: realise, centre, programme

**Content Quality**
- [ ] Title is compelling and includes primary keyword
- [ ] Introduction hooks reader with empathy
- [ ] Main content is actionable and easy to understand
- [ ] FAQ section addresses real participant questions
- [ ] CTA is clear and aligned with article topic

**SEO Technical**
- [ ] Meta description: 150-155 characters
- [ ] Primary keyword in H2 heading, first paragraph, conclusion
- [ ] 3-5 internal links to Bright Support pages
- [ ] Readability: Flesch-Kincaid grade level 8-10
- [ ] Word count: 800-1500 words

### 9.3 Disable After 20 Articles

Once consistency is proven:
1. **Disable Slack node** → Set to "Inactive"
2. **Keep for high-risk topics**: Funding, medical conditions, legal advice
3. **Quarterly audits**: Review 10 random articles every 3 months

---

## Step 10: Performance Optimization

### 10.1 Track Key Metrics

**Content Production**
- Articles published per week: Target 2-3
- Average generation time: Target <2 hours
- SEO quality score: Target >75%
- Error rate: Target <5%

**Business Impact**
- Blog traffic: Target 1,000+ visitors/month by Month 3
- Organic leads: Target 40-50/month from blog content
- Keyword rankings: Target 10+ keywords in Google top 10
- Email subscribers: Target 300+ via lead magnets

**Cost Efficiency**
- Cost per article: ~$0.18-0.33 (AI APIs)
- Time saved: 80-90% (2 hours AI vs 8-10 hours human)
- ROI: Track leads → clients → revenue attribution

### 10.2 A/B Testing Ideas

**Test 1: Tone Variations**
- A: Formal, professional tone
- B: Warm, conversational tone
- Measure: Time on page, bounce rate, CTA clicks

**Test 2: Article Length**
- A: Short (800-1000 words)
- B: Long (1500-2000 words)
- Measure: SEO rankings, social shares

**Test 3: CTA Placement**
- A: CTA only at end
- B: CTA mid-article + end
- Measure: Conversion rate

### 10.3 Continuous Improvement

**Monthly Prompt Refinements**
1. Identify top 3 performing articles (traffic, conversions)
2. Analyze: What makes them effective?
3. Update Content Writer prompt with winning patterns
4. Test on next 10 articles
5. Iterate based on results

**Quarterly Compliance Audits**
1. Random sample: 10 published articles
2. External review: Disability advocate or NDIS consultant
3. Document violations: Person-first language, medical advice, privacy
4. Update validation criteria in SEO Validator workflow
5. Republish corrected articles if needed

---

## Cost Breakdown (Monthly)

| Service | Cost | Notes |
|---------|------|-------|
| n8n Cloud | $20 | Or self-hosted: $20/month (DigitalOcean) |
| Anthropic Claude API | $3-5 | ~$0.16 per article × 10-12 articles |
| OpenAI API | $0.50 | ~$0.02 per article × 10-12 articles |
| Pexels API | $0 | Free tier (200 requests/hour) |
| Google Sheets API | $0 | Free with Google Workspace |
| Slack | $0 | Free plan sufficient |
| **Total** | **$23.50-25.50/month** | vs $800-1,200/month for manual content |

**ROI Calculation**:
- Manual content creation: 8 hours × $100/hour = $800 per article
- Automated: ~$2 per article (AI + hosting)
- **Savings**: $798 per article × 10-12/month = **$7,980-9,576/month**
- **Annual savings**: **$95,760-114,912**

---

## Support & Troubleshooting

### Common Issues

**Issue**: Article generation takes >30 minutes
- **Solution**: Increase timeout in Schedule Trigger node
- **Alternative**: Split workflow into smaller sub-workflows

**Issue**: Person-first language validation too strict
- **Solution**: Adjust banned phrases list in SEO Validator
- **Whitelist**: Medical terms that require "disease/condition" terminology

**Issue**: Stock images not relevant to NDIS topics
- **Solution**: Refine Pexels search terms in Prompt Engineer
- **Alternative**: Use curated internal photo library with model releases

**Issue**: Too many articles generated (overwhelm team)
- **Solution**: Reduce schedule to 2x per week instead of daily
- **Add**: "Max articles per week" counter in workflow logic

### Getting Help

1. **n8n Community Forum**: https://community.n8n.io/
2. **Bright Support Dev Team**: yash@brightsupport.com.au
3. **NDIS Compliance**: Consult disability advocate or NDIS expert
4. **Emergency**: Disable workflow, revert to manual content creation

---

## Next Steps

1. ✅ Complete Google Sheets setup (Step 1)
2. ✅ Install n8n (Step 2)
3. ✅ Configure API credentials (Step 3)
4. ✅ Import workflows (Step 4-5)
5. ✅ Test with 3 sample articles (Step 6)
6. ✅ Enable human review (Step 9)
7. ✅ Monitor first 20 articles closely
8. ✅ Disable approval after consistency proven
9. ✅ Scale to 2-3 articles per week
10. ✅ Track metrics and iterate (Step 10)

**Estimated Setup Time**: 4-6 hours initial setup + 1 hour/week monitoring

**Expected Results (6 Months)**:
- 50+ published NDIS blog articles
- 1,000-2,000 monthly blog visitors
- 40-80 organic leads per month
- 10-20 new clients attributed to blog content
- $50,000-100,000 revenue from content marketing

---

## Appendix: Person-First Language Guidelines

### ❌ Avoid (Medical Model)

- "disabled person"
- "suffers from disability"
- "wheelchair-bound" / "confined to wheelchair"
- "special needs"
- "mentally retarded"
- "handicapped"
- "afflicted with"
- "victim of"
- "crippled"

### ✅ Use (Social Model)

- "person with disability"
- "person who has [condition]"
- "person who uses a wheelchair"
- "participant" / "NDIS participant"
- "person with intellectual disability"
- "accessible parking"
- "person who experiences [condition]"
- "support needs"
- "person with mobility disability"

### Validation Regex (for SEO Validator)

```javascript
const bannedPhrases = [
  /\bdisabled person\b/gi,
  /\bwheelchair[- ]?bound\b/gi,
  /\bconfined to\b/gi,
  /\bsuffers? from\b/gi,
  /\bafflicted with\b/gi,
  /\bvictim of\b/gi,
  /\bspecial needs\b/gi,
  /\bhandicapped\b/gi,
  /\bcrippled?\b/gi,
  /\binvalid\b/gi // (in disability context)
];

// Scan article content
const violations = [];
bannedPhrases.forEach(pattern => {
  const matches = article.match(pattern);
  if (matches) {
    violations.push(...matches);
  }
});

// Calculate score
const personFirstScore = 100 - (violations.length * 5); // -5% per violation
return personFirstScore > 95; // Pass if >95%
```

---

**Last Updated**: December 2, 2025
**Version**: 1.0.0
**Author**: Bright Support Development Team
