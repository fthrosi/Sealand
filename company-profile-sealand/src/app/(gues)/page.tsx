import Home from "@/components/home/home";
import { WhyChooseUs } from "@/components/home/whyChooseUs";
import { CompanySnapshot } from "@/components/home/companySnapShot";
import { CrewingServices } from "@/components/home/service";
import { CallToAction } from "@/components/home/cta";

export default function GuestPage() {
  return (
    <div className="flex flex-col">
      <Home />
      <CompanySnapshot />
      <CrewingServices />
      <WhyChooseUs />
      <CallToAction />
    </div>
  );
}