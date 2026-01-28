import api from ".";
import { CareerInput } from "@/types/career.type";

export const getCareers = async () => {
  try {
    const response = await api.get("/career");
    return response
  } catch (error) {
    console.error("Error fetching careers:", error);
    throw error;
  }
};

export const addCareer = async (careerData: CareerInput) => {
  try {
    const response = await api.post("/career/add", careerData);
    return response;
  } catch (error) {
    console.error("Error adding career:", error);
    throw error;
  }
};
export const updateCareer = async (id: number, careerData: CareerInput) => {
  try {
    const response = await api.put(`/career/edit/${id}`, careerData);
    return response;
  } catch (error) {
    console.error("Error updating career:", error);
    throw error;
  }
};

export const deleteCareer = async (id: number) => {
  try {
    const response = await api.delete(`/career/delete/${id}`);
    return response;
  } catch (error) {
    console.error("Error deleting career:", error);
    throw error;
  }
};