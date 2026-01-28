import { z } from "zod";

export const CareerSchema = z.object({
    title: z.string().min(1, "Judul Harus Diisi").max(200, "Judul terlalu panjang"),
    level: z.string().min(1, "Level minimal 1 karakter").max(100, "Level terlalu panjang"),
    type_id: z.number().int().positive("Tipe kapal harus dipilih"),
    times_contract: z.string().min(1, "Durasi kontrak Harus Diisi").max(100, "Durasi kontrak terlalu panjang"),
    route: z.string().min(1, "Rute Harus Diisi").max(200, "Rute terlalu panjang"),
    status: z.enum(["Open", "Closed"], {
        message: "Status harus dipilih",
    }),
});

export type CareerType = z.infer<typeof CareerSchema>;