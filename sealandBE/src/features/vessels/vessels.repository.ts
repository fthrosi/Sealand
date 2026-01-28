import prisma from "../../config/db.js";
import { VesselInput } from "../../types/vessel.types.js";

export class VesselsRepository {
    async getAllVessels() {
        return await prisma.vessels.findMany({
            include:{
                type:true,
                flag:true
            }
        });
    }
    async getVessel(id: number) {
        return await prisma.vessels.findUnique({
            where: { id },
            include:{
                type:true,
                flag:true
            }
        });
    }
    async addVessel(data: VesselInput) {
        return await prisma.vessels.create({
            data
        });
    }
    async editVessel(id: number, data: VesselInput) {
        return await prisma.vessels.update({
            where: { id },
            data
        });
    }
    async deleteVessel(id: number) {
        return await prisma.vessels.delete({
            where: { id }
        });
    }

}