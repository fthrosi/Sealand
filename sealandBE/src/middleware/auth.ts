import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { jwtPayload } from "../types/auth.types.js";
import { AuthService } from "../features/auth/auth.service.js";

export interface CustomRequest extends Request {
  user?: jwtPayload;
}

export async function validateLoginBody(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Email dan password harus diisi",
    });
  }
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: "Email tidak valid" });
  }
  if (password.length < 6) {
    return res.status(400).json({ error: "Password minimal 6 karakter" });
  }
  const emailExists = await new AuthService().findByEmail(email);
  if (!emailExists) {
    return res.status(400).json({ error: "Email tidak ditemukan" });
  }
  next();
}

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
    try {
        // 1. Ambil accessToken dari cookie
        const token = req.cookies.accessToken;

        if (!token) {
            return res.status(401).json({ 
                success: false, 
                message: "Akses ditolak, silakan login" 
            });
        }

        // 2. Verifikasi token
        const secret = process.env.JWT_SECRET as string;
        const decoded = jwt.verify(token, secret);

        // 3. Simpan data user ke dalam req agar bisa dipakai di controller selanjutnya
        (req as any).user = decoded;

        next(); // Lanjut ke controller
    } catch (error) {
        // Jika token expired atau tidak valid
        return res.status(401).json({ 
            success: false, 
            message: "Sesi berakhir atau token tidak valid" 
        });
    }
};
