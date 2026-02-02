"use client";
import { Ship } from "lucide-react";
import { DetailCareer } from "@/const/careers";
import { motion, easeOut } from "motion/react";
import { useNavbarStore } from "@/store/navbar";
import { useDataStore } from "@/store/useDataStore";
import { useEffect, useState } from "react";
import { Career } from "@/types/career.type";
import { useUIStore } from "@/store/useUIStore";
import ApplicantForm from "@/components/modals/applied/modalAddApplicant";
export default function Careers() {
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
  const fetchCareerData = useDataStore((state) => state.fetchAvailableCareers);
  const dataCareer = useDataStore((state) => state.availableCareers);
  useEffect(() => {
    fetchCareerData(true);
  }, [fetchCareerData(true)]);
  const dataCleened: Career[] = dataCareer.map((career) => ({
    id: career.id,
    title: career.title,
    level: career.level,
    details: [
      {
        job: career.vessel_type.name,
      },
      {
        job: `${career.times_contract} Months`,
      },
      {
        job: `${career.route} Route`,
      },
    ],
  }));
  const isModalAddOpen = useUIStore(
    (state) => state.activeModal === "addApplicant",
  );
  console.log(dataCareer);
  const [selectedJobId, setSelectedJobId] = useState<number | null>(null);
  return (
    <section
      id="career"
      style={{ paddingTop: navbarHeight, paddingBottom: navbarHeight }}
      className="bg-background-secondary flex items-center lg:min-h-dvh"
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
            <h2 className="text-secondary xl:text-sm lg:text-xs text-[0.625rem]">
              Career Opportinities
            </h2>
          </motion.div>
          <div className="flex flex-col items-center gap-4">
            <motion.h2
              variants={titleVarian}
              className="text-primary xl:text-5xl text-2xl md:text-3xl lg:text-4xl font-bold text-center"
            >
              Current Openings
            </motion.h2>
            <motion.p
              variants={itemVariant}
              className="xl:w-182.5 max-w-120 sm:w-120 lg:w-160 lg:max-w-160 text-muted text-center text-xs lg:text-base"
            >
              Explore exciting maritime career opportunities with competitive
              packages and global exposure
            </motion.p>
          </div>
        </motion.div>
        {dataCleened.length >= 0 && (
          <motion.div
            variants={containerVariant}
            initial="hidden"
            animate="show"
            viewport={{ once: true }}
            className={`flex w-full flex-col sm:flex-row sm:justify-center gap-8 ${
              dataCleened.length % 3 === 0
                ? "lg:justify-between"
                : "lg:justify-start"
            }`}
          >
            {dataCleened.map((item, index) => (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                key={index}
                className="rounded-3xl 2xl:p-8 p-4 flex flex-col gap-8 bg-white 2xl:w-[23.313rem] w-full sm:w-[18rem]"
              >
                <div className="flex justify-between sm:gap-0 w-full">
                  <div className="flex flex-col gap-2">
                    <h4 className="2xl:text-2xl text-lg font-semibold">
                      {item.title}
                    </h4>
                    <div className="lg:px-5 py-2 px-3 bg-secondary/10 w-fit rounded-full">
                      <h2 className="text-secondary xl:text-sm lg:text-xs text-[0.625rem]">
                        {item.level} Level
                      </h2>
                    </div>
                  </div>
                  <div className="rounded-2xl size-fit p-3.5 bg-linear-to-r from-secondary to-accent w-fit">
                    <Ship className="lg:size-7 size-5 text-white" />
                  </div>
                </div>
                <div className="flex flex-col gap-4">
                  {DetailCareer.map((detail, idx) => {
                    const details = item.details[idx];
                    return (
                      <div key={idx} className="flex gap-2">
                        <div className="rounded-2xl size-fit p-2.5 bg-background-secondary w-fit">
                          <detail.icon className="lg:size-5 size-3 text-secondary" />
                        </div>
                        <div className="flex flex-col">
                          <h4 className="xl:text-xs text-[0.625rem]  text-muted">
                            {detail.title}
                          </h4>
                          <h3 className="text-primary text-xs font-semibold xl:text-sm">
                            {details.job}
                          </h3>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <button
                  onClick={() => (
                    setSelectedJobId(item.id),
                    useUIStore.getState().open("addApplicant")
                  )}
                  className="xl:py-3.5 py-2 w-full text-xs text-white rounded-[0.75rem] bg-linear-to-r from-accent to-secondary font-semibold text-center"
                >
                  Apply
                </button>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
      {isModalAddOpen && (
        <ApplicantForm
          jobId={selectedJobId}
          onSuccess={() => fetchCareerData(true)}
        />
      )}
    </section>
  );
}
