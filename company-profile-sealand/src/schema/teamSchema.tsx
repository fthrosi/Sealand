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
  division_id: z.number().int().positive().min(1, "Divisi harus diisi"),
  bos_id: z.number().optional(),
  role: z.string().min(1, "Role harus diisi").max(100, "Role terlalu panjang"),
};

export const TeamSchema = z.object({
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

export type TeamType = z.infer<typeof TeamSchema>;

export const TeamEditSchema = z.object({
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

export type TeamEditType = z.infer<typeof TeamEditSchema>;