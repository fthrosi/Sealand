import { CareerRepository } from "./career.repository.js";
import { CareerInput } from "../../types/career.types.js";

export class CareerService {
    private careerRepository: CareerRepository;
    constructor() {
        this.careerRepository = new CareerRepository();
    }

    async getCareers() {
        try {
            const careers = await this.careerRepository.getAllCareers();
            return {
                data: careers,
                message: "Careers retrieved successfully"
            };
        } catch (error) {
            throw error;
        }
    }

    async getCareer(id: number) {
        try {
            const career = await this.careerRepository.getCareer(id);
            if (!career) {
                throw new Error("Career not found");
            }
            return {
                data: career,
                message: "Career retrieved successfully"
            };
        } catch (error) {
            throw error;
        }
    }

    async addCareer(data: CareerInput) {
        try {
            const career = await this.careerRepository.addCareer(data);
            return {
                data: career,
                message: "Career added successfully"
            };
        } catch (error) {
            throw error;
        }
    }

    async editCareer(id: number, data: CareerInput) {
        try {
            const career = await this.careerRepository.editCareer(id, data);
            return {
                data: career,
                message: "Career updated successfully"
            };
        } catch (error) {
            throw error;
        }
    }
    async deleteCareer(id: number) {
        try {
            const career = await this.careerRepository.deleteCareer(id);
            return {
                data: career,
                message: "Career deleted successfully"
            };
        } catch (error) {
            throw error;
        }
    }
}