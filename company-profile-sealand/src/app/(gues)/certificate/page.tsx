"use client";

import { motion, easeOut } from "motion/react";
import { useNavbarStore } from "@/store/navbar";
import { getLicenses } from "@/api/license";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { LicenseOutput } from "@/types/license.types";
export default function Certificate() {
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
  const [licenses, setLicenses] = useState<LicenseOutput[]>([]);
  const fetchLicenseData = async () => {
    try {
      const res = await getLicenses();
      setLicenses(res.data.data || []);
    } catch (error) {
      toast.error("Failed to fetch license data");
    }
  };
  useEffect(() => {
    fetchLicenseData();
  }, []);

  return (
    <section
      id="certificate"
      style={{ paddingTop: navbarHeight, paddingBottom: navbarHeight }}
      className="bg-background-secondary xl:min-h-dvh"
    >
      <div className="container-layout flex flex-col items-center gap-16">
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
            International License
          </motion.h2>
          <motion.p
            variants={itemVariant}
            className="xl:w-182.5 sm:w-100 lg:w-140 text-muted text-center xl:text-lg text-xs lg:text-base"
          >
            Accredited and License by leading maritime authorities worldwide
          </motion.p>
        </motion.div>
        {licenses.length > 0 && (
          <motion.div
            variants={containerVariant}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }} // Tambahkan amount untuk toleransi jarak
            className="flex flex-col lg:flex-row gap-4 lg:gap-8"
          >
            {licenses.map((license) => (
              <motion.div
                key={license.id}
                variants={cardVariant}
                className="rounded-lg shadow-lg w-[20rem] lg:w-76 xl:w-[23.313rem] 2xl:w-100"
              >
                <img
                  src={`${process.env.NEXT_PUBLIC_API_URL}/${license.img_url}`}
                  alt="license image"
                  className="rounded-lg shadow-lg w-full h-auto"
                />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}
