"use client";

import { motion } from "framer-motion";

export default function Partners() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number], // elegant cubic bezier
      },
    },
  };

  const partnerList = [
    {
      name: "Meta",
      subText: "Authorized Partner",
      logo: (
        <svg
          viewBox="0 0 24 24"
          className="w-8 h-8 fill-current text-slate-500 group-hover:text-[#0064E0] dark:text-slate-400 dark:group-hover:text-[#0081FB] transition-colors duration-300"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M17.8 7c-1.5 0-2.8.7-3.8 2-1-1.3-2.3-2-3.8-2C6.9 7 4 9.7 4 13s2.9 6 6.2 6c1.5 0 2.8-.7 3.8-2 1 1.3 2.3 2 3.8 2 3.3 0 6.2-2.7 6.2-6S21.1 7 17.8 7zm-7.6 9.6c-1.9 0-3.6-1.5-3.6-3.6s1.7-3.6 3.6-3.6c.9 0 1.8.4 2.4 1-1.1 1.4-1.7 3.1-1.7 4.9.1.5.6 1.3 1.3 1.3zm7.6 0c-.7 0-1.2-.8-1.3-1.3 0-1.8-.6-3.5-1.7-4.9.6-.6 1.5-1 2.4-1 1.9 0 3.6 1.5 3.6 3.6s-1.7 3.6-3.6 3.6z" />
        </svg>
      ),
    },
    {
      name: "AUDI Pakistan",
      subText: "Official Collab",
      logo: (
        <svg
          viewBox="0 0 120 40"
          className="w-18 h-6 fill-none stroke-current text-slate-500 group-hover:text-slate-900 dark:text-slate-400 dark:group-hover:text-white transition-colors duration-300"
          strokeWidth="3"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="20" cy="20" r="14" />
          <circle cx="44" cy="20" r="14" />
          <circle cx="68" cy="20" r="14" />
          <circle cx="92" cy="20" r="14" />
        </svg>
      ),
    },
    {
      name: "Shahnawaz Motors",
      subText: "Mercedes-Benz Partner",
      logo: (
        <svg
          viewBox="0 0 24 24"
          className="w-8 h-8 fill-none stroke-current text-slate-500 group-hover:text-slate-900 dark:text-slate-400 dark:group-hover:text-white transition-colors duration-300"
          strokeWidth="1.5"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="12" cy="12" r="10.5" />
          <path
            d="M12 1.5 L12 12 M12 12 L3 17.5 M12 12 L21 17.5"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
    {
      name: "Microsoft",
      subText: "Cloud Solutions Partner",
      logo: (
        <svg
          viewBox="0 0 23 23"
          className="w-7 h-7 text-slate-500 dark:text-slate-400 group-hover:text-current transition-colors duration-300"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            x="0"
            y="0"
            width="10.5"
            height="10.5"
            className="fill-current group-hover:fill-[#F25022] transition-colors duration-300"
          />
          <rect
            x="11.5"
            y="0"
            width="10.5"
            height="10.5"
            className="fill-current group-hover:fill-[#7FBA00] transition-colors duration-300"
          />
          <rect
            x="0"
            y="11.5"
            width="10.5"
            height="10.5"
            className="fill-current group-hover:fill-[#00A4EF] transition-colors duration-300"
          />
          <rect
            x="11.5"
            y="11.5"
            width="10.5"
            height="10.5"
            className="fill-current group-hover:fill-[#FFB900] transition-colors duration-300"
          />
        </svg>
      ),
    },
  ];

  return (
    <section className="py-12 md:py-16 bg-transparent relative z-10 border-y border-slate-200/50 dark:border-white/5 overflow-hidden">
      <div className="container mx-auto px-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="flex flex-col lg:flex-row items-center justify-between gap-10"
        >
          {/* Section Heading Left */}
          <motion.div variants={itemVariants} className="max-w-md text-center lg:text-left shrink-0">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-cyan mb-2 block">
              Our Elite Ecosystem
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white leading-tight">
              Powering Growth with <span className="text-gradient">World-Class</span> Partners
            </h2>
          </motion.div>

          {/* Grid of Partners */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-2 sm:grid-cols-4 gap-6 md:gap-10 w-full max-w-4xl"
          >
            {partnerList.map((partner, index) => (
              <div
                key={index}
                className="group relative flex flex-col items-center justify-center p-6 rounded-2xl bg-slate-50/50 hover:bg-slate-100/50 dark:bg-white/2 dark:hover:bg-white/5 border border-slate-200/40 hover:border-slate-300 dark:border-white/5 dark:hover:border-white/10 transition-all duration-300 shadow-sm hover:shadow-md cursor-default transform hover:-translate-y-1"
              >
                {/* Logo wrapper */}
                <div className="h-10 flex items-center justify-center mb-3">
                  {partner.logo}
                </div>

                {/* Partner Metadata */}
                <span className="text-sm font-semibold text-slate-800 dark:text-white transition-colors duration-300 group-hover:text-brand-cyan">
                  {partner.name}
                </span>
                <span className="text-[10px] tracking-wider uppercase text-slate-400 dark:text-slate-500 mt-1 font-medium group-hover:text-slate-600 dark:group-hover:text-slate-400 transition-colors duration-300">
                  {partner.subText}
                </span>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
