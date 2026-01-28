import { AppliedRepository } from "./applied.repository.js";
import { AppliedJobInput } from "../../types/appliedJob.types.js";
import fs from "fs/promises";
import path from "path";

export class AppliedService {
    private appliedRepository: AppliedRepository;
    constructor() {
        this.appliedRepository = new AppliedRepository();
    }

    async getAllApplied() {
        try {
            const appliedJobs = await this.appliedRepository.getAllApplied();
            return {
                data: appliedJobs,
                message: "Applied jobs retrieved successfully"
            };
        } catch (error) {
            throw error;
        }
    }
    async addApplied(data: AppliedJobInput) {
        data.job_id = Number(data.job_id);
        try {
            const newAppliedJob = await this.appliedRepository.addApplied(data);
            return {
                data: newAppliedJob,
                message: "Applied job added successfully"
            };
        } catch (error) {
            throw error;
        }
    }
    async deleteApplied(id: number) {
        try {
            const appliedJobExists = await this.appliedRepository.getApplied(id);
            if (!appliedJobExists) {
                throw new Error("Applied job not found");
            }
            const deletedAppliedJob = await this.appliedRepository.deleteApplied(id);
            try {
                if (appliedJobExists.cv) {
                    await fs.unlink(path.join(process.cwd(), 'storage/private/documents', appliedJobExists.cv));
                }
                if (appliedJobExists.img_url) {
                    await fs.unlink(path.join(process.cwd(), 'storage/private/photos', appliedJobExists.img_url));
                }
            } catch (error) {
                throw new Error("Failed to delete associated files");
            }
            return {
                data: deletedAppliedJob,
                message: "Applied job deleted successfully"
            };
        }
        catch (error) {
            throw error;
        }
    }
}