import prisma from "../../config/db.js";
import {refreshRepository} from "../../types/auth.types.js";


export class AuthRepository {
    async findByEmail(email: string) {
        return await prisma.users.findFirst({
        where: { email }
        });
    }
    async findById(id: number) {
        return await prisma.users.findUnique({
            where: { id }
        });
    }

    async saveRefreshToken(data: refreshRepository) {
        return await prisma.refreshToken.create({
            data: {
                userId: data.userId,
                tokenHash: data.tokenHash,
                expiresAt: data.expiresAt
            }
        });
    }

    async deleteRefreshToken(tokenHash: string) {
        return await prisma.refreshToken.deleteMany({
            where: { tokenHash }
        });
    }

    async findRefreshToken(tokenHash: string) {
        return await prisma.refreshToken.findFirst({
            where: { tokenHash }
        });
    }

    async deleteAllUserTokens(userId: number) {
        return await prisma.refreshToken.deleteMany({
            where: { userId }
        });
    }

    async getAllUserTokens(userId: number) {
        return await prisma.refreshToken.findMany({
            where: { userId }
        });
    }

    async deleteRefreshTokenById(id: string) {
        return await prisma.refreshToken.delete({
            where: { id }
        });
    }
    async findRefreshTokensByUserId(userId: number) {
    return await prisma.refreshToken.findMany({
        where: {
            userId: userId,
            expiresAt: { gt: new Date() }
        }
    });
}
}

