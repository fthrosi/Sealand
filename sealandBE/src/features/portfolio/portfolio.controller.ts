import { PortfolioService } from "./portfolio.service.js";
import { PortfolioInput,PortfolioOutput } from "../../types/portfolio.types.js";
import { Request, Response } from "express";

export class PortfolioController {
    private portfolioService: PortfolioService;

    constructor() {
        this.portfolioService = new PortfolioService();
    }

    async getPortfolio(res: Response) {
        try {
            const portfolios = await this.portfolioService.getPortfolio();
            return res.status(200).json({
                success: true,
                data: portfolios.data,
                message: portfolios.message
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: error instanceof Error ? error.message : "Terjadi kesalahan saat mengambil data portfolio"
            });
        }
    }
    async addPortfolio(req: Request, res: Response) {
        try {
            const input: PortfolioInput = req.body;
            if (req.file) {
                // Ambil path relatif dari uploads/
                const parts = req.file.path.split("uploads");
                const imagePath = parts[1]?.replace(/\\/g, "/") || "";
                input.img_url = `uploads${imagePath}`;
            }
            const result = await this.portfolioService.addPortfolio(input);
            return res.status(201).json({
                success: true,
                data: result.data,
                message: result.message
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: error instanceof Error ? error.message : "Terjadi kesalahan saat menambahkan portfolio"
            });
        }
    }
    async editPortfolio(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id!);
            const input: PortfolioInput = req.body;
            if (req.file) {
                // Ambil path relatif dari uploads/
                const parts = req.file.path.split("uploads");
                const imagePath = parts[1]?.replace(/\\/g, "/") || "";
                input.img_url = `uploads${imagePath}`;
            }
            const result = await this.portfolioService.editPortfolio(id, input);
            return res.status(200).json({
                success: true,
                data: result.data,
                message: result.message
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: error instanceof Error ? error.message : "Terjadi kesalahan saat mengedit portfolio"
            });
        }
    }
    async deletePortfolio(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id!);
            const result = await this.portfolioService.deletePortfolio(id);
            return res.status(200).json({
                success: true,
                data: result.data,
                message: result.message
            });
        }
        catch (error) {
            return res.status(500).json({
                success: false,
                message: error instanceof Error ? error.message : "Terjadi kesalahan saat menghapus portfolio"
            });
        }
    }

}