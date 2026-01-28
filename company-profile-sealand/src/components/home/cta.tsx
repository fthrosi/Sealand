"use client";

import Link from "next/link";
import { motion, easeOut } from "motion/react";

export function CallToAction() {
  const titleVarian = {
    hidden: { opacity: 0, clipPath: "inset(0% 100% 0% 0%)" },
    show: {
      opacity: 1,
      clipPath: "inset(0% 0% 0% 0%)",
      transition: { duration: 1, ease: easeOut },
    },
  };
  const itemVariant = {
    hidden: { opacity: 0, y: 50 },
    show: { opacity: 1, y: 0 },
  };
  const containerVariant = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.2,
      },
    },
  };
  const cardVariant = {
    hidden: { opacity: 0, scale: 0.9 },
    show: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
      },
    },
  };
  return (
    <section
      id="contact"
      className="relative py-24 bg-primary text-white overflow-hidden"
    >
      {/* Subtle wave pattern */}
      <div className="absolute inset-0 opacity-5">
        <svg
          className="w-full h-full"
          viewBox="0 0 1200 200"
          preserveAspectRatio="none"
        >
          <path
            d="M0,100 Q300,50 600,100 T1200,100 L1200,200 L0,200 Z"
            fill="currentColor"
          />
        </svg>
      </div>

      <motion.div
        variants={containerVariant}
        initial="hidden"
        whileInView={"show"}
        viewport={{
          once: true,
        }}
        className="relative mx-auto max-w-3xl px-6 lg:px-8 text-center"
      >
        <motion.h2
          variants={titleVarian}
          className="text-4xl md:text-5xl font-bold leading-15 mb-6"
        >
          Looking for a Reliable Maritime Crewing Partner?
        </motion.h2>
        <motion.p
          variants={itemVariant}
          className="text-lg text-maritime-light mb-10 leading-relaxed"
        >
          Connect with our team to discuss your vessel's crewing needs and
          discover how we can support your operations.
        </motion.p>
        <motion.div variants={cardVariant}>
          <Link
            href="/contact"
            className="px-10 py-4 bg-white text-primary font-semibold rounded-lg hover:bg-white/90 hover:cursor-pointer transition-colors text-lg"
          >
            Contact Our Team
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
