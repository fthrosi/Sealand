import { Career } from "@/types/career.type";
import { Ship, Clock4, MapPin } from "lucide-react";
import { LucideIcon } from "lucide-react";

type detailJob = {
  icon: LucideIcon;
  title: string;
};

export const DetailCareer:detailJob[] = [
  {
    icon: Ship,
    title: "VESSEL TYPE",
  },
  {
    icon: Clock4,
    title: "CONTRACT DURATION",
  },
  {
    icon: MapPin,
    title: "ROUTE",
  }
];
