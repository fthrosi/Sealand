"use client";
import Link from "next/link";
import { motion, easeOut } from "motion/react";

export function CrewingServices() {
  const services = [
    {
      title: "Crew Recruitment & Placement",
      description:
        "Strategic selection and placement of qualified seafarers matched to vessel requirements and operational needs.",
    },
    {
      title: "Crew Documentation & Certification",
      description:
        "Comprehensive management of all maritime certifications, licenses, and compliance documentation.",
    },
    {
      title: "Crew Management & Rotation",
      description:
        "Professional crew lifecycle management including training, deployment, and systematic rotation programs.",
    },
  ];
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
    <section className="py-24 bg-linear-to-b from-light-blue/30 to-primary">
      <div className="container-layout flex flex-col items-center gap-16">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <motion.div
            variants={containerVariant}
            initial="hidden"
            whileInView={"show"}
            viewport={{
              once: true,
            }}
            className="flex flex-col gap-4"
          >
            <motion.span
              variants={itemVariant}
              className="text-sm font-bold text-white tracking-widest uppercase"
            >
              Our Services
            </motion.span>
            <motion.h2
              variants={titleVarian}
              className="text-white xl:text-text-secondary text-2xl sm:text-3xl lg:text-4xl 2xl:text-5xl font-bold"
            >
              Professional Maritime Crewing Services
            </motion.h2>
            <motion.p
              variants={itemVariant}
              className="xl:text-lg text-xs lg:text-base text-white/70 leading-relaxed"
            >
              We provide end-to-end crewing solutions emphasizing compliance,
              qualification, and operational excellence to ensure your vessels
              operate safely and efficiently.
            </motion.p>

            <div className="space-y-6 mb-8">
              {services.map((service, index) => (
                <motion.div
                  variants={itemVariant}
                  key={index}
                  className="pb-6 border-b border-maritime-light/50 last:border-b-0"
                >
                  <h3 className="text-xl font-bold text-white mb-3">
                    {service.title}
                  </h3>
                  <p className="text-white/70 leading-relaxed">
                    {service.description}
                  </p>
                </motion.div>
              ))}
            </div>
            <motion.div variants={cardVariant}>
              <Link
                href="/contact"
                className="px-8 py-3 border-2 border-white text-white text-center font-semibold rounded-lg hover:bg-white/5 hover:cursor-pointer transition-colors"
              >
                View Crewing Services
              </Link>
            </motion.div>
          </motion.div>

          {/* Right Image */}
          <div className="hidden lg:block">
            <motion.div
              variants={cardVariant}
              initial="hidden"
              whileInView={"show"}
              viewport={{
                once:true
              }}
              className="relative rounded-2xl overflow-hidden shadow-2xl"
            >
              <img
                src="/images/crewService.jpeg"
                alt="Vessel crew operations"
                className="w-full lg:h-150 object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-t from-maritime-dark/40 to-transparent" />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
