import { DivisionRepository } from "./division.repository.js";

export class DivisionService {
    private divisionRepository: DivisionRepository;
    constructor() {
        this.divisionRepository = new DivisionRepository();
    }
    async getAllDivisions() {
        try {
            const divisions = await this.divisionRepository.getAllDivisions();
            return {
                data: divisions,
                message: "Divisions retrieved successfully"
            };
        } catch (error) {
            throw error;
        }
    }
    async getDivision(id: number) {
        try {
            const division = await this.divisionRepository.getDivision(id);
            if (!division) {
                throw new Error("Division not found");
            }
            return {
                data: division,
                message: "Division retrieved successfully"
            };
        } catch (error) {
            throw error;
        }
    }
    async addDivision(data: { name: string }) {
        try {
            const newDivision = await this.divisionRepository.addDivision(data);
            return {
                data: newDivision,
                message: "Division added successfully"
            };
        } catch (error) {
            throw error;
        }
    }
    async editDivision(id: number, data: { name: string }) {
        try {
            const divisionExists = await this.divisionRepository.getDivision(id);
            if (!divisionExists) {
                throw new Error("Division not found");
            }
            const updatedDivision = await this.divisionRepository.editDivision(id, data);
            return {
                data: updatedDivision,
                message: "Division updated successfully"
            };
        }
        catch (error) {
            throw error;
        }
    }
    async deleteDivision(id: number) {
        try {
            const divisionExists = await this.divisionRepository.getDivision(id);
            if (!divisionExists) {
                throw new Error("Division not found");
            }
            const deletedDivision = await this.divisionRepository.deleteDivision(id);
            return {
                data: deletedDivision,
                message: "Division deleted successfully"
            };
        }
        catch (error) {
            throw error;
        }
    }
}