import "dotenv/config";

const ACCESS_TOKEN = process.env.LINKEDIN_ACCESS_TOKEN;
const COMPANY_ID = process.env.LINKEDIN_COMPANY_ID;
const BASE_URL = "https://bitsolmarketing.com/blog";

const cards = [
  {
    slug: "conversiq-whatsapp-ai-chatbot-pakistan-review-2026",
    title: "Conversiq Review 2026: The Best WhatsApp AI Chatbot for Pakistani Businesses",
    description:
      "An in-depth review of Conversiq — BITSOL Marketing's AI-powered WhatsApp chatbot built for Pakistani businesses. Supports English, Urdu & Roman Urdu.",
    commentary: `🤖 We built something that changes how Pakistani businesses talk to their customers.

Introducing Conversiq — an AI-powered WhatsApp chatbot that handles inquiries, qualifies leads, and books appointments automatically.

✅ 24/7 availability — never miss a lead again
✅ Speaks English, Urdu & Roman Urdu
✅ One-time setup: PKR 20,000 only
✅ 99.9% uptime guaranteed
✅ Try it now: +92 312 0141581

Read our full 2026 review 👇

#Conversiq #WhatsAppChatbot #AIChatbot #PakistanBusiness #BITSOL #ChatbotPakistan #WhatsAppAutomation`,
  },
  {
    slug: "conversiq-whatsapp-chatbot-lead-generation-300-percent-more-leads",
    title: "How a WhatsApp AI Chatbot Generates 300% More Leads: The Conversiq Advantage",
    description:
      "Discover how Conversiq's AI chatbot is helping Pakistani businesses generate 300% more leads through intelligent WhatsApp automation and instant responses.",
    commentary: `📈 What if your business could generate 300% more leads — without hiring extra staff?

That's exactly what Conversiq is doing for Pakistani businesses.

Our AI WhatsApp chatbot responds instantly, qualifies every lead, and books appointments — all on autopilot.

🔑 Key results our clients are seeing:
→ 3x more leads captured
→ 80% reduction in response time
→ PKR 20,000 one-time investment pays back in weeks

See how it works 👇

#LeadGeneration #WhatsAppMarketing #ConversiqAI #PakistanStartups #MarketingAutomation #BITSOL #ChatbotLeads`,
  },
  {
    slug: "conversiq-whatsapp-chatbot-ecommerce-pakistan-automate-orders-boost-sales",
    title: "WhatsApp Chatbot for E-Commerce Pakistan 2026: How Conversiq Automates Orders & Boosts Sales",
    description:
      "Learn how Pakistani e-commerce businesses are using Conversiq to automate order tracking, answer FAQs, and recover abandoned carts on WhatsApp.",
    commentary: `🛒 Pakistani e-commerce brands — are you still answering every WhatsApp message manually?

There's a smarter way.

Conversiq automates your entire WhatsApp customer journey:
📦 Order confirmations & tracking
❓ Instant FAQ responses
🔄 Abandoned cart recovery
💳 COD confirmation & upselling

All without lifting a finger.

One-time setup: PKR 20,000 → starts paying back from day one.

Read the full case study 👇

#EcommercePakistan #WhatsAppShopping #OrderAutomation #ConversiqChatbot #OnlineBusinessPakistan #BITSOL #WhatsAppBot`,
  },
  {
    slug: "conversiq-whatsapp-chatbot-vs-human-customer-service-pakistan-2026",
    title: "WhatsApp Chatbot vs Human Customer Service: Which Wins for Pakistani Businesses in 2026?",
    description:
      "A detailed comparison of AI WhatsApp chatbots vs human agents for Pakistani businesses — response time, cost, scalability, and customer satisfaction.",
    commentary: `🤔 Should you hire more customer service staff — or get an AI chatbot?

We broke down the numbers for Pakistani businesses in 2026:

👤 Human Agent: PKR 30,000+/month, 9-5 hours only, handles ~100 chats/day
🤖 Conversiq AI: PKR 20,000 one-time, 24/7/365, unlimited concurrent chats

The math is clear. And the customer experience? Actually better with AI for instant responses.

See the full comparison 👇

#CustomerService #AIvHuman #WhatsAppChatbot #ConversiqPakistan #BusinessAutomation #BITSOL #PakistaniBusinesses`,
  },
  {
    slug: "conversiq-best-whatsapp-chatbot-real-estate-clinics-service-businesses-pakistan",
    title: "Best WhatsApp Chatbot for Real Estate, Clinics, and Service Businesses in Pakistan",
    description:
      "Conversiq is the go-to WhatsApp AI chatbot for real estate agents, medical clinics, and service businesses in Pakistan. Automate bookings and lead capture today.",
    commentary: `🏠🏥🔧 Real estate agents, clinics, restaurants, and service businesses — Conversiq was built for you.

Whether you're booking property viewings, confirming patient appointments, or taking service orders — Conversiq handles it all on WhatsApp automatically.

Industry-specific features:
🏡 Real Estate: Auto-qualify buyer leads, schedule site visits
🏥 Clinics: Book appointments, send reminders, share health tips
🍽️ Restaurants: Take reservations, share menus, confirm orders
🔧 Services: Quote requests, job booking, follow-ups

One chatbot. Every industry. PKR 20,000 to get started.

Try it: +92 312 0141581

#RealEstatePakistan #ClinicManagement #ServiceBusiness #ConversiqChatbot #WhatsAppAutomation #BITSOL #PakistanEntrepreneur`,
  },
];

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

async function delay(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

const startIdx = (() => {
  const flag = process.argv.indexOf("--start");
  return flag !== -1 ? parseInt(process.argv[flag + 1], 10) - 1 : 0;
})();

console.log("BITSOL — Posting 5 Conversiq Article Cards to LinkedIn\n");

let posted = 0;
let failed = 0;

for (let i = startIdx; i < cards.length; i++) {
  const card = cards[i];
  process.stdout.write(`[${i + 1}/${cards.length}] ${card.title.slice(0, 60)}... `);

  try {
    const res = await postArticleCard(card);
    const body = await res.json().catch(() => ({}));

    if (res.ok) {
      posted++;
      console.log(`✅  Posted`);
    } else {
      failed++;
      console.log(`❌  HTTP ${res.status}: ${JSON.stringify(body).slice(0, 120)}`);
    }
  } catch (err) {
    failed++;
    console.log(`❌  Error: ${err.message}`);
  }

  if (i < cards.length - 1) await delay(5000);
}

console.log(`\n── Summary ${"─".repeat(36)}`);
console.log(`Posted : ${posted}`);
console.log(`Failed : ${failed}`);
console.log(`View LinkedIn → https://www.linkedin.com/company/${COMPANY_ID}/posts/`);
