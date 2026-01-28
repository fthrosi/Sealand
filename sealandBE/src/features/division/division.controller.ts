import { DivisionService } from "./division.service.js";
import { Request, Response } from "express";

export class DivisionController {
    private divisionService: DivisionService;
    constructor() {
        this.divisionService = new DivisionService();
    }
    async getAllDivisions(req: Request, res: Response) {
        try {
            const response = await this.divisionService.getAllDivisions();
            return res.status(200).json({
                success: true,
                data: response.data,
                message: response.message
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: error instanceof Error ? error.message : "Terjadi kesalahan saat mengambil data divisions"
            });
        }
    }
    async getDivision(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id!);
            const response = await this.divisionService.getDivision(id);
            return res.status(200).json({
                success: true,
                data: response.data,
                message: response.message
            });
        }
        catch (error) {
            return res.status(500).json({
                success: false,
                message: error instanceof Error ? error.message : "Terjadi kesalahan saat mengambil data division"
            });
        }
    }
    async addDivision(req: Request, res: Response) {
        try {
            const input = req.body;
            const response = await this.divisionService.addDivision(input);
            return res.status(201).json({
                success: true,
                data: response.data,
                message: response.message
            });
        }
        catch (error) {
            return res.status(500).json({
                success: false,
                message: error instanceof Error ? error.message : "Terjadi kesalahan saat menambahkan division"
            });
        }
    }
    async editDivision(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id!);
            const input = req.body;
            const response = await this.divisionService.editDivision(id, input);
            return res.status(200).json({
                success: true,
                data: response.data,
                message: response.message
            });
        }
        catch (error) {
            return res.status(500).json({
                success: false,
                message: error instanceof Error ? error.message : "Terjadi kesalahan saat mengedit division"
            });
        }
    }
    async deleteDivision(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id!);
            const response = await this.divisionService.deleteDivision(id);
            return res.status(200).json({
                success: true,
                data: response.data,
                message: response.message
            });
        }
        catch (error) {
            return res.status(500).json({
                success: false,
                message: error instanceof Error ? error.message : "Terjadi kesalahan saat menghapus division"
            });
        }
    }

}