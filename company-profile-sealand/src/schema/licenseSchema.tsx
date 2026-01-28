import { z } from "zod";
const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

export const LicenseSchema = z.object({
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

export type LicenseType = z.infer<typeof LicenseSchema>;

export const LicenseEditSchema = z.object({
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

export type LicenseEditType = z.infer<typeof LicenseEditSchema>;