import { VesselsRepository } from "./vessels.repository.js";
import { VesselInput } from "../../types/vessel.types.js";


export class VesselsService {
    private vesselsRepository: VesselsRepository;
    constructor() {
        this.vesselsRepository = new VesselsRepository();
    }

    async getVessels() {
        try {
            const vessels = await this.vesselsRepository.getAllVessels();
            return {
                data: vessels,
                message: "Vessels retrieved successfully"
            };
        } catch (error) {
            throw error;
        }
    }
    async getVessel(id: number) {
        try {
            const vessel = await this.vesselsRepository.getVessel(id);
            return {
                data: vessel,
                message: "Vessel retrieved successfully"
            };
        } catch (error) {
            throw error;
        }
    }
    async addVessel(data: VesselInput) {
        try {
            const vessel = await this.vesselsRepository.addVessel(data);
            return {
                data: vessel,
                message: "Vessel added successfully"
            };
        } catch (error) {
            throw error;
        }
    }
    async editVessel(id: number, data: VesselInput) {
        try {
            const existingVessel = await this.vesselsRepository.getVessel(id);
            if (!existingVessel) {
                throw new Error("Vessel not found");
            }
            const vessel = await this.vesselsRepository.editVessel(id, data);
            return {
                data: vessel,
                message: "Vessel updated successfully"
            };
        } catch (error) {
            throw error;
        }
    }
    async deleteVessel(id: number) {
        try {
            const existingVessel = await this.vesselsRepository.getVessel(id);
            if (!existingVessel) {
                throw new Error("Vessel not found");
            }
            const vessel = await this.vesselsRepository.deleteVessel(id);
            return {
                data: vessel,
                message: "Vessel deleted successfully"
            };
        } catch (error) {
            throw error;
        }
    }
}