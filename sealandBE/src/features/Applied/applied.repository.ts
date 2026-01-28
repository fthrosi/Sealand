import prisma from "../../config/db.js";
import { AppliedJobInput } from "../../types/appliedJob.types.js";

export class AppliedRepository {
    async getAllApplied() {
        return await prisma.job_applied.findMany({
            include:{
                job: {
                    select: {
                        title: true,
                        vessel_type: {
                            select: {
                                name: true
                            }
                        },
                        route: true
                    }
                }
            }
        });
    }
    async getApplied(id: number) {
        return await prisma.job_applied.findUnique({
            where: { id }
        });
    }
    async addApplied(data: AppliedJobInput) {
        return await prisma.job_applied.create({
            data
        });
    }
    async deleteApplied(id: number) {
        return await prisma.job_applied.delete({
            where: { id }
        });
    }
}