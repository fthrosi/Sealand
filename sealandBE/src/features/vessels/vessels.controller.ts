import { VesselsService } from "./vessels.service.js";
import { Request,Response } from "express";

export class VesselsController {
    private vesselsService: VesselsService;

    constructor() {
        this.vesselsService = new VesselsService();
    }
    async getVessels(req: Request, res: Response) {
        try {
            const result = await this.vesselsService.getVessels();
            return res.status(200).json({
                success: true,
                message: result.message,
                data: result.data
            });
        } catch (error) {
            return res.status(400).json({
                success: false,
                message: error instanceof Error ? error.message : "Terjadi kesalahan saat mengambil data vessels"
            });
        }
    }
    async addVessel(req: Request, res: Response) {
        try {
            const vesselData = req.body;
            const result = await this.vesselsService.addVessel(vesselData);
            return res.status(201).json({
                success: true,
                message: result.message,
                data: result.data
            });
        } catch (error) {
            return res.status(400).json({
                success: false,
                message: error instanceof Error ? error.message : "Terjadi kesalahan saat menambahkan vessel"
            });
        }
    }
    async editVessel(req: Request, res: Response) {
        try {
            const vesselId = Number(req.params.id);
            const vesselData = req.body;
            const result = await this.vesselsService.editVessel(vesselId, vesselData);
            return res.status(200).json({
                success: true,
                message: result.message,
                data: result.data
            });
        }
        catch (error) {
            return res.status(400).json({
                success: false,
                message: error instanceof Error ? error.message : "Terjadi kesalahan saat mengedit vessel"
            });
        }
    }
    async deleteVessel(req: Request, res: Response) {
        try {
            const vesselId = Number(req.params.id);
            const result = await this.vesselsService.deleteVessel(vesselId);
            return res.status(200).json({
                success: true,
                message: result.message,
                data: result.data
            });
        }
        catch (error) {
            return res.status(400).json({
                success: false,
                message: error instanceof Error ? error.message : "Terjadi kesalahan saat menghapus vessel"
            });
        }
    }

}