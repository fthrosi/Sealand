import { VesselTypeRepository } from "./vessel_type.repository.js";
import { VesselInput } from "../../types/vessel_type.types.js";
import fs from "fs/promises";

export class VesselTypeService {
    private vesselTypeRepository: VesselTypeRepository;

    constructor() {
        this.vesselTypeRepository = new VesselTypeRepository();
    }
    async getVesselTypes() {
        try {
            const vesselTypes = await this.vesselTypeRepository.getAllVesselTypes();
            return {
                data: vesselTypes,
                message: "Vessel types retrieved successfully"
            };
        } catch (error) {
            throw error;
        }
    }
    async addVesselType(data: VesselInput) {
        try {
            const vesselType = await this.vesselTypeRepository.addVesselType(data);
            return {
                data: vesselType,
                message: "Vessel type added successfully"
            };
        } catch (error) {
            throw error;
        }
    }
    async editVesselType(id: number, data: VesselInput) {
        try {
            const existingVesselType = await this.vesselTypeRepository.getVesselType(id);
            if (!existingVesselType) {
                throw new Error("Vessel type not found");
            }
            const vesselType = await this.vesselTypeRepository.editVesselType(id, data);
            if (existingVesselType.img_url && data?.img_url) {
                try {
                await fs.unlink(existingVesselType.img_url);
                } catch (error) {
                throw new Error("Failed to delete old image");
                }
            }
            return {
                data: vesselType,
                message: "Vessel type updated successfully"
            };
        } catch (error) {
            throw error;
        }
    }
    async deleteVesselType(id: number) {
        try {
            const existingVesselType = await this.vesselTypeRepository.getVesselType(id);
            if (!existingVesselType) {
                throw new Error("Vessel type not found");
            }
            const vesselType = await this.vesselTypeRepository.deleteVesselType(id);
            if (existingVesselType.img_url) {
                try {
                await fs.unlink(existingVesselType.img_url);
                } catch (error) {
                throw new Error("Failed to delete image");
                }
            }
            return {
                data: vesselType,
                message: "Vessel type deleted successfully"
            };
        } catch (error) {
            throw error;
        }
    }

}