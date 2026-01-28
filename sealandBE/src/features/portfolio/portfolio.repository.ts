import prisma from "../../config/db.js";
import { PortfolioInput } from "../../types/portfolio.types.js";

export class PortfolioRepository {
    async getAllPortfolio(){
        try {
            return await prisma.portfolios.findMany();
        } catch (error) {
            throw error;
        }
    }
    async getPortfolio(id: number){
        try {
            return await prisma.portfolios.findUnique({
                where: { id }
            });
        } catch (error) {
            throw error;
        }
    }
    async addPortfolio(input: PortfolioInput){
        try {
            const result = await prisma.portfolios.create({
                data: {
                    ...input
                }
            });
            return result;
        } catch (error) {
            throw error;
        }
    }

    async editPortfolio(id: number, input: PortfolioInput){
        try {
            const result = await prisma.portfolios.update({
                where: { id },
                data: {
                    ...input
                }
            });
            return result;
        } catch (error) {
            throw error;
        }
    }

    async deletePortfolio(id: number){
        try {
            const result = await prisma.portfolios.delete({
                where: { id }
            });
            return result;
        } catch (error) {
            throw error;
        }
    }
}