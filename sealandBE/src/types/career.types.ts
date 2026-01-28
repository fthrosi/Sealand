import { VesselType } from "./vessel_type.types.js";
import { JobStatus } from "@prisma/client";

export type Career = {
    id: number;
    title: string;
    level: string;
    type: VesselType;
    times_contract : string;
    route : string;
    status : JobStatus;
    created_at: Date;
};
export type CareerInput = {
    title: string;
    level: string;
    type_id: number;
    times_contract : string;
    route : string;
    status : JobStatus;
};