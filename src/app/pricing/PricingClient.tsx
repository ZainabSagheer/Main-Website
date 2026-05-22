"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Zap, Rocket, Building2, ArrowRight, HelpCircle, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GlowingCard } from "@/components/ui/glowing-card";
import Link from "next/link";

const plans = [
  {
    name: "Starter",
    icon: Zap,
    price: "$500",
    period: "/month",
    desc: "For startups and small businesses ready to go digital with AI.",
    color: "#06b6d4",
    bg: "rgba(6,182,212,0.1)",
    popular: false,
    features: [
      "AI-powered SEO audit & on-page optimisation",
      "2× social media channels managed",
      "Meta Ads setup & management (up to $1k ad spend)",
      "Monthly analytics report",
      "1 landing page / content update",
      "WhatsApp Business integration",
      "Email support (48-hr response)",
    ],
  },
  {
    name: "Growth",
    icon: Rocket,
    price: "$1,500",
    period: "/month",
    desc: "Full-stack AI marketing for businesses scaling fast.",
    color: "#a855f7",
    bg: "rgba(168,85,247,0.1)",
    popular: true,
    features: [
      "Everything in Starter",
      "Advanced SEO — technical, off-page & link building",
      "Google Ads + Meta Ads (up to $5k ad spend)",
      "AI chatbot development (WhatsApp / web)",
      "Automated lead-nurturing workflows",
      "Monthly blog content (4 posts)",
      "Bi-weekly strategy calls",
      "Priority support (24-hr response)",
    ],
  },
  {
    name: "Enterprise",
    icon: Building2,
    price: "Custom",
    period: "",
    desc: "Bespoke AI systems and dedicated teams for large organisations.",
    color: "#f59e0b",
    bg: "rgba(245,158,11,0.1)",
    popular: false,
    features: [
      "Everything in Growth",
      "Custom LLM / AI agent development",
      "Multi-channel paid media (unlimited spend)",
      "Full web or mobile app development",
      "Algorithmic trading software (PSX / crypto)",
      "Dedicated account manager",
      "Weekly executive reporting",
      "SLA-backed 12-hr response",
    ],
  },
];

const addOns = [
  { name: "Extra blog posts", price: "$150/post" },
  { name: "AI workflow automation (per workflow)", price: "From $300" },
  { name: "Landing page design & build", price: "From $500" },
  { name: "Video ad creative production", price: "From $400" },
  { name: "Custom API / integration", price: "From $800" },
  { name: "Training session (2 hrs)", price: "$200" },
];

const faqs = [
  {
    q: "Do you charge setup fees?",
    a: "No. All packages include onboarding at no extra cost. We kick off within 3 business days of signing.",
  },
  {
    q: "Can I change my plan later?",
    a: "Yes. Upgrade or downgrade at the start of any billing cycle. No lock-in beyond the initial 3-month commitment.",
  },
  {
    q: "What currency are prices in?",
    a: "Prices are shown in USD. We also invoice in PKR at the prevailing open-market rate — contact us for a PKR quote.",
  },
  {
    q: "Is ad spend included in the package price?",
    a: "No. Ad spend goes directly to the ad platforms (Meta, Google). Our fee covers strategy, setup, and management.",
  },
  {
    q: "How do I get started?",
    a: "Book a free 30-minute strategy call via our Contact page. We'll audit your current situation and recommend the right package.",
  },
];

export default function PricingClient() {
  return (
    <div className="pt-32 pb-24">
      {/* Header */}
      <section className="container mx-auto px-6 mb-24 text-center">
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xs font-bold uppercase tracking-widest text-brand-cyan mb-4"
        >
          Transparent Pricing — No Hidden Fees
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-6xl md:text-8xl font-bold mb-8 text-slate-900 dark:text-white"
        >
          Simple, Honest <span className="text-gradient">Pricing</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-xl text-black dark:text-brand-muted max-w-3xl mx-auto"
        >
          Choose the package that fits your growth stage. All plans include onboarding, monthly reporting, and access to our AI toolkit.
        </motion.p>
      </section>

      {/* Pricing Cards */}
      <section className="container mx-auto px-6 mb-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          {plans.map((plan, i) => {
            const Icon = plan.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative"
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                    <span className="bg-brand-cyan text-black text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full">
                      Most Popular
                    </span>
                  </div>
                )}
                <GlowingCard className="h-full">
                  <div className="p-10 flex flex-col h-full">
                    <div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6"
                      style={{ backgroundColor: plan.bg }}
                    >
                      <Icon className="w-7 h-7" style={{ color: plan.color }} />
                    </div>

                    <h2 className="text-2xl font-bold mb-2 text-slate-900 dark:text-white">
                      {plan.name}
                    </h2>
                    <p className="text-sm text-slate-500 dark:text-brand-muted mb-6 leading-relaxed">
                      {plan.desc}
                    </p>

                    <div className="flex items-end gap-1 mb-8">
                      <span className="text-5xl font-bold text-slate-900 dark:text-white">
                        {plan.price}
                      </span>
                      {plan.period && (
                        <span className="text-brand-muted mb-2">{plan.period}</span>
                      )}
                    </div>

                    <ul className="flex flex-col gap-3 mb-10 flex-grow">
                      {plan.features.map((f, j) => (
                        <li key={j} className="flex items-start gap-3">
                          <CheckCircle2
                            className="w-5 h-5 shrink-0 mt-0.5"
                            style={{ color: plan.color }}
                          />
                          <span className="text-sm text-slate-700 dark:text-white/80 leading-relaxed">
                            {f}
                          </span>
                        </li>
                      ))}
                    </ul>

                    <Link href="/contact">
                      <Button
                        variant={plan.popular ? "brand" : "outline"}
                        className="w-full rounded-full py-6 text-base font-bold group"
                      >
                        {plan.name === "Enterprise" ? "Get a Custom Quote" : "Get Started"}
                        <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                      </Button>
                    </Link>
                  </div>
                </GlowingCard>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Add-Ons */}
      <section className="container mx-auto px-6 mb-24">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl font-bold mb-12 text-slate-900 dark:text-white text-center"
        >
          Add-On <span className="text-brand-cyan">Services</span>
        </motion.h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {addOns.map((addon, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
            >
              <GlowingCard>
                <div className="p-8 flex items-center justify-between gap-4">
                  <span className="text-slate-700 dark:text-white/80 font-medium">{addon.name}</span>
                  <span className="text-brand-cyan font-bold text-sm shrink-0">{addon.price}</span>
                </div>
              </GlowingCard>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="container mx-auto px-6 mb-24">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl font-bold mb-12 text-slate-900 dark:text-white text-center"
        >
          Pricing <span className="text-brand-cyan">FAQ</span>
        </motion.h2>
        <div className="max-w-3xl mx-auto flex flex-col gap-4">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
            >
              <GlowingCard>
                <details className="group">
                  <summary className="p-8 flex items-center justify-between cursor-pointer list-none gap-4">
                    <div className="flex items-center gap-3">
                      <HelpCircle className="w-5 h-5 text-brand-cyan shrink-0" />
                      <h3 className="text-base font-semibold text-slate-900 dark:text-white">{faq.q}</h3>
                    </div>
                    <ChevronDown className="w-5 h-5 text-brand-cyan shrink-0 transition-transform group-open:rotate-180" />
                  </summary>
                  <div className="px-8 pb-8 pl-16">
                    <p className="text-slate-600 dark:text-brand-muted leading-relaxed">{faq.a}</p>
                  </div>
                </details>
              </GlowingCard>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-6">
        <GlowingCard>
          <div className="p-12 md:p-20 text-center">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-slate-900 dark:text-white">
              Not Sure Which Plan? <span className="text-brand-cyan">Let&apos;s Talk.</span>
            </h2>
            <p className="text-brand-muted text-lg mb-10 max-w-2xl mx-auto">
              Book a free 30-minute strategy call. We&apos;ll audit your business, understand your goals, and recommend the exact package that makes sense — no pressure, no obligation.
            </p>
            <Link href="/contact">
              <Button variant="brand" className="rounded-full px-10 py-6 text-lg font-bold group">
                Book a Free Strategy Call
                <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
        </GlowingCard>
      </section>
    </div>
  );
}
