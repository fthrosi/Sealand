import { CareerService } from "./career.service.js";
import { Request, Response } from "express";

export class CareerController {
    private careerService: CareerService;

    constructor() {
        this.careerService = new CareerService();
    }
    async getCareers(req: Request, res: Response) {
        try {
            const result = await this.careerService.getCareers();
            return res.status(200).json({
                success: true,
                message: result.message,
                data: result.data
            });
        } catch (error) {
            return res.status(400).json({
                success: false,
                message: error instanceof Error ? error.message : "Terjadi kesalahan saat mengambil data careers"
            });
        }
    }
    async addCareer(req: Request, res: Response) {
        try {
            const careerData = req.body;
            const result = await this.careerService.addCareer(careerData);
            return res.status(201).json({
                success: true,
                message: result.message,
                data: result.data
            });
        }
        catch (error) {
            return res.status(400).json({
                success: false,
                message: error instanceof Error ? error.message : "Terjadi kesalahan saat menambahkan career"
            });
        }
    }
    async editCareer(req: Request, res: Response) {
        try {
            const careerId = Number(req.params.id);
            const careerData = req.body;
            const result = await this.careerService.editCareer(careerId, careerData);
            return res.status(200).json({
                success: true,
                message: result.message,
                data: result.data
            });
        }
        catch (error) {
            return res.status(400).json({
                success: false,
                message: error instanceof Error ? error.message : "Terjadi kesalahan saat mengedit career"
            });
        }
    }
    async deleteCareer(req: Request, res: Response) {
        try {
            const careerId = Number(req.params.id);
            const result = await this.careerService.deleteCareer(careerId);
            return res.status(200).json({
                success: true,
                message: result.message,
                data: result.data
            });
        }
        catch (error) {
            return res.status(400).json({
                success: false,
                message: error instanceof Error ? error.message : "Terjadi kesalahan saat menghapus career"
            });
        }
    }

}