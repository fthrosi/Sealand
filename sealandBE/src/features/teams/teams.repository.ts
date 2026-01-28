import prisma from "../../config/db.js";
import { TeamInput } from "../../types/teams.types.js";

export class TeamsRepository {
    async getAllTeams() {
        return await prisma.teams.findMany({
            include: {
                division: true,
                bos: {
                    select:{
                        name: true
                    }
                }
            }
        });
    }
    async getTeam(id: number) {
        return await prisma.teams.findUnique({
            where: { id },
            include: {
                division: true,
                bos: {
                    select:{
                        name: true
                    }
                }
            }
        });
    }
    async addTeam(data: TeamInput) {
        return await prisma.teams.create({
            data
        });
    }
    async editTeam(id: number, data: TeamInput) {
        return await prisma.teams.update({
            where: { id },
            data
        });
    }
    async deleteTeam(id: number) {
        return await prisma.teams.delete({
            where: { id }
        });
    }
}