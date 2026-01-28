import { z } from "zod";
const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];
const baseFields = {
  name: z.string().min(1, "Nama harus diisi").max(200, "Nama terlalu panjang"),
};

export const VesselTypeSchema = z.object({
  ...baseFields,
  image: z
      .any()
      .refine((files) => files?.length === 1, "Gambar wajib diunggah")
      .refine(
        (files) => files?.[0]?.size <= MAX_FILE_SIZE,
        "Ukuran file maksimal 2MB"
      )
      .refine(
        (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
        "Hanya format .jpg, .jpeg, .png dan .webp yang didukung"
      ),
});

export type VesselTypeType = z.infer<typeof VesselTypeSchema>;

export const VesselTypeEditSchema = z.object({
  ...baseFields,
  image: z
      .any()
      .optional()
      .refine((files) => {
        if (!files || files.length === 0) return true; 
        return files.length === 1; 
      }, "Gambar wajib diunggah")
      .refine(
        (files) => !files || files?.[0]?.size <= MAX_FILE_SIZE,
        `Ukuran file maksimal 2MB.`
      )
      .refine(
        (files) => !files || ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
        "Hanya format .jpg, .jpeg, .png dan .webp yang didukung."
      ),
});

export type VesselTypeEditType = z.infer<typeof VesselTypeEditSchema>;