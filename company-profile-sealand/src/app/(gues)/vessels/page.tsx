"use client";
import { vesselColumns } from "@/components/vessels/columns";
import { DataTable } from "@/components/vessels/data-table";
import { motion, easeOut } from "motion/react";
import { useNavbarStore } from "@/store/navbar";
import Image from "next/image";
import { getVessels } from "@/api/vessel";
import { useState, useEffect } from "react";
import { VesselType } from "@/types/vesels";
import { toast } from "sonner";
import { useDataStore } from "@/store/useDataStore";

export default function Vessels() {
  interface VesselRaw {
  id: number;
  name: string;
  url: string;
  flag: { name: string };
  type: { name: string };
}
  const [vessels, setVessels] = useState<VesselRaw[]>([]);
  const titleVarian = {
    hidden: { opacity: 0, clipPath: "inset(0% 100% 0% 0%)" },
    show: {
      opacity: 1,
      clipPath: "inset(0% 0% 0% 0%)",
      transition: { duration: 1, ease: easeOut },
    },
  };
  const navbarHeight = useNavbarStore((state) => state.navbarHeight);
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
  const fetchVesselData = async () => {
    try {
      const res = await getVessels();
      setVessels(res.data.data || []);
    } catch (error) {
      toast.error("Failed to fetch vessel data");
    }
  };
  useEffect(() => {
    fetchVesselData();
  }, []);
  const cleanedData : VesselType[] = vessels.map((vessel,index) => ({
    id: vessel.id,
    no: index + 1,
    name: vessel.name,
    flag: vessel.flag.name,
    type: vessel.type.name,
    url: vessel.url,
  }));

  const fetchVesselTypes = useDataStore((state) => state.fetchVesselTypes);
  const vesselTypeData = useDataStore((state) => state.vesselTypes);
  useEffect(() => {
    fetchVesselTypes();
  }, [fetchVesselTypes]);

  return (
    <section
      id="vessel"
      style={{
        paddingTop: `${navbarHeight}px`,
        paddingBottom: `${navbarHeight}px`,
      }}
      className="container-layout lg:min-h-dvh flex flex-col gap-14 justify-center"
    >
      <div className="flex flex-col items-center justify-center 2xl:gap-16 lg:gap-14 xl:gap-15 md:gap-12 gap-8">
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
            Our Partners
          </motion.h2>
          <motion.p
            variants={itemVariant}
            className="xl:w-182.5 sm:w-100 lg:w-140 text-muted text-center xl:text-lg text-xs lg:text-base"
          >
            We collaborate with industry-leading partners to ensure quality and
          </motion.p>
        </motion.div>
        <div className="flex flex-col gap-8 items-center">
          <Image
            src="/images/partner.jpeg"
            width={300}
            height={300}
            alt={"type"}
            className="2xl:w-120 lg:w-90 lg:h-15 w-60 md:w-75 h-10 md:h-13 2xl:h-20 object-cover"
          />
          <h2 className="text-[#DF1620] text-xl sm:text-2xl lg:text-3xl font-bold text-center">
            SEACON SHIPS MANAGEMENT CO LTD
          </h2>
          <h2 className="text-[#DF1620] text-xl sm:text-2xl lg:text-3xl font-bold text-center">
            SEACON SHIPS MANAGEMENT (EUROPE) S.A
          </h2>
        </div>
      </div>
      <div className="w-full">
        <motion.h2
          variants={titleVarian}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="font-bold lg:text-3xl text-2xl mb-8"
        >
          Our Vessels
        </motion.h2>
        <DataTable columns={vesselColumns} data={cleanedData} />
      </div>
      <div className="flex flex-col items-center justify-center 2xl:gap-16 lg:gap-14 xl:gap-15 md:gap-12 gap-8">
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
            Our Vessels Type
          </motion.h2>
          <motion.p
            variants={itemVariant}
            className="xl:w-182.5 sm:w-100 lg:w-140 text-muted text-center xl:text-lg text-xs lg:text-base"
          >
            We operate a diverse fleet of vessels to meet various maritime needs
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
          {vesselTypeData.map((item, index) => (
            <motion.div
              variants={itemVariant}
              key={index}
              className="relative rounded-3xl overflow-hidden w-70 h-35 sm:w-90 sm:h-50 lg:w-54 xl:w-70 2xl:size-75"
            >
              <img
                src={`${process.env.NEXT_PUBLIC_API_URL}/${item.img_url}`}
                width={300}
                height={300}
                alt={"type"}
                className="h-full w-full absolute inset-0 object-cover z-0"
              />
              <div className="relative flex items-end z-10 2xl:p-8 xl:p-6 p-4 bg-[#1E3A5F]/40 h-full">
                <h4 className="text-white font-semibold 2xl:text-xl text-sm mt-3">
                  {item.name} Vessel
                </h4>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
