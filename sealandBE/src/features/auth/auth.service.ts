import { AuthRepository } from "./auth.repository.js";
import bcrypt from "bcrypt";
import { Request } from "express";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { refreshRepository } from "../../types/auth.types.js";
import { jwtPayload } from "../../types/auth.types.js";

export class AuthService {
    private authRepository: AuthRepository;

    constructor() {
        this.authRepository = new AuthRepository();
    }

    async login(email: string, password: string) {
        try {
            const user = await this.authRepository.findByEmail(email);
            
            if (!user) throw new Error("Email atau password salah");
            
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) throw new Error("Email atau password salah");
            
            const secretToken = process.env.JWT_SECRET as string;
            const payload : jwtPayload = { userId: user.id, email: user.email };
            const accessToken = jwt.sign(payload, secretToken, { expiresIn: '1h' });
            const refreshToken = crypto.randomBytes(40).toString('hex');
            const refreshTokenHash = await bcrypt.hash(refreshToken, 10);
            const expiryDate = new Date();
            expiryDate.setDate(expiryDate.getDate() + 30);
            const refreshTokenData: refreshRepository = {
                userId: user.id,
                tokenHash: refreshTokenHash,
                expiresAt: expiryDate
            }
            await this.authRepository.saveRefreshToken(refreshTokenData);

            return {
                message: "Login berhasil",
                data: {
                    accessToken,
                    refreshToken,
                    payload
                }
            };
            
        } catch (error) {
            throw error;
        }
    }
    async findByEmail(email: string) {
        try {
            const user = await this.authRepository.findByEmail(email);
            return user;
        } catch (error) {
            throw error;
        }
    }

    async saveRefreshToken(data: refreshRepository) {
        try {
            const result = await this.authRepository.saveRefreshToken(data);
            return result;
        } catch (error) {
            throw error;
        }
    }

    // async deleteRefreshToken(tokenHash: string) {
    //     try {
    //         const result = await this.authRepository.deleteRefreshToken(tokenHash);
    //         return result;
    //     } catch (error) {
    //         throw error;
    //     }
    // }
    
    // async findRefreshToken(tokenHash: string) {
    //     try {
    //         const result = await this.authRepository.findRefreshToken(tokenHash);
    //         return result;
    //     } catch (error) {
    //         throw error;
    //     }
    // }

    async deleteAllUserTokens(userId: number) {
        try {
            const result = await this.authRepository.deleteAllUserTokens(userId);
            return result;
        } catch (error) {
            throw error;
        }
    }

    // async getAllUserTokens(userId: number) {
    //     try {
    //         const result = await this.authRepository.getAllUserTokens(userId);
    //         return result;
    //     } catch (error) {
    //         throw error;
    //     }
    // }

    async verifyAndDeleteRefreshToken(userId: number, refreshToken: string) {
        try {
            const tokens = await this.authRepository.findRefreshTokensByUserId(userId);
            for (const token of tokens) {
                const isValid = await bcrypt.compare(refreshToken, token.tokenHash);
                if (isValid) {
                    await this.authRepository.deleteRefreshTokenById(token.id);
                    return true;
                }
            }
            return false;
        } catch (error) {
            throw error;
        }
    }

    async refreshToken(rawRefreshToken: string, rawPayload: string) {
    try {
        // 1. Parse string JSON dari cookie payload
        console.log("Raw Payload:", rawPayload);
        console.log("Raw Refresh Token:", rawRefreshToken);
        const payload = JSON.parse(rawPayload);
        const userId = (payload.userId) as number;

        // 2. Ambil semua hash token milik user tersebut dari DB
        const userTokens = await this.authRepository.findRefreshTokensByUserId(userId);

        let validTokenData = null;

        // 3. Bandingkan raw token dari cookie dengan hash di DB satu per satu
        for (const tokenData of userTokens) {
            const isMatch = await bcrypt.compare(rawRefreshToken, tokenData.tokenHash);
            if (isMatch) {
                validTokenData = tokenData;
                break;
            }
        }

        if (!validTokenData) throw new Error("Sesi tidak valid");

        // 4. Cek apakah expired secara waktu
        if (new Date() > validTokenData.expiresAt) {
            await this.authRepository.deleteRefreshTokenById(validTokenData.id);
            throw new Error("Sesi telah berakhir, silakan login ulang");
        }

        // 5. Generate Access Token baru (karena payload sudah ada, tinggal sign)
        const secretToken = process.env.JWT_SECRET as string;
        const newAccessToken = jwt.sign(payload, secretToken, { expiresIn: '1h' });

        return {
            accessToken: newAccessToken,
            payload
        };
    } catch (error) {
        throw error;
    }
}
}