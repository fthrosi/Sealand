import { LicenseRepository } from "./license.repository.js";
import { LicenseInput } from "../../types/license.types.js";
import fs from "fs/promises";

export class LicenseService {
    private licenseRepository: LicenseRepository;
    constructor() {
        this.licenseRepository = new LicenseRepository();
    }

    async getLicenses() {
        try {
            const licenses = await this.licenseRepository.getAllLicenses();
            return {
                data: licenses,
                message: "Licenses retrieved successfully"
            };
        } catch (error) {
            throw error;
        }
    }
    async addLicense(data: LicenseInput) {
        try {
            const license = await this.licenseRepository.addLicense(data);
            return {
                data: license,
                message: "License added successfully"
            };
        } catch (error) {
            throw error;
        }
    }
    async editLicense(id: number, data: LicenseInput) {
        try {
            const existingLicense = await this.licenseRepository.getLicense(id);
            if (!existingLicense) {
                throw new Error("License not found");
            }
            const license = await this.licenseRepository.editLicense(id, data);
            if (existingLicense.img_url && data?.img_url) {
                try {
                await fs.unlink(existingLicense.img_url);
                } catch (error) {
                throw new Error("Failed to delete old image");
                }
            }
            return {
                data: license,
                message: "License updated successfully"
            };
        } catch (error) {
            throw error;
        }
    }
    async deleteLicense(id: number) {
        try {
            const existingLicense = await this.licenseRepository.getLicense(id);
            if (!existingLicense) {
                throw new Error("License not found");
            }
            const license = await this.licenseRepository.deleteLicense(id);
            if (existingLicense.img_url) {
                try {
                await fs.unlink(existingLicense.img_url);
                } catch (error) {
                throw new Error("Failed to delete image");
                }
            }
            return {
                data: license,
                message: "License deleted successfully"
            };
        } catch (error) {
            throw error;
        }
    } 

}