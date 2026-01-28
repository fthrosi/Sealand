"use client";

import Image from "next/image";
import { aboutUsData } from "@/const/aboutUs";
import { motion, easeOut } from "motion/react";
import { useNavbarStore } from "@/store/navbar";

export default function About() {
  const navbarHeight = useNavbarStore((state) => state.navbarHeight);
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
  return (
    <section
      id="about"
      style={{
        paddingTop: `${navbarHeight}px`
      }}
      className={`lg:min-h-dvh overflow-x-hidden py-24 container-layout flex flex-col md:flex-row items-center justify-center 2xl:gap-16 lg:gap-14 xl:gap-15 md:gap-12`}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="w-1/2 flex items-center"
      >
        <Image
          src="/images/7.jpeg"
          alt="Nahkoda"
          width={560}
          height={600}
          className="rounded-3xl object-cover 2xl:w-140 2xl:h-150 md:w-full md:h-110 lg:h-130 xl:h-140 hidden md:block"
        ></Image>
      </motion.div>
      <div className="md:w-1/2 flex flex-col lg:gap-6 gap-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="lg:px-5 py-2 px-3 bg-secondary/10 w-fit rounded-full"
        >
          <h2 className="text-secondary xl:text-sm lg:text-xs text-[0.625rem]">
            About Our Company
          </h2>
        </motion.div>
        <motion.h1
          variants={titleVarian}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="text-[#1434A3] xl:leading-15 xl:text-5xl lg:text-3xl lg:leading-11 text-2xl font-bold"
        >
          PT. Sea
          <span className="text-[#DF1620]">land</span> <br />
          Crewing International
        </motion.h1>
        <motion.div
          variants={containerVariant}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="flex flex-col text-xs lg:text-sm xl:text-base xl:gap-8 gap-4 lg:gap-6 text-muted"
        >
          <motion.p
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            PT. SEALAND CREWING INTERNATIONAL believes that the crew is a key
            element in ensuring the smooth, efficient, and safe operation of a
            vessel. We understand that effective crew management is essential to
            protecting the interests of both the vessel and its owners.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            Therefore, we implement a rigorous selection process, regular
            evaluations, performance-based incentives, and continuous training
            to ensure that every crew member possesses the highest level of
            competence and professionalism.
          </motion.p>
        </motion.div>
        <motion.div
          variants={containerVariant}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="flex flex-col gap-4"
        >
          {aboutUsData.map((item, index) => (
            <motion.div
              variants={itemVariant}
              className="flex gap-4"
              key={index}
            >
              <div className="p-3 h-fit rounded-[0.75rem] bg-secondary/10 flex items-center justify-center">
                <item.icon className="xl:size-6 size-4 lg:size-5 text-secondary" />
              </div>
              <div className="flex flex-col gap-1">
                <h4 className="font-semibold text-primary xl:text-lg lg:text-base text-sm">
                  {item.title}
                </h4>
                <p className="text-muted text-xs lg:text-sm xl:text-base">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
