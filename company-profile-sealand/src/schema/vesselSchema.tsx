import { z } from "zod";
const baseFields = {
  name: z.string().min(1, "Nama harus diisi").max(200, "Nama terlalu panjang"),
  flag_id: z.number().int().positive().min(1, "Flag harus diisi"),
  type_id: z.number().int().positive().optional(),
  url: z.string().optional()
};

export const VesselSchema = z.object({
  ...baseFields
});

export type VesselType = z.infer<typeof VesselSchema>;

export const VesselEditSchema = z.object({
  ...baseFields,
});

export type VesselEditType = z.infer<typeof VesselEditSchema>;