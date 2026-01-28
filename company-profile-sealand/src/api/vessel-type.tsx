import api from ".";
import { VesselTypeInput } from "@/types/vesels";

export const getVesselTypes = async () => {
    try {
        const response = await api.get("/vessel-type");
        return response;
    } catch (error) {
        console.error("Error fetching vessel types:", error);
        throw error;
    }
};
export const addVesselType = async (vesselTypeData: FormData) => {
    try {
        const response = await api.post("/vessel-type/add", vesselTypeData,{
            headers:{
                'Content-Type': 'multipart/form-data'
            }
        });
        return response;
    } catch (error) {
        console.error("Error adding vessel type:", error);
        throw error;
    }
};
export const updateVesselType = async (id: number, vesselTypeData: FormData) => {
    try {
        const response = await api.put(`/vessel-type/edit/${id}`, vesselTypeData,{
            headers:{
                'Content-Type': 'multipart/form-data'
            }
        });
        return response;
    } catch (error) {
        console.error("Error updating vessel type:", error);
        throw error;
    }
};

export const deleteVesselType = async (id: number) => {
    try {
        const response = await api.delete(`/vessel-type/delete/${id}`);
        return response;
    } catch (error) {
        console.error("Error deleting vessel type:", error);
        throw error;
    }
};
