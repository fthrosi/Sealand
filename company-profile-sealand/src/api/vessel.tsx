import api from ".";
import { VesselInput } from "@/types/vesels";
import { VesselType } from "@/schema/vesselSchema";

export const getVessels = async () => {
    try {
        const response = await api.get("/vessels");
        return response;
    } catch (error) {
        console.error("Error fetching vessels:", error);
        throw error;
    }
};
export const addVessel = async (vesselData: VesselType) => {
    try {
        const response = await api.post("/vessels/add", vesselData);
        return response;
    } catch (error) {
        console.error("Error adding vessel:", error);
        throw error;
    }
};
export const updateVessel = async (id: number, vesselData: VesselType) => {
    try {
        const response = await api.put(`/vessels/edit/${id}`, vesselData);
        return response;
    } catch (error) {
        console.error("Error updating vessel:", error);
        throw error;
    }
};
export const deleteVessel = async (id: number) => {
    try {
        const response = await api.delete(`/vessels/delete/${id}`);
        return response;
    } catch (error) {
        console.error("Error deleting vessel:", error);
        throw error;
    }
};