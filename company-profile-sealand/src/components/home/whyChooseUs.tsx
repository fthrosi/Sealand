"use client";

import { Users, Shield, Zap, FileCheck } from "lucide-react";
import { motion, easeOut } from "motion/react";

export function WhyChooseUs() {
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
  const features = [
    {
      title: "Qualified & Screened Crew Selection",
      description:
        "Rigorous vetting process ensures only the most qualified and reliable seafarers join your vessel.",
      icon: Users,
    },
    {
      title: "Regulation & Compliance-Oriented Process",
      description:
        "Full adherence to international maritime regulations, STCW standards, and industry best practices.",
      icon: FileCheck,
    },
    {
      title: "Reliable Crew Management System",
      description:
        "Advanced systems for crew tracking, performance monitoring, and consistent operational support.",
      icon: Zap,
    },
    {
      title: "Professional Documentation & Reporting",
      description:
        "Complete transparency with detailed reporting, certifications, and compliance documentation.",
      icon: Shield,
    },
  ];

  return (
    <section
      id="why-us"
      className="py-24 bg-primary text-white overflow-hidden"
    >
      {/* Background maritime pattern */}
      {/* <div className="absolute inset-0 opacity-5">
        <svg
          className="w-full h-full"
          viewBox="0 0 1200 800"
          preserveAspectRatio="none"
        >
          <defs>
            <pattern
              id="maritime-lines"
              width="60"
              height="60"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M0,0 L60,60 M60,0 L0,60"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.5"
              />
            </pattern>
          </defs>
          <rect width="1200" height="800" fill="url(#maritime-lines)" />
        </svg>
      </div> */}
      <div className="container-layout flex flex-col items-center gap-16">
        <motion.div
          variants={containerVariant}
          initial="hidden"
          whileInView={"show"}
          viewport={{
            once: true,
          }}
          className="text-center flex flex-col items-center gap-4"
        >
          <motion.h2
            variants={titleVarian}
            className="xl:text-text-secondary text-2xl sm:text-3xl lg:text-4xl 2xl:text-5xl font-bold"
          >
            Why Shipowners Choose Us
          </motion.h2>
          <motion.p
            variants={itemVariant}
            className="xl:w-150 sm:w-100 lg:w-140 text-muted text-center xl:text-lg text-xs lg:text-base"
          >
            Four core competencies that make us the preferred maritime crewing
            partner
          </motion.p>
        </motion.div>

        <motion.div
          variants={containerVariant}
          initial="hidden"
          whileInView={"show"}
          viewport={{
            once: true,
          }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              variants={itemVariant}
              key={index}
              className="bg-white/10 border border-white/20 rounded-xl p-4 hover:bg-white/15 transition-all duration-300"
            >
              <div className="mb-6">
                <div className="p-3 bg-primary/20 rounded-lg inline-block">
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
              </div>
              <h3 className="text-xl font-bold mb-3 transition-colors">
                {feature.title}
              </h3>
              <p className="text-white text-sm leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
