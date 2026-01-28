import prisma from "../../config/db.js";
import { VesselInput } from "../../types/vessel_type.types.js";

export class VesselTypeRepository {
    async getAllVesselTypes() {
        return await prisma.vessel_types.findMany();
    }
    async getVesselType(id: number) {
        return await prisma.vessel_types.findUnique({
            where: { id }
        });
    }
    async addVesselType(data: VesselInput) {
        return await prisma.vessel_types.create({
            data
        });
    }
    async editVesselType(id: number, data: VesselInput) {
        return await prisma.vessel_types.update({
            where: { id },
            data
        });
    }
    async deleteVesselType(id: number) {
        return await prisma.vessel_types.delete({
            where: { id }
        });
    }

}