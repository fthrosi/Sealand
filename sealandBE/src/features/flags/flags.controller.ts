import { FlagsService } from "./flags.service.js";
import { Request, Response } from "express";

export class FlagsController {
    private flagsService: FlagsService;

    constructor() {
        this.flagsService = new FlagsService();
    }
    async getFlags(req: Request, res: Response) {
        try {
            const result = await this.flagsService.getFlags();
            return res.status(200).json({
                success: true,
                message: result.message,
                data: result.data
            });
        } catch (error) {
            return res.status(400).json({
                success: false,
                message: error instanceof Error ? error.message : "Terjadi kesalahan saat mengambil data flags"
            });
        }
    }

    async addFlag(req: Request, res: Response) {
        try {
            const flagData = req.body;
            const result = await this.flagsService.addFlag(flagData);
            return res.status(201).json({
                success: true,
                message: result.message,
                data: result.data
            });
        } catch (error) {
            return res.status(400).json({
                success: false,
                message: error instanceof Error ? error.message : "Terjadi kesalahan saat menambahkan flag"
            });
        }
    }

    async editFlag(req: Request, res: Response) {
        try {
            const flagId = Number(req.params.id);
            const flagData = req.body;
            const result = await this.flagsService.editFlag(flagId, flagData);
            return res.status(200).json({
                success: true,
                message: result.message,
                data: result.data
            });
        } catch (error) {
            return res.status(400).json({
                success: false,
                message: error instanceof Error ? error.message : "Terjadi kesalahan saat mengedit flag"
            });
        }
    }

    async deleteFlag(req: Request, res: Response) {
        try {
            const flagId = Number(req.params.id);
            const result = await this.flagsService.deleteFlag(flagId);
            return res.status(200).json({
                success: true,
                message: result.message,
                data: result.data
            });
        } catch (error) {
            return res.status(400).json({
                success: false,
                message: error instanceof Error ? error.message : "Terjadi kesalahan saat menghapus flag"
            });
        }
    }
}