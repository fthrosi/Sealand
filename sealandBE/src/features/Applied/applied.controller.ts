import { AppliedService } from "./applied.service.js";
import { Request, Response } from "express";
import path from "path";
import fs from "fs";

export class AppliedController {
  private appliedService: AppliedService;
  constructor() {
    this.appliedService = new AppliedService();
  }
  async getAllApplied(req: Request, res: Response) {
    try {
      const result = await this.appliedService.getAllApplied();
      return res.status(200).json({
        success: true,
        data: result.data,
        message: result.message,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Terjadi kesalahan saat mengambil data applied jobs",
      });
    }
  }
  async addApplied(req: Request, res: Response) {
    try {
      const data = req.body;
      const files = req.files as
        | { [fieldname: string]: Express.Multer.File[] }
        | undefined;

      // Cek dan ambil nama file foto
      if (files?.["foto"]?.[0]) {
        data.img_url = files["foto"][0].filename;
      }

      // Cek CV
      if (files?.["cv"]?.[0]) {
        data.cv = files["cv"][0].filename;
      }

      const result = await this.appliedService.addApplied(data);

      return res.status(201).json({
        success: true,
        data: result.data,
        message: result.message,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Terjadi kesalahan saat menambahkan applied job",
      });
    }
  }
  async deleteApplied(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id!);
      const result = await this.appliedService.deleteApplied(id);
      return res.status(200).json({
        success: true,
        data: result.data,
        message: result.message,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Terjadi kesalahan saat menghapus applied job",
      });
    }
  }
  async getFileFoto(req: Request, res: Response) {
        const { filename } = req.params;
        // Arahkan ke folder storage/private/photos
        const filePath = path.join(process.cwd(), 'storage/private/photos', filename as string);

        if (fs.existsSync(filePath)) {
            return res.sendFile(filePath);
        } else {
            return res.status(404).json({ message: "Foto tidak ditemukan" });
        }
    }
    async downloadFileFoto(req: Request, res: Response) {
        const { filename } = req.params;
        // Arahkan ke folder storage/private/photos
        const filePath = path.join(process.cwd(), 'storage/private/photos', filename as string);

        if (fs.existsSync(filePath)) {
            return res.download(filePath);
        } else {
            return res.status(404).json({ message: "Foto tidak ditemukan" });
        }
    }

    async getFileCV(req: Request, res: Response) {
        const { filename } = req.params;
        // Arahkan ke folder storage/private/documents
        const filePath = path.join(process.cwd(), 'storage/private/documents', filename as string);

        if (fs.existsSync(filePath)) {
            // Kita gunakan res.sendFile untuk melihat di browser, 
            // atau res.download(filePath) jika ingin otomatis terdownload.
            return res.download(filePath);
        } else {
            return res.status(404).json({ message: "CV tidak ditemukan" });
        }
    }
}
