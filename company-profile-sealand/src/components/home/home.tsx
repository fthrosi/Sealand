"use client";
import { Anchor } from "lucide-react";
import { useNavbarStore } from "@/store/navbar";
import { motion, easeOut } from "motion/react";
import Link from "next/link";

export default function Home() {
  const navbarHeight = useNavbarStore((state) => state.navbarHeight);
  const titleVarian = {
    hidden: { opacity: 0, clipPath: "inset(0% 100% 0% 0%)" },
    show: {
      opacity: 1,
      clipPath: "inset(0% 0% 0% 0%)",
      transition: { duration: 1, ease: easeOut },
    },
  };
  const subTitleVariant = {
    hidden: { opacity: 0, y: -50 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, delay: 0.2 },
    },
  };
  const descriptionVariant = {
    hidden: { opacity: 0, y: 50 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, delay: 0.2 },
    },
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
      id="home"
      className={`relative overflow-y-hidden h-dvh flex items-center justify-center bg-gray-100`}
      style={{ paddingTop: `${navbarHeight}px` }}
    >
      <video
        className="absolute inset-0 w-full h-full object-cover"
        src="/video/1210.mp4"
        autoPlay
        loop
        muted
        playsInline
      ></video>
      <div className="absolute z-12 w-full h-39.5 bg-linear-to-t from-white to-transparent bottom-0 " />
      <div className="absolute inset-0 bg-primary/50" />
      <div className="w-full h-full z-13 container-layout flex flex-col justify-center">
        <motion.div
          variants={containerVariant}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="flex flex-col gap-6 lg:px-13.5"
        >
          <motion.div
            variants={subTitleVariant}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="flex items-center gap-3"
          >
            <Anchor className="sm:size-10 size-7 text-white" />
            <h2 className="text-white text-xs sm:text-base">
              PT. Sealand Crewing International
            </h2>
          </motion.div>
          <motion.h1
            initial="hidden"
            whileInView="show"
            variants={titleVarian}
            viewport={{ once: true }}
            className="text-white 2xl:text-text-primary xl:text-6xl lg:text-5xl sm:text-4xl text-xl font-bold leading-[1.4]"
          >
            Professional Maritime Crewing for Reliable Vessel Operations
          </motion.h1>
          <motion.p
            variants={descriptionVariant}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="2xl:w-209 lg:w-180 2xl:text-xl sm:text-sm text-xs text-white"
          >
            Providing qualified and compliant seafarers for MPP, Bulk Carrier,
            and Tanker vessels, supporting safe and efficient maritime
            operations.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <Link
              className="hover:cursor-pointer 2xl:px-8 2xl:py-4 px-6 text-sm sm:text-base py-2 mt-6.5 w-fit bg-secondary rounded-2xl text-white"
              href="/contact"
            >
              Discuss Your Crewing Needs
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
