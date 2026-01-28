import { VesselType } from "@/types/vesels";
import { ColumnDef } from "@tanstack/react-table";


export const vesselColumns: ColumnDef<VesselType>[] = [
    {
        accessorKey: "no",
        header: "No.",
    },
    {
        accessorKey: "name",
        header: "Vessel Name",
    },
    {
        accessorKey: "flag",
        header: "Flag",
    },
    {
        accessorKey: "type",
        header: "Type",
    }

]