import { AboutUsProps } from "@/types/aboutUs.type";
import { Award, Globe, Network } from "lucide-react";

export const aboutUsData: AboutUsProps[] = [
    {
        title: "Proven Experience",
        description:"Professional provider of qualified seafarers for MPP, Bulk Carrier and Tanker vessels",
        icon: Award,
    },
    {
        title: "International Reach",
        description:"Solid track record meeting client needs both domestically and internationally",
        icon: Globe,
    },
    {
        title: "Wide Network",
        description:"Access to well trained seafarers for various vessel types and positions",
        icon: Network,
    }
];