import { TeamsService } from "./teams.service.js";
import { Request,Response } from "express";

export class TeamsController {
    private teamsService: TeamsService;

    constructor() {
        this.teamsService = new TeamsService();
    }
    async getAllTeams(req: Request, res: Response) {
        try {
            const response = await this.teamsService.getAllTeams();
            return res.status(200).json({
                success: true,
                data: response.data,
                message: response.message
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: error instanceof Error ? error.message : "Terjadi kesalahan saat mengambil data teams"
            });
        }
    }
    async getTeamsFormat(req: Request, res: Response) {
        try {
            const response = await this.teamsService.getTeamFormat();
            return res.status(200).json({
                success: true,
                data: response.data,
                message: response.message
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: error instanceof Error ? error.message : "Terjadi kesalahan saat mengambil data teams"
            });
        }
    }
    async getTeam(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id!);
            const response = await this.teamsService.getTeam(id);
            return res.status(200).json({
                success: true,
                data: response.data,
                message: response.message
            });
        }
        catch (error) {
            return res.status(500).json({
                success: false,
                message: error instanceof Error ? error.message : "Terjadi kesalahan saat mengambil data team"
            });
        }
    }
    async addTeam(req: Request, res: Response) {
        try {
            const input = req.body;
            console.log(input);
            input.division_id = parseInt(input.division_id);
            input.bos_id = parseInt(input.bos_id) || null;
            if(req.file) {
                // Ambil path relatif dari uploads/
                const parts = req.file.path.split("uploads");
                const imagePath = parts[1]?.replace(/\\/g, "/") || "";
                input.img_url = `uploads${imagePath}`;
            }
            const response = await this.teamsService.addTeam(input);
            return res.status(201).json({
                success: true,
                data: response.data,
                message: response.message
            });
        }
        catch (error) {
            return res.status(500).json({
                success: false,
                message: error instanceof Error ? error.message : "Terjadi kesalahan saat menambahkan team"
            });
        }
    }
    async editTeam(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id!);
            const input = req.body;
            console.log(input);
            input.division_id = parseInt(input.division_id);
            input.bos_id = parseInt(input.bos_id) || null;
            console.log(input.role);
            if(req.file) {
                // Ambil path relatif dari uploads/
                const parts = req.file.path.split("uploads");
                const imagePath = parts[1]?.replace(/\\/g, "/") || "";
                input.img_url = `uploads${imagePath}`;
            }
            const response = await this.teamsService.editTeam(id, input);
            return res.status(200).json({
                success: true,
                data: response.data,
                message: response.message
            });
        }
        catch (error) {
            return res.status(500).json({
                success: false,
                message: error instanceof Error ? error.message : "Terjadi kesalahan saat mengedit team"
            });
        }
    }
    async deleteTeam(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id!);
            const response = await this.teamsService.deleteTeam(id);
            return res.status(200).json({
                success: true,
                data: response.data,
                message: response.message
            });
        }
        catch (error) {
            return res.status(500).json({
                success: false,
                message: error instanceof Error ? error.message : "Terjadi kesalahan saat menghapus team"
            });
        }
    }
}