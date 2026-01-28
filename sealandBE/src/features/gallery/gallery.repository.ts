import prisma from "../../config/db.js";

import { GalleryInput } from "../../types/galerry.types.js";

export class GalleryRepository {
    async getAllGallery() {
        return await prisma.galleries.findMany();
    }
    async getGallery(id: number) {
        return await prisma.galleries.findUnique({
            where: { id }
        });
    }
    async addGallery(data: GalleryInput) {
        return await prisma.galleries.create({
            data
        });
    }
    async editGallery(id: number, data: GalleryInput) {
        return await prisma.galleries.update({
            where: { id },
            data
        });
    }
    async deleteGallery(id: number) {
        return await prisma.galleries.delete({
            where: { id }
        });
    }
}