import Link from "next/link";
import { TiktokIcon } from "@/icon/tiktokIcon";
import { Instagram, Facebook } from "lucide-react";
export default function Footer() {
  return (
    <div className="pt-24 bg-dark-primary">
      <div className="container-layout">
        <div className="pb-8 border-b border-white/10 grid lg:grid-cols-3 grid-cols-1 gap-12">
          <div className="flex flex-col gap-6">
            <img
              src={"/images/logo.png"}
              alt="Logo Sealand"
              className="w-20 h-8 md:w-25 md:h-10 xl:w-28 xl:h-12"
            />
            <p className="lg:text-lg text-sm sm:text-base text-white/60">
              Leading maritime crew management company providing qualified
              seafarers for MPP, Bulk Carrier, and Tanker vessels worldwide.
            </p>
          </div>
          <div className="flex lg:items-center flex-col gap-6">
            <h3 className="text-white font-semibold lg:text-lg text-sm sm:text-base">Quick Links</h3>
            <div className="flex flex-col gap-3 lg:text-lg text-sm sm:text-base">
                <Link href="/about" className="text-white/60 hover:text-white">
                    About Us
                </Link>
                <Link href="/recruitment" className="text-white/60 hover:text-white">
                    Recruitment
                </Link>
                <Link href="/vessels" className="text-white/60 hover:text-white">
                    Vessels
                </Link>
                <Link href="/career" className="text-white/60 hover:text-white">
                    Careers
                </Link>
            </div>
          </div>
          <div className="flex items-start flex-col gap-6">
            <h3 className="text-white font-semibold lg:text-lg text-sm sm:text-base">Follow Us</h3>
            <p className="lg:text-lg text-sm sm:text-base text-white/60">Stay connected for the latest opportunities and industry updates.</p>
            <div className="flex gap-3">
                <Link href={"/"} className="p-2.5 rounded-2xl bg-white/5">
                    <Instagram className="text-white size-5" />
                </Link>
                <Link target="_blank" href={"https://www.tiktok.com/@sealand.crewing.i?_r=1&_t=ZS-92QzFPj74Hl"} className="p-2.5 rounded-2xl bg-white/5">
                <TiktokIcon className="text-white size-5" />
                </Link>
            </div>
          </div>
        </div>
        <div className="lg:py-8 py-4 flex justify-center items-center">
            <p className="text-xs lg:text-sm text-white/40">
                © 2025 PT. Sealand Crewing International. All rights reserved.
            </p>
        </div>  
      </div>
    </div>
  );
}
