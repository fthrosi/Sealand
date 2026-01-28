"use client";

import Link from "next/link";
import { navigationLinks } from "@/const/navigation";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { useRef } from "react";
import { useSidebarStore } from "@/store/sidebar";
import { useNavbarStore } from "@/store/navbar";
import { motion } from "motion/react";

export default function Navbar() {
  const ref = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const navbarHeight = useNavbarStore((state) => state.navbarHeight);
  const setNavbarHeight = useNavbarStore((state) => state.setNavbarHeight);
  const pathname = usePathname();
  const isMenuOpen = useSidebarStore((state) => state.isOpen);
  const setIsMenuOpen = useSidebarStore((state) => state.openSidebar);
  const setIsMenuClose = useSidebarStore((state) => state.closeSidebar);

  const getNavbarHeight = () => {
    const height = ref.current ? ref.current.offsetHeight : 0;
    setNavbarHeight(height);
  };

  useEffect(() => {
    getNavbarHeight();
  }, [scrolled]);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
  }, []);
  useEffect(() => {
    const body = document.body;
    if (isMenuOpen) {
      body.style.overflow = "hidden";
    } else {
      body.style.overflow = "auto";
    }
    return () => {
      body.style.overflow = "auto";
    };
  }, [isMenuOpen]);
  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      ref={ref}
      className={`w-full
        ${
          scrolled ? "bg-white shadow-md" : "bg-transparent backdrop-blur-xs"
        } fixed top-0 left-0 z-50 bg-neutral-white `}
    >
      {/* Navbar utama */}
      <div
        className={`container-layout flex items-center justify-between ${
          scrolled ? "2xl:py-4 py-2" : "2xl:py-6 py-4"
        }`}
      >
        <Link href="/" className="flex gap-3 items-center">
          <img
            src={"/images/logo.png"}
            alt="Logo Sealand"
            className="w-22 h-10 md:w-27 md:h-12 xl:w-30 xl:h-14"
          />
        </Link>

        {/* Navigation links desktop */}
        <div className="lg:flex xl:gap-4 2xl:gap-1 hidden text-white">
          {navigationLinks.map((link) => (
            <div
              key={link.title}
              className={`lg:py-2.5 lg:px-4 md:py-2 md:px-3.5 font-montserrat lg:text-xs xl:text-sm 2xl:text-base ${
                scrolled
                  ? pathname === link.href
                    ? "bg-secondary rounded-[0.625rem] font-semibold text-white"
                    : "text-primary hover:text-[#DF1620]"
                  : pathname === link.href
                  ? "bg-secondary rounded-[0.625rem] font-semibold text-white"
                  : pathname !== "/"
                  ? pathname === "/contact"
                    ? "text-white hover:text-[#DF1620]"
                    : "text-primary hover:text-[#DF1620]"
                  : "text-white hover:text-[#DF1620]"
              }`}
            >
              <Link href={link.href}>{link.title}</Link>
            </div>
          ))}
        </div>

        {/* Tombol Contact Us (desktop) */}
        <Link
          href="/contact"
          className="hidden xl:flex bg-secondary hover:bg-secondary/80 text-white font-montserrat lg:text-[0.6rem] xl:text-sm font-bold lg:px-4 lg:py-2.5 md:py-2 md:px-3.5 rounded-[0.625rem] gap-1 items-center"
        >
          Contact Us
        </Link>

        {/* Tombol burger (mobile) */}
        <div className="lg:hidden">
          {isMenuOpen ? (
            <X
              onClick={setIsMenuClose}
              className={`2xl:size-6 size-4 ${
                scrolled
                  ? "text-secondary"
                  : pathname === "/"
                  ? "text-white"
                  : pathname === "/contact"
                  ? "text-white"
                  : "text-secondary"
              }`}
            />
          ) : (
            <Menu
              onClick={setIsMenuOpen}
              className={`2xl:size-6 size-4 ${
                scrolled
                  ? "text-secondary"
                  : pathname === "/"
                  ? "text-white"
                  : pathname === "/contact"
                  ? "text-white"
                  : "text-secondary"
              }`}
            />
          )}
        </div>
      </div>

      {/* Menu mobile */}
      <div
        style={{
          top: `${navbarHeight}px`,
          height: `calc(100vh - ${navbarHeight}px)`,
        }}
        className={`
          lg:hidden fixed overflow-y-auto w-full bg-white shadow-lg z-60 p-4
          transition-all duration-300 ease-in-out
          h-dvh flex flex-col justify-center py-10
          ${
            isMenuOpen
              ? "translate-x-0 opacity-100"
              : "-translate-x-full opacity-0 pointer-events-none"
          }
        `}
      >
        <div
          className={`container-layout overflow-y-auto flex flex-col  gap-5`}
        >
          {navigationLinks.map((link) => (
            <div
              key={link.title}
              className={`py-2.5 px-4 font-montserrat text-sm md:text-base  rounded-[0.625rem] hover:text-[#DF1620] ${
                pathname === link.href
                  ? "bg-secondary font-semibold text-white"
                  : "text-primary"
              }`}
            >
              <Link href={link.href} className="block" onClick={setIsMenuClose}>
                {link.title}
              </Link>
            </div>
          ))}

          {/* Contact Us (mobile) */}
          <Link
            href="/contact"
            className={`flex font-montserrat text-sm md:text-base px-4 py-2.5 rounded-[0.625rem] gap-1 items-start justify-start ${
              pathname === "/contact"
                ? "bg-primary font-semibold text-neutral-white"
                : "text-neutral-black"
            }`}
            onClick={setIsMenuClose}
          >
            Contact Us
          </Link>
        </div>
      </div>
    </motion.header>
  );
}
