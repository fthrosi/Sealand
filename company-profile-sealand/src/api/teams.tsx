import api from ".";
import { TeamInput } from "@/types/team";

export const getTeams = async () => {
  try {
    const response = await api.get("/teams");
    return response;
  } catch (error) {
    console.error("Error fetching teams:", error);
    throw error;
  }
};

export const getTeamsFormatated = async () => {
  try {
    const response = await api.get("/teams/format");
    return response;
  } catch (error) {
    console.error("Error fetching teams:", error);
    throw error;
  }
};

export const addTeam = async (teamData: FormData) => {
  try {
    const response = await api.post("/teams/add", teamData,{
        headers:{
            'Content-Type': 'multipart/form-data'
        }
    });
    return response;
  } catch (error) {
    console.error("Error adding team:", error);
    throw error;
  }
};
export const updateTeam = async (id: number, teamData: FormData) => {
  try {
    const response = await api.put(`/teams/edit/${id}`, teamData,{
        headers:{
            'Content-Type': 'multipart/form-data'
        }
    });
    return response;
  }
    catch (error) {
    console.error("Error updating team:", error);
    throw error;
  }
};

export const deleteTeam = async (id: number) => {
  try {
    const response = await api.delete(`/teams/delete/${id}`);
    return response;
  } catch (error) {
    console.error("Error deleting team:", error);
    throw error;
  }
};