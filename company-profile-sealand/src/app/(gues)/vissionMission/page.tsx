"use client";

import { Eye, Target } from "lucide-react";
import { motion, easeOut, easeInOut } from "motion/react";
import { useNavbarStore } from "@/store/navbar";

export default function VisionAndMision() {
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
   const leftVariant = {
    hidden: { opacity: 0, x: -50 },
    show: { opacity: 1, x: 0, transition: {
      duration : 1,
      ease: easeInOut
    } },
  };
  const rightVariant = {
    hidden: { opacity: 0, x: 50 },
    show: { opacity: 1, x: 0, transition: {
      duration : 1,
      ease: easeInOut
    } },
  };
  return (
    <section 
      id="visi" 
      className="bg-background-secondary overflow-x-hidden"
      style={{ paddingTop: navbarHeight, paddingBottom: navbarHeight }}
    >
      <div className="container-layout flex flex-col gap-16">
        <motion.div
          variants={containerVariant}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="flex flex-col gap-4 w-full justify-center items-center"
        >
          <motion.h2
            variants={titleVarian}
            className="text-primary xl:text-text-secondary text-2xl sm:text-3xl lg:text-4xl font-bold text-center"
          >
            Our Vision & Mission
          </motion.h2>
          <motion.p
            variants={itemVariant}
            className="xl:w-182.5 sm:w-100 lg:w-140 text-muted text-center xl:text-lg text-xs lg:text-base"
          >
            Guided by our core values, we strive to set the standard for
            maritime recruitment excellence
          </motion.p>
        </motion.div>
        <motion.div
          variants={containerVariant}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row gap-8"
        >
          <motion.div
          variants={leftVariant}
          className="sm:w-1/2 p-8 rounded-3xl bg-white drop-shadow-md flex flex-col xl:gap-6 gap-4">
            <div className="rounded-2xl p-3.5 bg-linear-to-r from-secondary to-accent w-fit">
              <Eye className="lg:size-7 size-5 text-white" />
            </div>
            <h3 className="text-primary xl:text-2xl lg:text-xl text-lg font font-semibold">
              Our Vision
            </h3>
            <p className="text-muted text-xs lg:text-sm xl:text-base">
              Our vision is to become that is constantly growing, has
              sustainable success and a proven track record of providing quality
              of Indonesian seafarers to the principal whole the world.
            </p>
          </motion.div>
          <motion.div
          variants={rightVariant}
          className="sm:w-1/2 p-8 rounded-3xl drop-shadow-md bg-white flex flex-col xl:gap-6 gap-4">
            <div className="rounded-2xl p-3.5 bg-linear-to-r from-secondary to-accent w-fit">
              <Target className="lg:size-7 size-5 text-white" />
            </div>
            <h3 className="text-primary xl:text-2xl lg:text-xl text-lg font font-semibold">
              Our Mission
            </h3>
            <p className="text-muted text-xs lg:text-sm xl:text-base">
              The Corporation aims to provide ❹Quality Manpower to all it’s
              clients. To carry out this mission, the company has adopted and
              now also provides training services for its crew in order to
              further develop and accelerate their promotion thus sustaining the
              socio economic transformation of the community and the country as
              a whole.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
