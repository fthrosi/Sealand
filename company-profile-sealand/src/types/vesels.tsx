import { FlagOutput } from "./flag.types";

export type VesselType = {
    id: number;
    no: number;
    name: string;
    flag: string;
    type: string;
    url: string;
}

export type VesselProps = {
    title: string;
    img: string;
}

export type PartnerType = {
    name: string;
}
export type VesselTypeOutput = {
    id: number;
    name: string;
    img_url: string;
}
export type VesselTypeInput = {
    name: string;
    image: File;
}
export type VesselInput = {
    name: string;
    type_id: number;
    flag_id: number;
    url?: string;
}
export type VesselOutput = {
    id: number;
    name: string;
    type_id: number;
    flag_id: number;
    type: VesselTypeOutput;
    flag: FlagOutput;
    url?: string;
}