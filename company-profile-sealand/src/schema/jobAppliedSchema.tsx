import { z } from "zod";
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];
const ACCEPTED_DOCUMENT_TYPES = [
  "application/pdf",
];

const baseFields = {
  name: z.string().min(1, "Nama harus diisi").max(200, "Nama terlalu panjang"),
  email: z.string().min(1, "Email harus diisi").email("Format email tidak valid"),
  no_telp: z
      .string()
      .min(1, "Nomor telepon harus diisi"),
  job_id: z.number().int().positive().min(1, "Lowongan harus diisi"),
};

export const ApplicantSchema = z.object({
  ...baseFields,
  foto: z
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

    cv: z
        .any()
        .refine((files) => files?.length === 1, "CV wajib diunggah")
        .refine(
          (files) => files?.[0]?.size <= MAX_FILE_SIZE,
            "Ukuran file maksimal 10MB"
        )
        .refine(
          (files) => ACCEPTED_DOCUMENT_TYPES.includes(files?.[0]?.type),
          "Hanya format .pdf yang didukung"
        ),
});

export type ApplicantType = z.infer<typeof ApplicantSchema>;