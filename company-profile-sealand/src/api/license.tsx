import api from ".";
import { LicenseInput } from "@/types/license.types";

export const getLicenses = async () => {
  try {
    const response = await api.get("/license");
    return response;
  } catch (error) {
    console.error("Error fetching licenses:", error);
    throw error;
  }
};
export const addLicense = async (licenseData: FormData) => {
  try {
    const response = await api.post("/license/add", licenseData,{
        headers:{
            'Content-Type': 'multipart/form-data'
        }
    });
    return response;
  } catch (error) {
    console.error("Error adding license:", error);
    throw error;
  }
};
export const updateLicense = async (id: number, licenseData: FormData) => {
  try {
    const response = await api.put(`/license/edit/${id}`, licenseData,{
        headers:{
            'Content-Type': 'multipart/form-data'
        }
    });
    return response;
  } catch (error) {
    console.error("Error updating license:", error);
    throw error;
  }
};
export const deleteLicense = async (id: number) => {
  try {
    const response = await api.delete(`/license/delete/${id}`);
    return response;
  } catch (error) {
    console.error("Error deleting license:", error);
    throw error;
  }
};
