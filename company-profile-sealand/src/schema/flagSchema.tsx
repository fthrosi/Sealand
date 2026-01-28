import {z} from "zod";

export const FlagSchema = z.object({
    name: z.string().min(1, "Nama Bendera Harus Diisi").max(100, "Nama Bendera terlalu panjang"),
});
export type FlagType = z.infer<typeof FlagSchema>;