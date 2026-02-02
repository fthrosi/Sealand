import prisma from "../../config/db.js";
import { Career,CareerInput } from "../../types/career.types.js";


export class CareerRepository {
    async getAllCareers() {
        return await prisma.jobs.findMany({
            include: {
                vessel_type: true
            }
        });
    }
    async getAvailableCareers() {
        return await prisma.jobs.findMany({
            where: {
                status: "Open"
            },
            include: {  
                vessel_type: true
            }
        });
    }
    async getCareer(id: number) {
        return await prisma.jobs.findUnique({
            where: { id },
            include: {
                vessel_type: true
            }
        });
    }
    async addCareer(data: CareerInput) {
        return await prisma.jobs.create({
            data
        });
    }
    async editCareer(id: number, data: CareerInput) {
        return await prisma.jobs.update({
            where: { id },
            data
        });
    }
    async deleteCareer(id: number) {
        return await prisma.jobs.delete({
            where: { id }
        });
    }
}