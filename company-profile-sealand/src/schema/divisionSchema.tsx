import {z} from "zod";

export const DivisionSchema = z.object({
    name: z.string().min(1, "Nama Divisi Harus Diisi").max(100, "Nama Divisi terlalu panjang"),
});
export type DivisionType = z.infer<typeof DivisionSchema>;