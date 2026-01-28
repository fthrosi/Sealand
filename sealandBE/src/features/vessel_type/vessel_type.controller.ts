import { VesselTypeService } from "./vessel_type.service.js";
import { Request, Response } from "express";

export class VesselTypeController {
    private vesselTypeService: VesselTypeService;

    constructor() {
        this.vesselTypeService = new VesselTypeService();
    }
    async getVesselTypes(req: Request, res: Response) {
        try {
            const result = await this.vesselTypeService.getVesselTypes();
            return res.status(200).json({
                success: true,
                message: result.message,
                data: result.data
            });
        } catch (error) {
            return res.status(400).json({
                success: false,
                message: error instanceof Error ? error.message : "Terjadi kesalahan saat mengambil data vessel types"
            });
        }
    }
    async addVesselType(req: Request, res: Response) {
        try {
            const vesselTypeData = req.body;
            if(req.file) {
                // Ambil path relatif dari uploads/
                const parts = req.file.path.split("uploads");
                const imagePath = parts[1]?.replace(/\\/g, "/") || "";
                vesselTypeData.img_url = `uploads${imagePath}`;
            }
            const result = await this.vesselTypeService.addVesselType(vesselTypeData);
            return res.status(201).json({
                success: true,
                message: result.message,
                data: result.data
            });
        } catch (error) {
            return res.status(400).json({
                success: false,
                message: error instanceof Error ? error.message : "Terjadi kesalahan saat menambahkan vessel type"
            });
        }
    }
    async editVesselType(req: Request, res: Response) {
        try {
            const vesselTypeId = Number(req.params.id);
            const vesselTypeData = req.body;
            if(req.file) {
                // Ambil path relatif dari uploads/
                const parts = req.file.path.split("uploads");
                const imagePath = parts[1]?.replace(/\\/g, "/") || "";
                vesselTypeData.img_url = `uploads${imagePath}`;
            }
            const result = await this.vesselTypeService.editVesselType(vesselTypeId, vesselTypeData);
            return res.status(200).json({
                success: true,
                message: result.message,
                data: result.data
            });
        }
        catch (error) {
            return res.status(400).json({
                success: false,
                message: error instanceof Error ? error.message : "Terjadi kesalahan saat mengedit vessel type"
            });
        }
    }
    async deleteVesselType(req: Request, res: Response) {
        try {
            const vesselTypeId = Number(req.params.id);
            const result = await this.vesselTypeService.deleteVesselType(vesselTypeId);
            return res.status(200).json({
                success: true,
                message: result.message,
                data: result.data
            });
        }
        catch (error) {
            return res.status(400).json({
                success: false,
                message: error instanceof Error ? error.message : "Terjadi kesalahan saat menghapus vessel type"
            });
        }
    }
}