import { LicenseService } from "./license.service.js";
import { Request, Response } from "express";

export class LicenseController {

    private licenseService: LicenseService;

    constructor() {
        this.licenseService = new LicenseService();
    }
    async getLicenses(req: Request, res: Response) {
        try {
            const result = await this.licenseService.getLicenses();
            return res.status(200).json({
                success: true,
                message: result.message,
                data: result.data
            });
        } catch (error) {
            return res.status(400).json({
                success: false,
                message: error instanceof Error ? error.message : "Terjadi kesalahan saat mengambil data licenses"
            });
        }
    }
    async addLicense(req: Request, res: Response) {
        try {
            const licenseData = req.body;
            if(req.file) {
                // Ambil path relatif dari uploads/
                const parts = req.file.path.split("uploads");
                const imagePath = parts[1]?.replace(/\\/g, "/") || "";
                licenseData.img_url = `uploads${imagePath}`;
            }
            const result = await this.licenseService.addLicense(licenseData);
            return res.status(201).json({
                success: true,
                message: result.message,
                data: result.data
            });
        } catch (error) {
            return res.status(400).json({
                success: false,
                message: error instanceof Error ? error.message : "Terjadi kesalahan saat menambahkan license"
            });
        }
    }
    async editLicense(req: Request, res: Response) {
        try {
            const licenseId = Number(req.params.id);
            const licenseData = req.body;
            if(req.file) {
                // Ambil path relatif dari uploads/
                const parts = req.file.path.split("uploads");
                const imagePath = parts[1]?.replace(/\\/g, "/") || "";
                licenseData.img_url = `uploads${imagePath}`;
            }
            const result = await this.licenseService.editLicense(licenseId, licenseData);
            return res.status(200).json({
                success: true,
                message: result.message,
                data: result.data
            });
        } catch (error) {
            return res.status(400).json({
                success: false,
                message: error instanceof Error ? error.message : "Terjadi kesalahan saat mengedit license"
            });
        }
    }
    async deleteLicense(req: Request, res: Response) {
        try {
            const licenseId = Number(req.params.id);
            const result = await this.licenseService.deleteLicense(licenseId);
            return res.status(200).json({
                success: true,
                message: result.message,
                data: result.data
            });
        } catch (error) {
            return res.status(400).json({
                success: false,
                message: error instanceof Error ? error.message : "Terjadi kesalahan saat menghapus license"
            });
        }
    }
}