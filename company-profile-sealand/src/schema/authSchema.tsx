import { z } from "zod";
export const LoginSchema = z.object({
    email: z.string().min(1, "Email Harus Diisi").max(200, "Email terlalu panjang"),
    password: z.string().min(1, "Password minimal 1 karakter").max(100, "Password terlalu panjang"),
});

export type LoginType = z.infer<typeof LoginSchema>;