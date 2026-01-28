import prisma from "../../config/db.js";
import { LicenseInput } from "../../types/license.types.js";

export class LicenseRepository {
    async getAllLicenses() {
        return await prisma.licenses.findMany();
    }
    async getLicense(id: number) {
        return await prisma.licenses.findUnique({
            where: { id }
        });
    }
    async addLicense(data: LicenseInput) {
        return await prisma.licenses.create({
            data
        });
    }
    async editLicense(id: number, data: LicenseInput) {
        return await prisma.licenses.update({
            where: { id },
            data
        });
    }
    async deleteLicense(id: number) {
        return await prisma.licenses.delete({
            where: { id }
        });
    }
}