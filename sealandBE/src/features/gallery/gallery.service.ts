import { GalleryRepository } from "./gallery.repository.js";
import { GalleryInput } from "../../types/galerry.types.js";
import fs from "fs/promises";

export class GalleryService {
    private galleryRepository: GalleryRepository;

    constructor() {
        this.galleryRepository = new GalleryRepository();
    }

    async getAllGallery() {
        try {
            const galleries = await this.galleryRepository.getAllGallery();
            return {
                data: galleries,
                message: "Galleries retrieved successfully"
            };
        } catch (error) {
            throw error;
        }
    }
    async getGallery(id: number) {
        try {
            const gallery = await this.galleryRepository.getGallery(id);
            if (!gallery) {
                throw new Error("Gallery not found");
            }
            return {
                data: gallery,
                message: "Gallery retrieved successfully"
            };
        }
        catch (error) {
            throw error;
        }
    }
    async addGallery(input: GalleryInput) {
        try {
            const newGallery = await this.galleryRepository.addGallery(input);
            return {
                data: newGallery,
                message: "Gallery added successfully"
            };
        }
        catch (error) {
            throw error;
        }
    }
    async editGallery(id: number, input: GalleryInput) {
        try {
            const galleryExists = await this.galleryRepository.getGallery(id);
            if (!galleryExists) {
                throw new Error("Gallery not found");
            }
            if (galleryExists.img_url && input?.img_url) {
                try {
                    await fs.unlink(galleryExists.img_url);
                } catch (error) {
                    throw new Error("Failed to delete old image");
                }
            }
            const updatedGallery = await this.galleryRepository.editGallery(id, input);
            return {
                data: updatedGallery,
                message: "Gallery updated successfully"
            };
        } catch (error) {
            throw error;
        }
    }
    async deleteGallery(id: number) {
        try {
            const galleryExists = await this.galleryRepository.getGallery(id);
            if (!galleryExists) {
                throw new Error("Gallery not found");
            }
            const deletedGallery = await this.galleryRepository.deleteGallery(id);
            if (deletedGallery.img_url) {
                try {
                    await fs.unlink(deletedGallery.img_url);
                } catch (error) {
                    throw new Error("Failed to delete old image");
                }
            }
            return {
                data: deletedGallery,
                message: "Gallery deleted successfully"
            };
        } catch (error) {
            throw error;
        }
    }
}