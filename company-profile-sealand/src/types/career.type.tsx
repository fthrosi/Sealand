import { VesselTypeOutput } from "./vesels";

type detailCareer = {
    job: string;
}

export type Career ={
    id: number;
    title: string;
    level: string;
    details: detailCareer[];
}
export type CareerOutput = {
    id: number;
    title: string;
    level: string;
    vessel_type: VesselTypeOutput;
    times_contract : string;
    route : string;
    status : "Open" | "Closed";
    created_at: Date;
};
export type CareerInput = {
    title: string;
    level: string;
    type_id: number;
    times_contract : string;
    route : string;
    status : "Open" | "Closed";
};
