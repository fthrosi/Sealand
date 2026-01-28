"use client";
import Link from "next/link";
import { motion, easeOut } from "motion/react";

import { DataContact, DataBusinessHours } from "@/const/contactUs";
import { Clock4, Phone } from "lucide-react";
import { useNavbarStore } from "@/store/navbar";
export default function ContactUs() {
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
   const navbarHeight = useNavbarStore((state) => state.navbarHeight);
  return (
    <section
      id="contact"
      style={{ paddingTop: navbarHeight, paddingBottom: navbarHeight }}
      className="bg-primary flex items-center lg:min-h-dvh"
    >
      <div className="container-layout flex flex-col items-center justify-center 2xl:gap-16 lg:gap-14 xl:gap-15 md:gap-12 gap-8">
        <motion.div
          variants={containerVariant}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="flex flex-col items-center 2xl:gap-6 gap-4"
        >
          <motion.div
            variants={cardVariant}
            className="lg:px-5 py-2 px-3 bg-secondary/10 w-fit rounded-full"
          >
            <h2 className="text-white xl:text-sm lg:text-xs text-[0.625rem]">
              Get In Touch
            </h2>
          </motion.div>
          <div className="flex flex-col items-center gap-4">
            <motion.h2
              variants={titleVarian}
              className="text-white xl:text-5xl text-2xl md:text-3xl lg:text-4xl font-bold text-center"
            >
              Contact Us
            </motion.h2>
            <motion.p
              variants={itemVariant}
              className="xl:w-182.5 max-w-120 sm:w-120 lg:w-160 lg:max-w-160 text-muted text-center text-xs lg:text-base"
            >
              Ready to take the next step? Reach out to our team for inquiries,
              partnerships, or career opportunities
            </motion.p>
          </div>
        </motion.div>
        <motion.div
          variants={containerVariant}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 w-full gap-6"
        >
          {DataContact.map((item, index) => (
            <motion.div
              key={index}
              variants={cardVariant}
              className="w-full p-8 rounded-2xl bg-white/5 border border-white/10"
            >
              <Link
                href={item.link}
                target="_blank"
                className="flex flex-col items-start gap-6"
              >
                <div className="md:p-4 p-2 rounded-xl bg-secondary w-fit">
                  <item.icon className="text-white md:size-6 size-4" />
                </div>
                <div className="flex flex-col gap-4">
                  <h3 className="text-white font-semibold lg:text-lg text-sm">
                    {item.title}
                  </h3>
                  <p className="text-white/80 text-xs md:text-base">
                    {item.description}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
        <motion.div
          variants={containerVariant}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="flex flex-col lg:flex-row gap-8"
        >
          <motion.div
            variants={cardVariant}
            className="rounded-3xl w-full lg:w-1/2"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.868651541985!2d106.89551187544198!3d-6.148337160269042!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f50055e561c1%3A0xd5e196a970fc1e07!2sPT.%20SEALAND%20CREWING%20INTERNATIONAL!5e0!3m2!1sid!2sid!4v1766495171707!5m2!1sid!2sid"
              width="100%"
              height="200%"
              loading="lazy"
              className="rounded-3xl h-[100vw] lg:h-full"
            ></iframe>
          </motion.div>
          <div className="flex flex-col gap-6 w-full lg:w-1/2">
            <motion.div
              variants={cardVariant}
              className="p-8 border border-white/10 rounded-3xl flex flex-col gap-8"
            >
              <div className="flex gap-4 items-center">
                <div className="p-3 bg-secondary rounded-2xl">
                  <Clock4 className="text-white md:size-6 size-4" />
                </div>
                <h3 className="text-xl font-semibold">Business Hours</h3>
              </div>
              <div className="flex flex-col gap-4">
                {DataBusinessHours.map((item, index) => (
                  <div
                    className="pb-3 flex justify-between border-b border-white/10"
                    key={index}
                  >
                    <h4 className="text-white/80">{item.title}</h4>
                    <h4 className="text-white font-semibold">
                      {item.description}
                    </h4>
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div
              variants={cardVariant}
              className="p-8 bg-linear-to-br from-secondary to-accent rounded-3xl flex flex-col gap-4"
            >
              <h3 className="text-xl font-semibold text-white">
                Emergency Crew Support
              </h3>
              <p className="text-lg text-white/70">
                Our 24/7 emergency hotline is available for urgent crew matters,
                medical assistance, and critical operational support
              </p>
              <div className="flex gap-3">
                <Phone className="text-white md:size-6 size-4" />
                <h3 className="text-xl text-white">+62 8121-3480-999</h3>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
