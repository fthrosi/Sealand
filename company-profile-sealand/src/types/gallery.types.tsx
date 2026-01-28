export type GalleryInput = {
    image : File;
    type: "Landscape" | "Portrait";
};

export type GalleryOutput = {
    id: number;
    img_url: string;
    type: "Landscape" | "Portrait";
};