"use client";

import { useNavbarStore } from "@/store/navbar";
import { motion, easeOut } from "motion/react";
import { useState, useEffect } from "react";
import { getGalleries } from "@/api/gallery";
import { GalleryOutput } from "@/types/gallery.types";

export default function Gallery() {
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
  const [galleries, setGalleries] = useState<GalleryOutput[]>([]);
  const fetchGalleries = async () => {
    try {
      const data = await getGalleries();
      setGalleries(data.data.data);
    } catch (error) {
      console.error("Error fetching galleries:", error);
    }
  };
  useEffect(() => {
    fetchGalleries();
  }, []);
  return (
    <section
      id="gallery"
      style={{ paddingTop: navbarHeight, paddingBottom: navbarHeight }}
      className="w-full bg-gallery"
    >
      <div className="container-layout mx-auto">
        {/* Header */}
        <motion.div
          variants={containerVariant}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="mb-12 md:mb-16 text-center"
        >
          <motion.h2
            variants={titleVarian}
            className="text-4xl md:text-5xl lg:text-6xl font-serif font-medium text-gallery-foreground mb-4 text-balance"
          >
            Our Gallery
          </motion.h2>
          <motion.p
            variants={itemVariant}
            className="text-lg md:text-xl text-gallery-muted max-w-2xl mx-auto text-pretty"
          >
            Explore our curated collection of stunning designs and inspirations
          </motion.p>
        </motion.div>
        {galleries.length >= 0 && (
          <motion.div
            variants={containerVariant}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[300px]"
          >
            {galleries.map((image, index) => (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                key={index}
                className={`group relative overflow-hidden rounded-lg ${image.type === "Portrait" ? "md:col-span-2 md:row-span-2" : "md:col-span-2 md:row-span-1"} cursor-pointer transition-transform duration-300 hover:scale-[1.02]`}
              >
                <img
                  src={`${process.env.NEXT_PUBLIC_API_URL}/${image.img_url}`}
                  alt={"Gallery Image"}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-linear-to-t from-gallery-overlay/80 via-gallery-overlay/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <p className="text-white font-medium text-lg">
                      Picture Sealand
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}
