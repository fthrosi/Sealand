import prisma from "../../config/db.js";

export class DivisionRepository {
    async getAllDivisions() {
        return await prisma.divisions.findMany();
    }
    async getDivision(id: number) {
        return await prisma.divisions.findUnique({
            where: { id }
        });
    }
    async addDivision(data: { name: string }) {
        return await prisma.divisions.create({
            data
        });
    }
    async editDivision(id: number, data: { name: string }) {
        return await prisma.divisions.update({
            where: { id },
            data
        });
    }
    async deleteDivision(id: number) {
        return await prisma.divisions.delete({
            where: { id }
        });
    }

}