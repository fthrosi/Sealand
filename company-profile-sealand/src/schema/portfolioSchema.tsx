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
  value: z.string().min(1, "Value harus diisi"),
  description: z.string().min(1, "Deskripsi harus diisi").max(1000, "Deskripsi terlalu panjang"),
};

export const PortfolioSchema = z.object({
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

export type PortfolioType = z.infer<typeof PortfolioSchema>;

export const PortfolioEditSchema = z.object({
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

export type PortfolioEditType = z.infer<typeof PortfolioEditSchema>;