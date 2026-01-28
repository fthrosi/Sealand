import { GalleryType } from "@prisma/client";
export type GalleryInput = {
    img_url: string;
    type: GalleryType;
};