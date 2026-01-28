"use client";
import { portfolioIcon } from "@/const/portfolio";
import { motion, easeOut } from "motion/react";
import Image from "next/image";
import { getPortfolios } from "@/api/portfolio";
import { useEffect, useState } from "react";
import { PortfolioOutput } from "@/types/portfolio.types";
import { toast } from "sonner";

export function CompanySnapshot() {
  const [portfolio, setPortfolio] = useState<PortfolioOutput[]>([]);
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
  const fetchPortfolioData = async () => {
    try {
      const res = await getPortfolios();
      setPortfolio(res.data.data || []);
      console.log("Portfolio data:", res.data.data);
    } catch (error) {
      toast.error("Failed to fetch portfolio data");
    }
  };
  useEffect(() => {
    fetchPortfolioData();
  }, []);
  return (
    <section className="py-24 bg-linear-to-b from-white to-light-blue/30 relative overflow-hidden">
      {/* Subtle maritime background texture */}
      <div className="container-layout flex flex-col items-center gap-16">
        <motion.div
          variants={containerVariant}
          initial="hidden"
          whileInView="show"
          viewport={{
            once: true,
          }}
          className="text-center flex flex-col gap-4 w-full justify-center items-center"
        >
          <motion.h2
            variants={titleVarian}
            className="text-primary max-w-200 xl:text-text-secondary text-2xl sm:text-3xl lg:text-4xl 2xl:text-5xl font-bold text-center"
          >
            A Trusted Partner in Maritime Crewing Operations
          </motion.h2>
          <motion.p
            variants={itemVariant}
            className="xl:w-182.5 sm:w-100 lg:w-140 text-muted text-center xl:text-lg text-xs lg:text-base"
          >
            Decades of industry expertise delivering reliable crewing solutions
            to the global maritime community
          </motion.p>
        </motion.div>
        <motion.div
          variants={containerVariant}
          initial="hidden"
          whileInView="show"
          viewport={{
            once: true,
          }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {portfolio.map((item, index) => { 
              const IconComponent = portfolioIcon[index]?.icon;
            return (
            <motion.div
              variants={itemVariant}
              key={item.id}
              className="relative rounded-3xl overflow-hidden"
            >
              <img
                src={`${process.env.NEXT_PUBLIC_API_URL}/${item.img_url}`}
                width={300}
                height={300}
                alt={item.name}
                className="h-full w-full object-cover absolute inset-0 z-0"
              />
              <div className="relative z-10 2xl:p-8 xl:p-6 p-4 bg-[#1E3A5F]/40 h-full">
                <div className="rounded-2xl p-3.5 bg-white/60 w-fit">
                  <IconComponent className="lg:size-7 size-5 text-light-blue" />
                </div>
                <h3 className="text-white font-bold 2xl:text-5xl text-3xl mt-6">
                  {item.value}
                </h3>
                <h4 className="text-white font-semibold 2xl:text-xl text-sm mt-3">
                  {item.name}
                </h4>
                <p className="text-white/70 text-xs mt-2 xl:w-60.5">
                  {item.description}
                </p>
              </div>
            </motion.div>
          )})}
        </motion.div>
      </div>
    </section>
  );
}
