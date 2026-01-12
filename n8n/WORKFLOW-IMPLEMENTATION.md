# n8n Workflow Implementation Guide for Bright Support Blog Automation

## Overview

This document provides step-by-step instructions to manually create the n8n workflow for Bright Support blog automation, adapted from the ProductAI SEO generator template.

## Workflow Architecture

```
Schedule Trigger (Daily 9 AM AEST)
  ↓
Google Sheets (Read uncompleted articles)
  ↓
[REMOVED: HTTP scraping + HTML cleaning - replaced with original content]
  ↓
Content Structure Planner (AI: Claude Haiku)
  ↓
Content Writer (AI: Claude Sonnet 4 with NDIS compliance)
  ↓ (with Output Parser + Auto-fixing)
  ↓
Article Written? (Quality check)
  ↓ TRUE
SEO Validator (Execute sub-workflow: NDIS compliance checks)
  ↓
Is it good enough? (Threshold: >70% scores)
  ↓ TRUE
Image Prompt Engineer (AI: GPT-4 Mini)
  ↓
Fetch Stock Photo (Pexels API with disability-inclusive search)
  ↓
[OPTIONAL: Slack Approval - Enabled for first 20 articles]
  ↓
Publish to Next.js (Execute Node.js script)
  ↓
Update Google Sheets (Mark completed + add metadata)
  ↓
Analytics Tracking (GA4 custom event)
  ↓
End
```

---

## Node-by-Node Setup Instructions

### Node 1: Schedule Trigger

**Type:** `n8n-nodes-base.scheduleTrigger`

**Configuration:**
```json
{
  "rule": {
    "interval": [{
      "field": "days",
      "daysInterval": 1
    }]
  },
  "triggerAtHour": 9,
  "triggerAtMinute": 0,
  "timezone": "Australia/Melbourne"
}
```

**Purpose:** Runs workflow daily at 9 AM AEST (allows time for review before business hours end)

---

### Node 2: Google Sheets - Read

**Type:** `n8n-nodes-base.googleSheets`  
**Operation:** READ

**Configuration:**
```json
{
  "authentication": "oAuth2",
  "operation": "read",
  "documentId": "[YOUR_SHEET_ID]", // From blog-pipeline-template.csv
  "sheetName": "Sheet1", // Or your sheet name
  "filtersUI": {
    "values": [{
      "lookupColumn": "Completed",
      "lookupValue": "false"
    }]
  },
  "options": {
    "limit": 1 // Process one article at a time
  }
}
```

**Setup Steps:**
1. In n8n, add "Google Sheets" node
2. Click "Create new credential"
3. Authenticate with your Google account
4. Paste your Google Sheet ID (from URL)
5. Set filters: `Completed = false`
6. Save node

---

### Node 3: Content Structure Planner

**Type:** `@n8n/n8n-nodes-langchain.agent`  
**AI Model:** Claude 3.5 Haiku

**System Prompt:**
```
You are an expert NDIS content strategist specializing in person-first, compassionate communication for disability services in Australia.

Analyze this topic: {{ $json.Topic }}
Primary keyword: {{ $json.Primary_Keyword }}
Target audience: {{ $json.Target_Audience }}
Content cluster: {{ $json.Content_Cluster }}

Create a detailed content structure including:

1. **Hero Section**
   - Compelling headline (55-60 chars, includes primary keyword)
   - Empathetic subheading that addresses reader's pain point

2. **Introduction (100-150 words)**
   - Hook with relatable scenario or question
   - Acknowledge challenges with compassion
   - Preview what reader will learn
   - Include primary keyword naturally

3. **Main Content Sections (3-5 H2 headings)**
   For each section:
   - H2 heading (use person-first language)
   - 200-300 words of actionable content
   - Real examples relevant to Shepparton/Victoria
   - SEO keyword placement strategy

4. **Practical Guide Section**
   - Step-by-step instructions or checklist
   - Numbered list format for clarity
   - Actionable takeaways

5. **FAQ Section (5-8 questions)**
   - Common participant/family concerns
   - Concise answers (2-4 sentences each)
   - Schema markup friendly format

6. **Conclusion with CTA (100-150 words)**
   - Summarize key points
   - Reinforce Bright Support's unique value
   - Clear call-to-action based on CTA type

7. **SEO & Compliance Notes**
   - Where to place primary keyword ({{ $json.Primary_Keyword }})
   - Local SEO elements (Shepparton references)
   - Internal linking opportunities
   - Person-first language reminders
   - Australian spelling requirements

Return structured JSON:
{
  "headline": "SEO-optimized headline",
  "subheading": "Empathetic subheading",
  "sections": [
    {
      "heading": "H2 heading text",
      "key_points": ["point 1", "point 2"],
      "seo_notes": "Keyword placement strategy",
      "word_count_target": 250
    }
  ],
  "faq": [
    {"question": "FAQ question", "answer": "Brief answer"}
  ],
  "cta": "Call-to-action text",
  "compliance_reminders": ["Person-first language", "Local SEO"]
}
```

**Configuration:**
- **Credential:** Anthropic API (Claude)
- **Model:** claude-3-5-haiku-20241022
- **Max Tokens:** 4096
- **Temperature:** 0.7 (balanced creativity/consistency)

---

### Node 4: Content Writer (NDIS Compliance)

**Type:** `@n8n/n8n-nodes-langchain.agent`  
**AI Model:** Claude Sonnet 4

**System Prompt:** (CRITICAL - This is the core NDIS adaptation)

```
You are an expert NDIS content writer specializing in person-first language, compassionate communication, and local SEO for disability support services in Australia.

Write a complete SEO-optimized blog article for Bright Support (www.brightsupport.com.au), a trusted NDIS provider in Shepparton, Victoria.

Return output in JSON format:
{
  "title": "SEO-optimized title (max 60 characters)",
  "article": "Full HTML-formatted article",
  "summary": "Meta description (150-155 characters)",
  "focus_keyword": "Primary keyword used",
  "internal_links": ["array of suggested internal links"],
  "word_count": 1200
}

## CRITICAL REQUIREMENTS

### 1. PERSON-FIRST LANGUAGE (NON-NEGOTIABLE)
❌ NEVER SAY: "disabled person", "suffers from disability", "wheelchair-bound", "confined to", "special needs", "handicapped"
✅ ALWAYS SAY: "person with disability", "person who uses a wheelchair", "experiences", "participant", "NDIS participant"

### 2. TONE & VOICE
- Compassionate yet professional
- Empowering (focus on independence, choice, dignity)
- Informative without overwhelming
- Conversational but not casual
- Respectful of lived experience
- Free of jargon (or explain NDIS terms clearly)

### 3. SEO STRATEGY
Primary keyword: {{ $('Google Sheets').item.json.Primary_Keyword }}
Secondary keywords: {{ $('Google Sheets').item.json.Secondary_Keywords }}

Use primary keyword:
* In title tag
* In first H2 heading
* In first paragraph (within first 100 words)
* In 1-2 subheadings naturally
* Throughout body (1-2% density)
* In conclusion paragraph

Local SEO (MANDATORY):
* Mention "Shepparton" 3-5 times naturally
* Include "Greater Shepparton" or "Victoria" 1-2 times
* Reference "279 Wyndham St" in contact section
* Use Australian spelling: realise, centre, programme, organisation

### 4. ARTICLE STRUCTURE

Follow this exact HTML structure (start with H2, NOT H1):

<h2>Introduction Heading with Primary Keyword</h2>
<p>Hook paragraph addressing reader's pain point. Include primary keyword naturally. 100-150 words.</p>

<h2>Main Section 1</h2>
<p>Content paragraph with actionable information. 200-300 words.</p>
<ul>
  <li><strong>Key point 1:</strong> Description</li>
  <li><strong>Key point 2:</strong> Description</li>
</ul>

<h2>Main Section 2</h2>
<p>In Shepparton, participants often ask about... [local example]</p>
<p>At Bright Support, our <a href="/services/daily-living-in-home-support" class="text-indigo-600 hover:underline">daily living support services</a> include...</p>

<h3>Subsection (if needed)</h3>
<p>Detailed explanation...</p>

<h2>Step-by-Step Guide</h2>
<ol>
  <li><strong>Step 1:</strong> Clear instruction</li>
  <li><strong>Step 2:</strong> Actionable advice</li>
  <li><strong>Step 3:</strong> Expected outcome</li>
</ol>

<h2>Frequently Asked Questions</h2>

<h3>Question 1 relevant to topic?</h3>
<p>Clear answer in 2-4 sentences. Include specific details for Shepparton context if relevant.</p>

<h3>Question 2?</h3>
<p>Answer with empathy and accuracy.</p>

[Repeat for 5-8 FAQs]

<h2>Get Support in Shepparton</h2>
<p>Closing paragraph summarizing key takeaways.</p>

<p>[CTA based on {{ $('Google Sheets').item.json.CTA_Type }}]:</p>

IF CTA_Type = "Free Consultation":
<p><strong>Ready to get started?</strong> Contact Bright Support today for a free NDIS planning consultation. Call <a href="tel:0358315786" class="text-indigo-600 hover:underline">(03) 5831 5786</a> or visit us at 279 Wyndham St, Shepparton VIC 3630. <a href="/contact-us" class="text-indigo-600 hover:underline font-semibold">Book your free consultation</a>.</p>

IF CTA_Type = "Download PDF":
<p><strong>Want to learn more?</strong> Download our free NDIS Planning Checklist for Shepparton participants. <a href="/resources/ndis-checklist" class="text-indigo-600 hover:underline font-semibold">Get your free guide</a> or call (03) 5831 5786.</p>

IF CTA_Type = "Book Assessment":
<p><strong>Ready for personalized support?</strong> Book your NDIS assessment with Bright Support's experienced team in Shepparton. <a href="/contact-us" class="text-indigo-600 hover:underline font-semibold">Schedule your assessment</a> or call (03) 5831 5786 today.</p>

### 5. INTERNAL LINKING (3-5 links minimum)
Link to relevant Bright Support pages:
- Service pages: /services/daily-living-in-home-support, /services/community-nursing-complex-care, /services/community-participation-group-programs
- About: /about-us
- Contact: /contact-us
- Other blog posts (if relevant)

Use descriptive anchor text: "our community nursing services" NOT "click here"

### 6. COMPLIANCE & DISCLAIMERS

ALWAYS include if discussing funding/costs:
"NDIS funding varies based on individual plans. Contact the NDIA or your support coordinator for personalized guidance."

ALWAYS include if health/medical topics:
"This information is for educational purposes. Always consult with qualified healthcare professionals for medical advice."

NO specific participant names or identifying details (privacy).

### 7. HTML FORMATTING RULES

- Use <h2>, <h3> tags (semantic HTML)
- Paragraphs in <p> tags
- Lists: <ul><li> or <ol><li>
- Bold key terms: <strong>term</strong>
- Emphasis: <em>nuanced language</em>
- Links: <a href="/path" class="text-indigo-600 hover:underline">anchor text</a>
- Quotes: <blockquote class="border-l-4 border-indigo-500 pl-4 italic my-4">quote</blockquote>

### 8. OUTPUT RULES (CRITICAL)
- DO NOT include preamble or explanations
- DO NOT say "Here's the article" or "I've written..."
- ONLY return the JSON object
- Ensure valid JSON (escape quotes, no trailing commas)
- Article must be 100% complete and ready to publish

## CONTENT INPUTS

Topic: {{ $('Google Sheets').item.json.Topic }}
Primary Keyword: {{ $('Google Sheets').item.json.Primary_Keyword }}
Secondary Keywords: {{ $('Google Sheets').item.json.Secondary_Keywords }}
Target Audience: {{ $('Google Sheets').item.json.Target_Audience }}
Content Cluster: {{ $('Google Sheets').item.json.Content_Cluster }}
CTA Type: {{ $('Google Sheets').item.json.CTA_Type }}

Content Structure:
{{ $('Content Structure Planner').item.json.output }}

## BRIGHT SUPPORT BRAND CONTEXT

- Founded: 2019
- Location: 279 Wyndham St, Shepparton VIC 3630
- Phone: (03) 5831 5786
- Service areas: Shepparton, Mooroopna, Tatura, Greater Shepparton region
- Core values: Independence, Choice, Dignity, Compassion
- Services: Daily living support, community nursing, physiotherapy, community participation, hydrotherapy, personal training, positive behaviour support, companionship, transport, SIL, professional cleaning, travel assistance
- USP: Person-centered approach, 24/7 support availability, qualified team with NDIS expertise, local Shepparton knowledge

Write the complete article now. Return only JSON.
```

**Configuration:**
- **Credential:** Anthropic API
- **Model:** claude-sonnet-4-20250514
- **Max Tokens:** 8192 (allow for longer articles)
- **Temperature:** 0.5 (consistent, high-quality output)
- **Connected Tools:** None (no external tool calls needed)
- **Error Handling:** continueErrorOutput

**Output Parser Chain:**
1. **Structured Output Parser:**
   - Schema: `{ title: string, article: string, summary: string, focus_keyword: string, internal_links: string[], word_count: number }`
2. **Auto-fixing Parser:**
   - Model: GPT-4 Mini
   - Repairs malformed JSON from Content Writer

---

### Node 5: Article Written? (Quality Check)

**Type:** `n8n-nodes-base.if`

**Condition:**
```javascript
{{ $json.output.article }} is NOT EMPTY
AND
{{ $json.output.article.length }} > 500
AND
{{ $json.output.title }} is NOT EMPTY
```

**Logic:**
- **TRUE** → Continue to SEO validation
- **FALSE** → Send error to Slack + Stop workflow

---

### Node 6: Execute Workflow - SEO Validator

**Type:** `n8n-nodes-base.executeWorkflow`

**Configuration:**
```json
{
  "workflowId": "[NDIS_SEO_VALIDATOR_WORKFLOW_ID]", // Created separately
  "source": "database",
  "waitForSubWorkflow": true
}
```

**Input Data:**
```javascript
{
  "article": "{{ $('Content Writer').item.json.output.article }}",
  "title": "{{ $('Content Writer').item.json.output.title }}",
  "summary": "{{ $('Content Writer').item.json.output.summary }}",
  "primary_keyword": "{{ $('Google Sheets').item.json.Primary_Keyword }}",
  "target_audience": "{{ $('Google Sheets').item.json.Target_Audience }}"
}
```

**Expected Output:** (from SEO Validator sub-workflow)
```javascript
{
  "overall_score": 85,
  "person_first_language_score": 98,
  "keyword_density": 1.5,
  "local_seo_mentions": 5,
  "readability_grade": 9.2,
  "meta_description_length": 153,
  "internal_links_count": 4,
  "faq_schema_present": true,
  "violations": [],
  "passed": true
}
```

---

### Node 7: Is it Good Enough? (Quality Gate)

**Type:** `n8n-nodes-base.if`

**Conditions (ALL must be true):**
```javascript
{{ $json.overall_score }} > 70
AND
{{ $json.person_first_language_score }} > 95
AND
{{ $json.keyword_density }} >= 1 AND <= 2.5
AND
{{ $json.local_seo_mentions }} >= 3
AND
{{ $json.readability_grade }} < 11
AND
{{ $json.meta_description_length }} >= 150 AND <= 155
AND
{{ $json.internal_links_count }} >= 3
```

**Logic:**
- **TRUE** → Continue to image generation
- **FALSE** → Loop back to Content Writer (max 2 retries) OR send for manual review

---

### Node 8: Image Prompt Engineer

**Type:** `@n8n/n8n-nodes-langchain.agent`  
**AI Model:** GPT-4 Mini

**System Prompt:**
```
You are an expert at generating search queries for finding inclusive, empowering stock photos of people with disabilities.

Your task: Based on the article content, generate a detailed search query for Pexels/Unsplash that will find:
- Authentic disability representation
- People with disabilities in empowering, natural settings
- Diverse representation (age, ethnicity, disability types)
- Shepparton/Victoria context if relevant (suburban Australia, community centers, accessible environments)
- Avoid stereotypical "inspirational" or "tragic" imagery

Guidelines:
- Feature people first, disability second
- Show independence, joy, community, dignity
- Natural lighting, candid moments preferred
- Professional lifestyle photography style
- High contrast for accessibility

Example outputs:
- "diverse people with disabilities participating community art class natural lighting"
- "wheelchair user smiling working laptop modern accessible office"
- "elderly person with walker enjoying park autumn Victoria Australia"
- "young adult with down syndrome cooking kitchen independent living"

Article topic: {{ $('Google Sheets').item.json.Topic }}
Target audience: {{ $('Google Sheets').item.json.Target_Audience }}

Return ONLY the search query (15-20 words max), no explanation.
```

**Configuration:**
- **Model:** gpt-4-mini
- **Max Tokens:** 100
- **Temperature:** 0.7

---

### Node 9: Fetch Stock Photo (Pexels API)

**Type:** `n8n-nodes-base.httpRequest`

**Configuration:**
```json
{
  "method": "GET",
  "url": "https://api.pexels.com/v1/search",
  "authentication": "genericCredentialType",
  "genericAuthType": "httpHeaderAuth",
  "qs": {
    "query": "={{ $('Image Prompt Engineer').item.json.output }}",
    "per_page": 5,
    "orientation": "landscape",
    "size": "large"
  },
  "options": {
    "response": {
      "response": {
        "fullResponse": false,
        "neverError": false
      }
    }
  }
}
```

**Header Authentication:**
- **Name:** `Authorization`
- **Value:** `YOUR_PEXELS_API_KEY` (from https://www.pexels.com/api/)

**Output Processing:**
```javascript
// Select first relevant image
const imageUrl = $json.photos[0].src.large2x;
return { image_url: imageUrl, photographer: $json.photos[0].photographer };
```

**Alternative: Unsplash API**
```json
{
  "url": "https://api.unsplash.com/search/photos",
  "qs": {
    "query": "={{ $('Image Prompt Engineer').item.json.output }}",
    "per_page": 5,
    "orientation": "landscape"
  }
}
```

---

### Node 10: Slack Notification (OPTIONAL - Enable for first 20 articles)

**Type:** `n8n-nodes-base.slack`  
**Operation:** `sendAndWait` (pauses workflow for human approval)

**Configuration:**
```json
{
  "authentication": "oAuth2",
  "operation": "sendAndWait",
  "channel": "#blog-approvals", // Create this channel in Slack
  "message": {
    "blocks": [
      {
        "type": "header",
        "text": {
          "type": "plain_text",
          "text": "🆕 New Blog Article Ready for Review"
        }
      },
      {
        "type": "section",
        "text": {
          "type": "mrkdwn",
          "text": "*Title:* {{ $('Content Writer').item.json.output.title }}\n*Keyword:* {{ $('Google Sheets').item.json.Primary_Keyword }}\n*Word Count:* {{ $('Content Writer').item.json.output.word_count }}\n*SEO Score:* {{ $('Execute Workflow').item.json.overall_score }}%"
        },
        "accessory": {
          "type": "image",
          "image_url": "{{ $('Fetch Stock Photo').item.json.image_url }}",
          "alt_text": "Article hero image"
        }
      },
      {
        "type": "section",
        "text": {
          "type": "mrkdwn",
          "text": "*Summary:*\n{{ $('Content Writer').item.json.output.summary }}"
        }
      },
      {
        "type": "divider"
      },
      {
        "type": "section",
        "text": {
          "type": "mrkdwn",
          "text": "Review checklist:\n✅ Person-first language\n✅ Local Shepparton SEO\n✅ NDIS compliance\n✅ CTA clarity"
        }
      },
      {
        "type": "actions",
        "elements": [
          {
            "type": "button",
            "text": {
              "type": "plain_text",
              "text": "✅ Approve & Publish"
            },
            "style": "primary",
            "value": "approve"
          },
          {
            "type": "button",
            "text": {
              "type": "plain_text",
              "text": "❌ Reject & Revise"
            },
            "style": "danger",
            "value": "reject"
          }
        ]
      }
    ]
  }
}
```

**Response Handling:**
- **Approve** → Continue to publish
- **Reject** → Send error notification + stop workflow (manual intervention)

**When to Disable:** After 20 successful articles with consistent quality

---

### Node 11: Publish to Next.js (Execute Script)

**Type:** `n8n-nodes-base.executeCommand`

**Configuration:**
```json
{
  "command": "cd /path/to/brightsupport && npx tsx scripts/publish-blog-post.ts '{{ $json }}'",
  "cwd": "/path/to/brightsupport",
  "timeout": 30000
}
```

**Input Data (passed as JSON string):**
```javascript
{
  "title": "{{ $('Content Writer').item.json.output.title }}",
  "article": "{{ $('Content Writer').item.json.output.article }}",
  "summary": "{{ $('Content Writer').item.json.output.summary }}",
  "focus_keyword": "{{ $('Content Writer').item.json.output.focus_keyword }}",
  "internal_links": {{ $('Content Writer').item.json.output.internal_links }},
  "image_url": "{{ $('Fetch Stock Photo').item.json.image_url }}",
  "content_cluster": "{{ $('Google Sheets').item.json.Content_Cluster }}",
  "cta_type": "{{ $('Google Sheets').item.json.CTA_Type }}",
  "target_audience": "{{ $('Google Sheets').item.json.Target_Audience }}",
  "secondary_keywords": "{{ $('Google Sheets').item.json.Secondary_Keywords }}",
  "seo_score": {{ $('Execute Workflow').item.json.overall_score }}
}
```

**Expected Output:**
```javascript
{
  "success": true,
  "slug": "understanding-your-ndis-plan-complete-guide",
  "url": "/blog/understanding-your-ndis-plan-complete-guide",
  "publishedAt": "2024-12-02T09:00:00.000Z",
  "wordCount": 1247,
  "readingTime": 7
}
```

**Error Handling:** If script fails, send error to Slack + stop workflow

---

### Node 12: Update Google Sheets (Mark Complete)

**Type:** `n8n-nodes-base.googleSheets`  
**Operation:** UPDATE

**Configuration:**
```json
{
  "authentication": "oAuth2",
  "operation": "update",
  "documentId": "[YOUR_SHEET_ID]",
  "sheetName": "Sheet1",
  "dataLocationOnSheet": "lookupColumn",
  "columnToMatchOn": "row_number",
  "valueToMatchOn": "={{ $('Google Sheets').item.json.row_number }}",
  "fieldsUi": {
    "values": [
      {
        "column": "Completed",
        "fieldValue": "=true"
      },
      {
        "column": "Published_URL",
        "fieldValue": "={{ $('Publish to Next.js').item.json.url }}"
      },
      {
        "column": "Published_Date",
        "fieldValue": "={{ $now.toISO() }}"
      },
      {
        "column": "Word_Count",
        "fieldValue": "={{ $('Publish to Next.js').item.json.wordCount }}"
      },
      {
        "column": "SEO_Score",
        "fieldValue": "={{ $('Execute Workflow').item.json.overall_score }}"
      }
    ]
  }
}
```

---

### Node 13: GA4 Analytics Event

**Type:** `n8n-nodes-base.httpRequest`  
**Method:** POST

**Configuration:**
```json
{
  "url": "https://www.google-analytics.com/mp/collect",
  "method": "POST",
  "qs": {
    "measurement_id": "G-XXXXXXXXXX", // Your GA4 Measurement ID
    "api_secret": "YOUR_API_SECRET" // From GA4 Admin
  },
  "bodyParametersUi": {
    "parameter": [
      {
        "name": "client_id",
        "value": "n8n_automation"
      },
      {
        "name": "events",
        "value": [{
          "name": "blog_published",
          "params": {
            "article_title": "={{ $('Content Writer').item.json.output.title }}",
            "primary_keyword": "={{ $('Google Sheets').item.json.Primary_Keyword }}",
            "content_cluster": "={{ $('Google Sheets').item.json.Content_Cluster }}",
            "seo_score": {{ $('Execute Workflow').item.json.overall_score }},
            "word_count": {{ $('Publish to Next.js').item.json.wordCount }},
            "automation_source": "n8n"
          }
        }]
      }
    ]
  }
}
```

---

### Node 14: Success Notification (Slack)

**Type:** `n8n-nodes-base.slack`  
**Operation:** `postMessage`

**Configuration:**
```json
{
  "channel": "#blog-approvals",
  "message": {
    "text": "✅ Blog article published successfully!",
    "blocks": [
      {
        "type": "section",
        "text": {
          "type": "mrkdwn",
          "text": "✅ *Article Published*\n\n*Title:* {{ $('Content Writer').item.json.output.title }}\n*URL:* https://brightsupport.com.au{{ $('Publish to Next.js').item.json.url }}\n*SEO Score:* {{ $('Execute Workflow').item.json.overall_score }}%\n*Word Count:* {{ $('Publish to Next.js').item.json.wordCount }}"
        }
      }
    ]
  }
}
```

---

### Error Handling Nodes

#### Error Node 1: Article Generation Failed

**Trigger:** Node 5 (Article Written?) returns FALSE

**Type:** `n8n-nodes-base.slack`

**Message:**
```
❌ Article generation failed

Topic: {{ $('Google Sheets').item.json.Topic }}
Keyword: {{ $('Google Sheets').item.json.Primary_Keyword }}
Error: Content Writer returned empty or invalid output

Action: Check AI model limits, prompt configuration, or API status
```

#### Error Node 2: SEO Validation Failed

**Trigger:** Node 7 (Is it Good Enough?) returns FALSE

**Type:** `n8n-nodes-base.slack`

**Message:**
```
⚠️ SEO validation failed - Manual review required

Title: {{ $('Content Writer').item.json.output.title }}
Overall Score: {{ $('Execute Workflow').item.json.overall_score }}%
Issues:
- Person-first language: {{ $('Execute Workflow').item.json.person_first_language_score }}%
- Local SEO mentions: {{ $('Execute Workflow').item.json.local_seo_mentions }}
- Readability grade: {{ $('Execute Workflow').item.json.readability_grade }}

Action: Review article manually or adjust quality thresholds
```

---

## Sub-Workflow: NDIS SEO Validator

**Workflow ID:** `ndis_seo_validator`  
**Purpose:** Validates article quality with NDIS-specific checks

### Input Schema:
```json
{
  "article": "Full HTML article content",
  "title": "Article title",
  "summary": "Meta description",
  "primary_keyword": "Target SEO keyword",
  "target_audience": "Participants/Families/etc"
}
```

### Validation Nodes:

#### 1. Person-First Language Checker

**Type:** `n8n-nodes-base.code`

**JavaScript Code:**
```javascript
const article = $input.item.json.article;

const bannedPhrases = [
  /\bdisabled person\b/gi,
  /\bwheelchair[- ]?bound\b/gi,
  /\bconfined to\b/gi,
  /\bsuffers? from\b/gi,
  /\bafflicted with\b/gi,
  /\bvictim of\b/gi,
  /\bspecial needs\b/gi,
  /\bhandicapped\b/gi,
  /\bcrippled?\b/gi
];

const violations = [];
bannedPhrases.forEach(pattern => {
  const matches = article.match(pattern);
  if (matches) {
    violations.push(...matches);
  }
});

const personFirstScore = Math.max(0, 100 - (violations.length * 5));

return {
  person_first_language_score: personFirstScore,
  violations: violations,
  passed: personFirstScore > 95
};
```

#### 2. Keyword Density Checker

**Type:** `n8n-nodes-base.code`

**JavaScript Code:**
```javascript
const article = $input.item.json.article;
const keyword = $input.item.json.primary_keyword.toLowerCase();

// Remove HTML tags for word count
const cleanText = article.replace(/<[^>]*>/g, ' ');
const words = cleanText.split(/\s+/).filter(w => w.length > 0);
const totalWords = words.length;

// Count keyword occurrences (exact match + variations)
const keywordRegex = new RegExp(keyword, 'gi');
const keywordCount = (cleanText.match(keywordRegex) || []).length;

const density = (keywordCount / totalWords) * 100;

return {
  keyword_density: parseFloat(density.toFixed(2)),
  keyword_count: keywordCount,
  total_words: totalWords,
  passed: density >= 1 && density <= 2.5
};
```

#### 3. Local SEO Checker

**Type:** `n8n-nodes-base.code`

**JavaScript Code:**
```javascript
const article = $input.item.json.article.toLowerCase();

const localTerms = [
  { term: 'shepparton', count: 0, minRequired: 3 },
  { term: 'greater shepparton', count: 0, minRequired: 0 },
  { term: 'victoria', count: 0, minRequired: 1 },
  { term: '279 wyndham st', count: 0, minRequired: 0 },
  { term: '(03) 5831 5786', count: 0, minRequired: 0 }
];

localTerms.forEach(item => {
  const regex = new RegExp(item.term, 'gi');
  item.count = (article.match(regex) || []).length;
});

const totalMentions = localTerms.reduce((sum, item) => sum + item.count, 0);

return {
  local_seo_mentions: totalMentions,
  shepparton_count: localTerms[0].count,
  victoria_count: localTerms[2].count,
  passed: totalMentions >= 3
};
```

#### 4. Readability Checker (Flesch-Kincaid)

**Type:** `n8n-nodes-base.code`

**JavaScript Code:**
```javascript
const article = $input.item.json.article;
const cleanText = article.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ');

// Count sentences
const sentences = cleanText.split(/[.!?]+/).filter(s => s.trim().length > 0);
const sentenceCount = sentences.length;

// Count words
const words = cleanText.split(/\s+/).filter(w => w.length > 0);
const wordCount = words.length;

// Count syllables (simple approximation)
const syllableCount = words.reduce((total, word) => {
  const vowels = word.match(/[aeiouy]+/gi);
  return total + (vowels ? vowels.length : 1);
}, 0);

// Flesch-Kincaid Grade Level formula
const gradeLevel = 0.39 * (wordCount / sentenceCount) + 11.8 * (syllableCount / wordCount) - 15.59;

return {
  readability_grade: parseFloat(gradeLevel.toFixed(1)),
  sentence_count: sentenceCount,
  word_count: wordCount,
  avg_words_per_sentence: parseFloat((wordCount / sentenceCount).toFixed(1)),
  passed: gradeLevel < 11
};
```

#### 5. Meta Description Checker

**Type:** `n8n-nodes-base.code`

**JavaScript Code:**
```javascript
const summary = $input.item.json.summary;
const length = summary.length;

return {
  meta_description_length: length,
  passed: length >= 150 && length <= 155
};
```

#### 6. Internal Links Checker

**Type:** `n8n-nodes-base.code`

**JavaScript Code:**
```javascript
const article = $input.item.json.article;

// Find all internal links (relative paths starting with /)
const internalLinkRegex = /<a[^>]+href="(\/[^"]*)"[^>]*>/gi;
const links = [];
let match;

while ((match = internalLinkRegex.exec(article)) !== null) {
  links.push(match[1]);
}

return {
  internal_links_count: links.length,
  internal_links: links,
  passed: links.length >= 3
};
```

#### 7. FAQ Schema Checker

**Type:** `n8n-nodes-base.code`

**JavaScript Code:**
```javascript
const article = $input.item.json.article;

// Check for FAQ section (H2 containing "frequently asked questions" or "FAQ")
const faqHeadingRegex = /<h2[^>]*>.*?(frequently asked questions|faq).*?<\/h2>/gi;
const hasFaqHeading = faqHeadingRegex.test(article);

// Count H3 questions within FAQ section
const h3QuestionsRegex = /<h3[^>]*>.*?\?.*?<\/h3>/gi;
const questionCount = (article.match(h3QuestionsRegex) || []).length;

return {
  faq_schema_present: hasFaqHeading && questionCount >= 5,
  faq_question_count: questionCount,
  passed: hasFaqHeading && questionCount >= 5
};
```

#### 8. Overall Score Calculator

**Type:** `n8n-nodes-base.code`

**JavaScript Code:**
```javascript
const checks = [
  $('Person-First Language Checker').item.json.person_first_language_score,
  $('Keyword Density Checker').item.json.passed ? 100 : 50,
  $('Local SEO Checker').item.json.passed ? 100 : 50,
  $('Readability Checker').item.json.passed ? 100 : 50,
  $('Meta Description Checker').item.json.passed ? 100 : 0,
  $('Internal Links Checker').item.json.passed ? 100 : 50,
  $('FAQ Schema Checker').item.json.passed ? 100 : 50
];

const overallScore = checks.reduce((sum, score) => sum + score, 0) / checks.length;

return {
  overall_score: Math.round(overallScore),
  person_first_language_score: $('Person-First Language Checker').item.json.person_first_language_score,
  keyword_density: $('Keyword Density Checker').item.json.keyword_density,
  local_seo_mentions: $('Local SEO Checker').item.json.local_seo_mentions,
  readability_grade: $('Readability Checker').item.json.readability_grade,
  meta_description_length: $('Meta Description Checker').item.json.meta_description_length,
  internal_links_count: $('Internal Links Checker').item.json.internal_links_count,
  faq_schema_present: $('FAQ Schema Checker').item.json.faq_schema_present,
  violations: $('Person-First Language Checker').item.json.violations,
  passed: overallScore >= 70
};
```

---

## Testing & Deployment

### Phase 1: Manual Testing (Week 1)

1. **Create test article in Google Sheet:**
   - Topic: "Understanding Your NDIS Plan"
   - Primary Keyword: "NDIS plan Shepparton"
   - CTA Type: "Free Consultation"
   - Completed: FALSE

2. **Run workflow manually:**
   - Click "Execute Workflow" button
   - Monitor each node execution
   - Verify outputs at each step

3. **Validation checklist:**
   - [ ] Google Sheets connection successful
   - [ ] Content Structure Planner generates valid JSON
   - [ ] Content Writer produces 800-1500 word article
   - [ ] Person-first language score >95%
   - [ ] Shepparton mentioned 3-5 times
   - [ ] SEO validation passes (overall score >70%)
   - [ ] Stock image fetched and relevant
   - [ ] Article published to `/src/data/blog-posts.json`
   - [ ] Google Sheets updated with metadata
   - [ ] No errors in execution log

### Phase 2: Pilot with Human Review (Week 2-3)

1. **Enable Slack approval node**
2. **Generate 10 test articles** (1 per day)
3. **Review each article for:**
   - NDIS compliance
   - Person-first language
   - Brand voice consistency
   - SEO quality

4. **Iterate prompts based on feedback**

### Phase 3: Production Deployment (Week 4+)

1. **Disable Slack approval** (for low-risk topics)
2. **Scale to 2-3 articles per week**
3. **Monitor metrics:**
   - Error rate (<5%)
   - SEO scores (>75% average)
   - Blog traffic growth
   - Lead generation attribution

---

## Monitoring & Maintenance

### Daily Checks
- Review n8n execution log for errors
- Verify blog posts published correctly
- Check Slack notifications

### Weekly Checks
- Audit 2-3 random articles for quality
- Track SEO rankings in Google Search Console
- Review GA4 custom events (blog_published)

### Monthly Checks
- A/B test different Content Writer prompts
- Update banned phrases list (person-first language)
- Refine SEO validation thresholds
- Review cost (API usage)

### Quarterly Audits
- External NDIS compliance review (10 random articles)
- Update Content Writer prompt with winning patterns
- Expand content clusters based on performance
- Analyze ROI (leads → clients → revenue)

---

## Troubleshooting

### Error: "Content Writer returned empty output"

**Causes:**
- Anthropic API rate limit hit
- System prompt too long (>8000 tokens)
- Invalid JSON in response

**Solutions:**
- Check API usage at https://console.anthropic.com
- Reduce prompt length
- Add retry logic (max 2 attempts)

### Error: "SEO validation failed consistently"

**Causes:**
- Quality thresholds too strict
- Content Writer not following instructions

**Solutions:**
- Lower threshold in "Is it Good Enough?" node (e.g., 60% instead of 70%)
- Add more examples to Content Writer prompt
- Simplify validation criteria

### Error: "Stock photo not relevant to article"

**Causes:**
- Image Prompt Engineer query too vague
- Limited disability representation in stock libraries

**Solutions:**
- Refine prompt engineering prompt with specific examples
- Use multiple stock photo APIs (Pexels + Unsplash + Getty)
- Build internal photo library with model releases

---

## Cost Optimization

### Current Monthly Cost: $23-26

**Breakdown:**
- n8n Cloud: $20/month
- Anthropic Claude: $3-5/month (~10-12 articles)
- OpenAI GPT-4 Mini: $0.50/month
- Pexels API: Free
- Google Sheets API: Free
- Slack: Free

### Cost Reduction Strategies:

1. **Self-host n8n** (save $20/month, requires DevOps)
2. **Use smaller models** for simple tasks:
   - Claude Haiku for Content Structure Planner ✅
   - GPT-4 Mini for Image Prompting ✅
3. **Batch processing** (2-3 articles at once, reduce cold starts)
4. **Cache common validations** (reuse SEO checks across articles)

---

## Next Steps

1. ✅ Import workflow JSON into n8n
2. ✅ Configure API credentials
3. ✅ Create NDIS SEO Validator sub-workflow
4. ✅ Test with 3 sample articles
5. ✅ Enable human review (Slack approval)
6. ✅ Generate first 20 production articles
7. ✅ Disable approval after consistency proven
8. ✅ Scale to 2-3 articles/week
9. ✅ Monitor metrics and iterate

**Total Setup Time:** 4-6 hours  
**Expected ROI:** 294:1 (based on lead generation projections)  
**Time Saved:** 80-90% vs manual content creation

---

**Last Updated:** December 2, 2025  
**Version:** 1.0.0
