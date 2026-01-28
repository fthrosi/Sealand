import prisma from "../../config/db.js";
import { FlagInput } from "../../types/flags.types.js";

export class FlagsRepository {
    async getAllFlags() {
        return await prisma.flags.findMany();
    }
    async getFlag(id: number) {
        return await prisma.flags.findUnique({
            where: { id }
        });
    }
    async addFlag(data: FlagInput) {
        return await prisma.flags.create({
            data
        });
    }
    async editFlag(id: number, data: FlagInput) {
        return await prisma.flags.update({
            where: { id },
            data
        });
    }
    async deleteFlag(id: number) {
        return await prisma.flags.delete({
            where: { id }
        });
    }

}