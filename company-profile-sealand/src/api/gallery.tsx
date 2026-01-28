import api from ".";
import { GalleryInput } from "@/types/gallery.types";

export const getGalleries = async () => {
  try {
    const response = await api.get("/gallery");
    return response;
    } catch (error) {
    console.error("Error fetching galleries:", error);
    throw error;
  }
};
export const addGallery = async (galleryData: FormData) => {
  try {
    const response = await api.post("/gallery/add", galleryData,{
        headers:{
            'Content-Type': 'multipart/form-data'
        }
    });
    return response;
  } catch (error) {
    console.error("Error adding gallery:", error);
    throw error;
  }
};
export const updateGallery = async (id: number, galleryData: FormData) => {
  try {
    const response = await api.put(`/gallery/edit/${id}`, galleryData,{
        headers:{
            'Content-Type': 'multipart/form-data'
        }
    });
    return response;
  } catch (error) {
    console.error("Error updating gallery:", error);
    throw error;
  }
};
export const deleteGallery = async (id: number) => {
  try {
    const response = await api.delete(`/gallery/delete/${id}`);
    return response;
  } catch (error) {
    console.error("Error deleting gallery:", error);
    throw error;
  }
};