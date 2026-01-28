export type refreshRepository = {
    userId: number;
    tokenHash: string;
    expiresAt: Date;
}

export type jwtPayload = {
    userId: number;
    email: string;
    iat?: number;
    exp?: number;
}