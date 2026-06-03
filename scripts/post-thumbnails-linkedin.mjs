/**
 * BITSOL MARKETING — LinkedIn Article Card Publisher
 *
 * Posts all 20 trending articles as LinkedIn article link cards,
 * each showing: thumbnail image + title + short description + link.
 *
 * Run:      node scripts/post-thumbnails-linkedin.mjs
 * Dry run:  node scripts/post-thumbnails-linkedin.mjs --dry-run
 * Start at: node scripts/post-thumbnails-linkedin.mjs --start 5
 */

import { readFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const args = process.argv.slice(2);
const DRY_RUN = args.includes("--dry-run");
const startIndex = (() => {
  const i = args.indexOf("--start");
  return i !== -1 ? Math.max(0, parseInt(args[i + 1], 10) - 1) : 0;
})();

try {
  const env = readFileSync(join(__dirname, "../.env"), "utf8");
  env.split("\n").forEach((line) => {
    const [k, ...v] = line.split("=");
    if (k?.trim() && v.length) process.env[k.trim()] = v.join("=").trim().replace(/^"|"$/g, "");
  });
} catch {}

const ACCESS_TOKEN = process.env.LINKEDIN_ACCESS_TOKEN || "";
const COMPANY_ID   = process.env.LINKEDIN_COMPANY_ID   || "";
const BASE_URL     = "https://bitsolmarketing.com/blog";
const DELAY_MS     = 5000; // 5 s between posts — safely within LinkedIn rate limits

if (!DRY_RUN && (!ACCESS_TOKEN || !COMPANY_ID)) {
  console.error("❌  LINKEDIN_ACCESS_TOKEN and LINKEDIN_COMPANY_ID must be set in .env");
  process.exit(1);
}

// ─── Article Cards ────────────────────────────────────────────────────────────
// Each card has:
//   commentary  — the short caption displayed above the link card
//   title       — article title (shown on the card)
//   description — excerpt shown on the card preview
//   slug        — path under /blog/
//   image       — thumbnail shown on the card
const cards = [
  {
    slug: "google-ai-search-revolution-2026-business-guide",
    image: "https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?w=1200&q=80",
    title: "Google AI Search Revolution 2026: What Every Business Owner Must Know Right Now",
    description: "Google just announced the biggest change to search in 25 years. Here's exactly what it means for your business visibility, organic traffic, and what to do about it — now.",
    commentary: `🔍 Google just changed search forever.

The search bar is being "completely reimagined with AI" — the biggest shift in 25 years.

AI Overviews now answer queries directly. If your website isn't being cited inside those answers, you're invisible to a growing share of searchers.

Read our complete breakdown of what changed, who it affects most, and the exact steps to adapt your strategy this week.

👇 Click to read the full guide.

#GoogleAI #SEO2026 #DigitalMarketing #BusinessStrategy #AISearch #BITSOL`,
  },
  {
    slug: "agentic-ai-2026-autonomous-agents-replacing-business-departments",
    image: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=1200&q=80",
    title: "Agentic AI 2026: How Autonomous AI Agents Are Replacing Business Departments",
    description: "Agentic AI systems set goals, plan multi-step actions, use tools, and execute entire workflows autonomously. IBM, PwC, and MIT Sloan all call this the defining business technology trend of 2026.",
    commentary: `🤖 AI agents don't wait for instructions anymore.

They set goals, break them into steps, use tools, and execute entire workflows — autonomously.

Real cost comparison:
→ Customer support team: PKR 120,000/month
→ AI agent equivalent: PKR 15,000–30,000/month

The 6 business functions being transformed — and the 3-step roadmap to get started — are in the full guide.

👇 Read it here.

#AgenticAI #AIAutomation #BusinessAI #DigitalTransformation #BITSOL`,
  },
  {
    slug: "rank-google-ai-overviews-seo-playbook-2026",
    image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=1200&q=80",
    title: "How to Rank in Google AI Overviews: The New SEO Playbook for 2026",
    description: "Google AI Overviews now appear above all traditional organic results and cite 3–6 sources inline. Being one of those cited sources is worth more than ranking #1.",
    commentary: `📈 Getting cited in Google AI Overviews is the new #1 ranking.

AI Overviews sit above every traditional search result. They cite 3–6 sources. If your content isn't one of them, users may never scroll down to find you.

Our 7-step playbook covers:
→ The 5 signals Google's AI uses to choose what to cite
→ How to restructure your content to earn citations
→ The FAQ schema setup that takes 30 minutes and immediately improves chances

👇 Full guide inside.

#SEO2026 #GoogleAIOverviews #ContentStrategy #SearchMarketing #BITSOL`,
  },
  {
    slug: "meta-ai-business-assistant-2026-cut-ad-costs-scale-results",
    image: "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=1200&q=80",
    title: "Meta AI Business Assistant 2026: How to Use It to Cut Ad Costs and Scale Results",
    description: "Meta's AI Business Assistant is now available to all advertisers. Combined with Advantage+ tools, it's fundamentally changing how Meta campaigns should be structured and managed.",
    commentary: `💡 Meta's AI is available to every advertiser in 2026.

The businesses winning on Meta have figured out one thing: work WITH the algorithm, not against it.

Old approach: 20+ ad sets, tight targeting, constant manual edits.
New approach: 1–2 campaigns, 5–10 creative variations, let AI find who converts, don't touch for 7 days.

The complete strategy — campaign structure, creative approach, budget scaling — is in our guide.

👇 Read it here.

#MetaAds #FacebookAds #ROAS #AIMarketing #PaidSocial #BITSOL`,
  },
  {
    slug: "social-commerce-2026-tiktok-instagram-whatsapp-ecommerce",
    image: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1200&q=80",
    title: "Social Commerce 2026: How TikTok Shop, Instagram & WhatsApp Are Replacing E-Commerce",
    description: "Social commerce is no longer experimental. Customers now discover, evaluate, and buy without ever leaving their social app. Here's the complete strategy for discovery-to-purchase social selling.",
    commentary: `🛒 Your customers are buying inside social apps — not websites.

TikTok Shop. Instagram Shopping. WhatsApp Commerce.

The full purchase journey — discover → evaluate → buy → review — now happens without a single website visit.

TikTok is Pakistan's 5th largest market globally. WhatsApp has a 98% message open rate. Instagram reaches your premium buyers.

Our complete social commerce playbook for Pakistani businesses — 3-month launch roadmap, platform comparison, and what actually sells — is live.

👇 Read it.

#SocialCommerce #TikTokShop #WhatsApp #EcommercePakistan #BITSOL`,
  },
  {
    slug: "short-form-video-strategy-2026-business-growth-engine",
    image: "https://images.unsplash.com/photo-1536240478700-b869ad10a2eb?w=1200&q=80",
    title: "Short-Form Video Strategy 2026: From Disposable Content to Business Growth Engine",
    description: "Most businesses create short-form video that gets views but drives zero business results. Here is the content matrix and hook strategy that turns 30-second videos into a lead generation machine.",
    commentary: `📱 Getting views is easy. Getting leads from short-form video is a skill.

Most business accounts have the same problem: content that performs in analytics and disappears from the pipeline.

The fix: a content matrix that's 40% educational, 30% authentic behind-the-scenes, 30% engagement — with hooks designed for the 1.5-second attention window.

Full strategy guide including platform-specific tactics for TikTok, Reels, and YouTube Shorts is now live on our blog.

👇 Read it.

#ShortFormVideo #TikTok #InstagramReels #VideoMarketing #ContentStrategy #BITSOL`,
  },
  {
    slug: "multimodal-ai-business-marketing-2026",
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=1200&q=80",
    title: "Multimodal AI for Business 2026: How Text, Image, Audio & Video AI Are Transforming Marketing",
    description: "AI now understands text, images, audio, and video simultaneously. This multimodal capability is creating entirely new possibilities for marketing, content creation, and customer experience in 2026.",
    commentary: `🧠 AI in 2026 doesn't just read text.

It understands text + images + audio + video — simultaneously.

What this makes possible for your marketing team:
→ Product descriptions generated from photos alone
→ A 30-minute interview → transcript + 5 video clips + LinkedIn article + Twitter thread in minutes
→ Competitor ad analysis from screenshots, not manual research
→ Sales call review at scale — every call, automatically

6 multimodal AI applications transforming marketing — with tools and implementation guidance — are in our latest guide.

👇 Read it here.

#MultimodalAI #AIMarketing #BusinessAI #ContentCreation #BITSOL`,
  },
  {
    slug: "ai-powered-lead-generation-pakistan-2026-complete-playbook",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80",
    title: "AI-Powered Lead Generation Pakistan 2026: The Complete Playbook",
    description: "The businesses generating the most qualified leads in Pakistan in 2026 are not those with the biggest budgets — they are the ones with AI-powered systems that respond instantly, capture 100% of inquiries, and qualify automatically.",
    commentary: `🇵🇰 The lead generation game in Pakistan has changed.

78% of sales go to the first business that responds.
Most businesses respond in hours. AI responds in 90 seconds — 24/7.

The complete AI lead generation system:
→ Layer 1: Zero-missed-inquiry capture (website, WhatsApp, Instagram, Facebook)
→ Layer 2: Automated 4-question qualification
→ Layer 3: Nurture sequences for "not yet" leads
→ Layer 4: Multi-channel cost comparison (Google vs Meta vs SEO vs WhatsApp referrals)
→ Layer 5: AI-powered ROI reporting

Full playbook is live on our blog.

👇 Read it here.

#LeadGeneration #PakistanBusiness #AIMarketing #SalesAutomation #BITSOL`,
  },
  {
    slug: "chatgpt-business-operations-2026-practical-use-cases",
    image: "https://images.unsplash.com/photo-1655720828018-edd2daec9349?w=1200&q=80",
    title: "ChatGPT for Business Operations 2026: 20 Practical Use Cases That Actually Save Time",
    description: "Most businesses use ChatGPT to write emails. Here are 20 specific business use cases — across marketing, sales, operations, HR, and finance — that save 10–30 hours per week.",
    commentary: `⚡ Most businesses use ChatGPT to write emails.

That's using a Formula 1 car as a golf cart.

Here are 20 specific business use cases that actually save time:

Marketing: social media calendars, 20 ad copy variations, SEO blog drafts, email sequences, competitor analysis
Sales: customized proposals, complaint scripts, FAQ content, qualification flows, onboarding docs
Operations: job descriptions, meeting minutes with action items, SOPs, performance reviews, contract drafts
Finance & Strategy: business plan sections, financial report interpretation, pricing strategy, market research summaries, weekly review automation

Full guide with prompting approach for each:

👇 Read it here.

#ChatGPT #AIProductivity #BusinessAutomation #AITools #BITSOL`,
  },
  {
    slug: "ai-sovereignty-business-2026-own-your-data",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200&q=80",
    title: "AI Sovereignty for Business 2026: Own Your AI Data Before Big Tech Owns You",
    description: "93% of executives say AI sovereignty is mission-critical in 2026. Here is what it means for your business and how to build an AI stack you actually own, control, and can audit.",
    commentary: `🔐 93% of executives say AI sovereignty is mission-critical in 2026.

Most businesses are building their entire AI capability on infrastructure they don't own, can't audit, and can't control.

What happens when the pricing changes? The terms change? The service goes down?

AI sovereignty = your ability to govern AI systems, data, and infrastructure without depending on Big Tech.

Open-source models (Llama 3.3, Mistral, DeepSeek) now make this accessible at PKR 15,000–50,000/month — with full control over your data.

4-phase implementation roadmap inside:

👇 Read the full guide.

#AISovereignty #DataPrivacy #OpenSourceAI #BusinessStrategy #BITSOL`,
  },
  {
    slug: "whatsapp-business-api-2026-complete-setup-guide-pakistan",
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=1200&q=80",
    title: "WhatsApp Business API 2026: Complete Setup Guide for Pakistani Businesses",
    description: "WhatsApp Business API unlocks automated messaging, chatbots, broadcast to unlimited opted-in contacts, and CRM integration. This complete guide covers setup, costs, compliance, and use cases for Pakistan.",
    commentary: `📲 WhatsApp Business App vs WhatsApp Business API — most Pakistani businesses are using the wrong one.

The free App limits you to 256 broadcast contacts, 1 device, and basic quick replies.

The API (PKR 20,000–25,000/month) gives you:
→ Unlimited broadcasts to opted-in contacts
→ AI chatbot + full automation
→ Unlimited agents with a shared inbox
→ Complete CRM integration
→ 24/7 instant response

2 customer service agents cost PKR 120,000/month.
The API delivers more — for PKR 20,000–25,000/month.

Complete setup guide for Pakistan — BSP comparison, step-by-step setup, compliance rules, and 7 high-impact use cases:

👇 Read it here.

#WhatsAppBusiness #WhatsAppAPI #BusinessAutomation #PakistanBusiness #CustomerService #BITSOL`,
  },
  {
    slug: "email-marketing-ai-era-2026-high-open-rates-strategy",
    image: "https://images.unsplash.com/photo-1596526131083-e8c633964948?w=1200&q=80",
    title: "Email Marketing in the AI Era 2026: How to Get 40%+ Open Rates",
    description: "AI-powered inbox filters are now deciding which emails deserve your attention. Here is the strategy for getting your emails opened, read, and acted on — even in AI-filtered inboxes.",
    commentary: `📧 Email still delivers $36–42 ROI for every $1 spent.

But in 2026, AI inbox filters (Google AI Tabs, Apple Mail AI, Outlook Copilot) decide which emails you see before you even open the app.

Generic mass emails → promotions folder.
Relevant, personalized, properly delivered emails → opened and clicked.

The subject line formulas getting 40%+ open rates — with real examples — plus the 4-email welcome sequence that converts new subscribers into clients, are in our latest guide.

👇 Read it here.

#EmailMarketing #MarketingAutomation #EmailStrategy #DigitalMarketing #BITSOL`,
  },
  {
    slug: "ai-powered-customer-retention-2026-reduce-churn-increase-ltv",
    image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=1200&q=80",
    title: "AI-Powered Customer Retention 2026: Keep More Customers Without a Bigger Team",
    description: "Retaining a customer costs 5x less than acquiring a new one. AI now makes world-class retention strategies available to every business — here is the complete 2026 playbook with ROI calculations.",
    commentary: `📊 Increasing retention by 5% increases profits by 25–95%.

Yet most businesses spend 80% of marketing on acquisition and almost nothing on keeping the customers they already have.

The real reason 68% of customers leave: they feel the business doesn't care about them.

AI makes precision retention possible at scale:
→ Churn prediction (AI flags at-risk customers before they leave)
→ Automated milestone acknowledgment
→ Proactive success outreach schedule
→ Personalized re-engagement sequences
→ Loyalty and referral automation at the right moment

ROI example: reducing churn by 50% = PKR 3,600,000+/year saved for a 100-client business.

Full playbook inside:

👇 Read it here.

#CustomerRetention #ChurnReduction #CustomerLTV #AIMarketing #BusinessGrowth #BITSOL`,
  },
  {
    slug: "pakistan-ecommerce-2026-complete-growth-strategy-online-stores",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&q=80",
    title: "Pakistan E-Commerce 2026: The Complete Growth Strategy for Online Stores",
    description: "Pakistan's e-commerce market is growing at 35% annually. Yet most online stores aren't profitable. Here is the complete strategy — platform, payments, logistics, marketing, and unit economics.",
    commentary: `🛍️ Pakistan's e-commerce market crossed PKR 500 billion in 2025.

But most Pakistani online stores are not profitable.

They're generating orders while losing money on every sale — then scaling their losses by spending more on ads.

The unit economics that separate profitable from unprofitable:
✅ Gross margin: minimum 50–60%
✅ COD return rate: below 25% (industry average: 30–40%)
✅ LTV:CAC ratio: minimum 3:1

The complete 2026 strategy — marketplace vs DTC, JazzCash/EasyPaisa integration, logistics, COD return reduction, and the marketing funnel — is now live.

👇 Read it here.

#PakistanEcommerce #OnlineBusiness #Daraz #DigitalCommerce #BITSOL`,
  },
  {
    slug: "digital-marketing-roi-2026-measure-maximize-results",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80",
    title: "Digital Marketing ROI in 2026: Measure Every Rupee and Maximize What Works",
    description: "Most businesses cannot tell you which marketing channel is actually generating revenue. This measurement framework fixes that — and consistently doubles marketing efficiency within 90 days.",
    commentary: `📉 Can you answer this question right now?

"Which of your marketing channels generated the most revenue last month?"

Not the most clicks. Not where you spent the most. Which one actually put money in your account.

If you can't answer confidently — you're flying blind with your budget.

The 5-layer measurement system that fixes this:
→ UTM parameters on every link
→ GA4 with proper conversion events
→ CRM-based revenue attribution
→ WhatsApp and phone tracking
→ Unified reporting dashboard

Plus: how to calculate your Marketing Efficiency Ratio (MER) and the monthly review questions that tell you exactly where to cut and where to double down.

👇 Full guide here.

#MarketingROI #DigitalAnalytics #DataDriven #MarketingMeasurement #BITSOL`,
  },
  {
    slug: "google-analytics-4-ga4-guide-pakistani-businesses-2026",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80",
    title: "Google Analytics 4 (GA4) Complete Guide for Pakistani Businesses 2026",
    description: "GA4 is the only version of Google Analytics available. Most Pakistani businesses have it installed but aren't using it correctly. This guide gives you the complete setup, configuration, and reporting system.",
    commentary: `📊 GA4 is the only Google Analytics available in 2026.

Most Pakistani businesses have it installed. Almost none are configured correctly.

The result: they're making budget decisions on incomplete and misleading data.

A correctly configured GA4 tells you:
→ Which channels generate revenue (not just traffic)
→ Where customers drop out of your funnel
→ Which landing pages convert and which cost you leads
→ Your most valuable audience segments and where to find more

Complete setup checklist, 5 must-review weekly reports, and the most common mistakes that corrupt your data — all in the guide.

👇 Read it here.

#GA4 #GoogleAnalytics #WebAnalytics #MarketingData #DigitalMarketing #BITSOL`,
  },
  {
    slug: "ai-content-marketing-2026-human-ai-workflow-beats-penalties",
    image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1200&q=80",
    title: "AI Content Marketing 2026: The Human-AI Workflow That Beats Algorithm Penalties",
    description: "Businesses that dumped raw AI content on their blogs are now paying with lost traffic. But the businesses avoiding AI entirely are overwhelmed. Here is the balanced workflow that scales output without penalty.",
    commentary: `✍️ AI content penalties and content overwhelm — businesses are stuck between two problems.

Use AI without the human layer → Google Helpful Content demotes you.
Avoid AI entirely → you're outpaced by those who use it correctly.

The answer: the Human-AI Content Framework.

Phase 1: Human strategy (non-delegatable)
Phase 2: AI-assisted research (2 days → 45 minutes)
Phase 3: Human data injection — the step most businesses skip (and why this is the difference between ranking and penalty)
Phase 4: AI-assisted drafting from a rich brief
Phase 5: Human review and voice injection

Output: 8–12 comprehensive posts/month from one content producer. Quality that ranks.

👇 Full workflow guide with prompting framework inside.

#AIContentMarketing #ContentStrategy #GoogleHelpfulContent #ContentCreation #BITSOL`,
  },
  {
    slug: "linkedin-ads-pakistan-2026-b2b-lead-generation-strategy",
    image: "https://images.unsplash.com/photo-1611944212129-29977ae1398c?w=1200&q=80",
    title: "LinkedIn Ads Pakistan 2026: The B2B Lead Generation Strategy That Actually Works",
    description: "LinkedIn Ads are expensive if you run them wrong. Here is the complete B2B strategy for Pakistani businesses — targeting, campaign structure, Thought Leader Ads, Lead Gen Forms, and measurement.",
    commentary: `💼 LinkedIn Ads are "too expensive" — only if you're running them wrong.

The math changes when you measure cost per QUALIFIED lead.

A decision-maker at a target company is worth 3–5x a broad Meta lead. When you factor in close rates, LinkedIn often wins.

What works in Pakistan B2B in 2026:

→ Thought Leader Ads (sponsor a CEO's personal post — 2–3x better CTR than company page ads)
→ Lead Gen Forms (pre-filled from LinkedIn profiles — 3–5x higher conversion than landing pages)
→ Document Ads (readers get a preview → must submit form to download — excellent for lead capture)
→ Company List Targeting (upload a list of your 50 dream clients and target only their employees)

Budget guide and full campaign structure inside:

👇 Read it here.

#LinkedInAds #B2BMarketing #LinkedInLeadGeneration #PakistanB2B #BITSOL`,
  },
  {
    slug: "voice-search-optimization-2026-conversational-discovery-strategy",
    image: "https://images.unsplash.com/photo-1589492477829-5e65395b66cc?w=1200&q=80",
    title: "Voice Search Optimization 2026: Preparing for Conversational Discovery",
    description: "Voice search and AI assistants now account for 50%+ of searches in Pakistan. Here is how to optimize your content and local presence to be found in voice-first and AI-assistant discovery.",
    commentary: `🗣️ More than 50% of searches in Pakistan now happen through voice.

Google Assistant. Siri. And increasingly: ChatGPT and Gemini.

How people type vs how they speak:
Typed: "digital marketing agency Karachi"
Voice: "Hey Google, which digital marketing agency in Karachi is best for small businesses?"

Voice queries are 6–10 words, almost always phrased as questions, and heavily local.

5 optimization strategies that capture voice search traffic — including the featured snippet tactic that takes 30 minutes and can put you in Position Zero — are in our latest guide.

👇 Read it here.

#VoiceSearch #SEO2026 #ConversationalSearch #LocalSEO #DigitalMarketing #BITSOL`,
  },
  {
    slug: "digital-transformation-pakistani-smes-2026-90-day-roadmap",
    image: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=1200&q=80",
    title: "Digital Transformation for Pakistani SMEs 2026: A 90-Day Roadmap That Works",
    description: "Digital transformation does not require a massive budget or IT team. This 90-day roadmap gives Pakistani SMEs a phased, budget-realistic approach to modernizing operations and marketing with measurable ROI.",
    commentary: `🗺️ Digital transformation for Pakistani SMEs — done in 90 days, in phases, with a realistic budget.

Month 1 — Foundation:
→ Website speed + mobile + WhatsApp button audit
→ WhatsApp Business complete setup (catalog, automation, quick replies)
→ 30-day content calendar with AI-assisted batch creation
→ Lead tracking system and "How did you hear about us?" in every first conversation

Month 2 — Marketing Activation:
→ Meta Ads: PKR 30,000–60,000 testing budget, 3 creatives, 7-day minimum before reviewing
→ SEO: top 10 keywords, optimized service pages, 2 blog articles

Month 3 — Automation and Optimization:
→ Implement your ONE highest-volume automation
→ 60-day data review: double down on what's working, cut what isn't

Realistic 90-day budget: PKR 25,000–95,000 total (Month 1), scaling from there.

Full checklist and budget breakdown inside:

👇 Read it here.

#DigitalTransformation #PakistanBusiness #SMEPakistan #DigitalMarketing #BusinessGrowth #BITSOL`,
  },
];

// ─── LinkedIn API — Article Link Share ───────────────────────────────────────
async function postArticleCard(card) {
  const articleUrl = `${BASE_URL}/${card.slug}`;
  const res = await fetch("https://api.linkedin.com/v2/ugcPosts", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${ACCESS_TOKEN}`,
      "Content-Type": "application/json",
      "X-Restli-Protocol-Version": "2.0.0",
    },
    body: JSON.stringify({
      author: `urn:li:organization:${COMPANY_ID}`,
      lifecycleState: "PUBLISHED",
      specificContent: {
        "com.linkedin.ugc.ShareContent": {
          shareCommentary: { text: card.commentary },
          shareMediaCategory: "ARTICLE",
          media: [
            {
              status: "READY",
              originalUrl: articleUrl,
              title: { text: card.title },
              description: { text: card.description },
            },
          ],
        },
      },
      visibility: {
        "com.linkedin.ugc.MemberNetworkVisibility": "PUBLIC",
      },
    }),
  });
  return res;
}

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

async function run() {
  const subset = cards.slice(startIndex);
  const totalLabel = startIndex > 0
    ? `cards #${startIndex + 1}–${cards.length}`
    : `all ${cards.length} article cards`;

  console.log(`\nBITSOL — LinkedIn Article Card Publisher`);
  console.log(`Mode   : ${DRY_RUN ? "DRY RUN (nothing posted)" : "LIVE"}`);
  console.log(`Target : ${totalLabel}`);
  console.log(`Company: urn:li:organization:${DRY_RUN ? "***" : COMPANY_ID}\n`);

  let success = 0, failed = 0;

  for (let i = 0; i < subset.length; i++) {
    const card = subset[i];
    const num  = startIndex + i + 1;
    const url  = `${BASE_URL}/${card.slug}`;

    if (DRY_RUN) {
      console.log(`\n── Card ${num}/${cards.length} ─────────────────────────────────`);
      console.log(`Title      : ${card.title}`);
      console.log(`URL        : ${url}`);
      console.log(`Description: ${card.description.slice(0, 80)}…`);
      console.log(`Commentary :\n${card.commentary.slice(0, 120)}…`);
      console.log(`[${card.commentary.length} chars total]`);
      continue;
    }

    process.stdout.write(`[${num}/${cards.length}] ${card.title.slice(0, 55)}... `);

    try {
      const res = await postArticleCard(card);

      if (res.status === 201) {
        const id = res.headers.get("x-restli-id") || res.headers.get("location") || "";
        console.log(`✅  Posted`);
        if (id) console.log(`     ID: ${id}`);
        success++;
      } else {
        const body = await res.text();
        console.log(`❌  HTTP ${res.status}: ${body.slice(0, 120)}`);
        failed++;
      }
    } catch (err) {
      console.log(`❌  ${err.message}`);
      failed++;
    }

    if (i < subset.length - 1) await sleep(DELAY_MS);
  }

  if (!DRY_RUN) {
    console.log(`\n── Summary ───────────────────────────────`);
    console.log(`Posted : ${success}`);
    console.log(`Failed : ${failed}`);
    console.log(`──────────────────────────────────────────`);
    if (failed > 0) {
      console.log(`Retry from failure: --start <post number>`);
    }
    console.log(`\nView posts → https://www.linkedin.com/company/${COMPANY_ID}/posts/\n`);
  }
}

run().catch(e => { console.error(e); process.exit(1); });
