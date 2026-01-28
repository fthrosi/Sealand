import { PortfolioRepository } from "./portfolio.repository.js";
import { PortfolioInput,PortfolioOutput } from "../../types/portfolio.types.js";
import fs from "fs/promises";

export class PortfolioService {
    private portfolioRepository: PortfolioRepository;
    constructor() {
        this.portfolioRepository = new PortfolioRepository();
    }

    async getPortfolio() {
        try {
            const portfolios: PortfolioOutput[] = await this.portfolioRepository.getAllPortfolio();
            return {
                data: portfolios,
                message: "Portfolios retrieved successfully"
            };
        } catch (error) {
            throw error;
        }
    }
    async addPortfolio(input: PortfolioInput) {
        try {
            const newPortfolio = await this.portfolioRepository.addPortfolio(input);
            return {
                data: newPortfolio,
                message: "Portfolio added successfully"
            };
        } catch (error) {
            throw error;
        }
    }
    async editPortfolio(id: number, input: PortfolioInput) {
        try {
            const portfolioExists = await this.portfolioRepository.getPortfolio(id);
            if (!portfolioExists) {
                throw new Error("Portfolio not found");
            }
            if (portfolioExists.img_url && input?.img_url) {
                try {
                await fs.unlink(portfolioExists.img_url);
                } catch (error) {
                throw new Error("Failed to delete old image");
                }
            }
            const updatedPortfolio = await this.portfolioRepository.editPortfolio(id, input);
            return {
                data: updatedPortfolio,
                message: "Portfolio updated successfully"
            };
        } catch (error) {
            throw error;
        }
    }
    async deletePortfolio(id: number) {
        try {
            const portfolioExists = await this.portfolioRepository.getPortfolio(id);
            if (!portfolioExists) {
                throw new Error("Portfolio not found");
            }
            const deletedPortfolio = await this.portfolioRepository.deletePortfolio(id);
            if (deletedPortfolio.img_url) {
                try {
                await fs.unlink(deletedPortfolio.img_url);
                } catch (error) {
                throw new Error("Failed to delete old image");
                }
            }
            return {
                data: deletedPortfolio,
                message: "Portfolio deleted successfully"
            };
        } catch (error) {
            throw error;
        }
    }
}