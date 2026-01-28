import { GalleryService } from "./gallery.service.js";
import { Request,Response } from "express";

export class GalleryController {
    private galleryService: GalleryService;

    constructor() {
        this.galleryService = new GalleryService();
    }
    async getAllGallery(req: Request, res: Response) {
        try {
            const response = await this.galleryService.getAllGallery();
            return res.status(200).json({
                success: true,
                data: response.data,
                message: response.message
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: error instanceof Error ? error.message : "Terjadi kesalahan saat mengambil data gallery"
            });
        }
    }
    async getGallery(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id!);
            const response = await this.galleryService.getGallery(id);
            return res.status(200).json({
                success: true,
                data: response.data,
                message: response.message
            });
        }
        catch (error) {
            return res.status(500).json({
                success: false,
                message: error instanceof Error ? error.message : "Terjadi kesalahan saat mengambil data gallery"
            });
        }
    }
    async addGallery(req: Request, res: Response) {
        try {
            const input = req.body;
            if (req.file) {
                // Ambil path relatif dari uploads/
                const parts = req.file.path.split("uploads");
                const imagePath = parts[1]?.replace(/\\/g, "/") || "";
                input.img_url = `uploads${imagePath}`;
            }
            const response = await this.galleryService.addGallery(input);
            return res.status(201).json({
                success: true,
                data: response.data,
                message: response.message
            });
        }
        catch (error) {
            return res.status(500).json({
                success: false,
                message: error instanceof Error ? error.message : "Terjadi kesalahan saat menambahkan gallery"
            });
        }
    }
    async editGallery(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id!);
            const input = req.body;
            if (req.file) {
                // Ambil path relatif dari uploads/
                const parts = req.file.path.split("uploads");
                const imagePath = parts[1]?.replace(/\\/g, "/") || "";
                input.img_url = `uploads${imagePath}`;
            }
            const response = await this.galleryService.editGallery(id, input);
            return res.status(200).json({
                success: true,
                data: response.data,
                message: response.message
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: error instanceof Error ? error.message : "Terjadi kesalahan saat mengedit gallery"
            });
        }
    }
    async deleteGallery(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id!);
            const response = await this.galleryService.deleteGallery(id);
            return res.status(200).json({
                success: true,
                data: response.data,
                message: response.message
            });
        }
        catch (error) {
            return res.status(500).json({
                success: false,
                message: error instanceof Error ? error.message : "Terjadi kesalahan saat menghapus gallery"
            });
        }
    }
}