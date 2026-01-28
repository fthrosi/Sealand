import { FlagsRepository } from "./flags.repository.js";
import { FlagInput } from "../../types/flags.types.js";



export class FlagsService {
    private flagsRepository: FlagsRepository;
    constructor() {
        this.flagsRepository = new FlagsRepository();
    }
    async getFlags() {
        try {
            const flags = await this.flagsRepository.getAllFlags();
            return {
                data: flags,
                message: "Flags retrieved successfully"
            };
        } catch (error) {
            throw error;
        }
    }
    async addFlag(data: FlagInput) {
        try {
            const flag = await this.flagsRepository.addFlag(data);
            return {
                data: flag,
                message: "Flag added successfully"
            };
        } catch (error) {
            throw error;
        }
    }
    async editFlag(id: number, data: FlagInput) {
        try {
            const existingFlag = await this.flagsRepository.getFlag(id);
            if (!existingFlag) {
                throw new Error("Flag not found");
            }
            const flag = await this.flagsRepository.editFlag(id, data);
            return {
                data: flag,
                message: "Flag updated successfully"
            };
        } catch (error) {
            throw error;
        }
    }
    async deleteFlag(id: number) {
        try {
            const existingFlag = await this.flagsRepository.getFlag(id);
            if (!existingFlag) {
                throw new Error("Flag not found");
            }
            const flag = await this.flagsRepository.deleteFlag(id);
            return {
                data: flag,
                message: "Flag deleted successfully"
            };
        } catch (error) {
            throw error;
        }
    }
}