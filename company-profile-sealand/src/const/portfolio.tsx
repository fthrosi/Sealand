import { LucideIcon } from "lucide-react"
import { Ship,Users,Calendar,Anchor } from "lucide-react";
interface portfolioProps {
    icon: LucideIcon;
}

export const portfolioIcon: portfolioProps[] = [
    {
        icon: Ship
    },
    {
        icon: Users
    },
    {
        icon: Calendar
    },
    {
        icon: Anchor,
    }

]