import api from ".";

export const getDivisions = async () => {
  try {
    const response = await api.get("/division");
    return response;
  } catch (error) {
    console.error("Error fetching divisions:", error);
    throw error;
  }
};
export const addDivision = async (divisionData: { name: string }) => {
  try {
    const response = await api.post("/division/add", divisionData);
    return response;
  } catch (error) {
    console.error("Error adding division:", error);
    throw error;
  }
};
export const updateDivision = async (id: number, divisionData: { name: string }) => {
  try {
    const response = await api.put(`/division/edit/${id}`, divisionData);
    return response;
  } catch (error) {
    console.error("Error updating division:", error);
    throw error;
  }
};
export const deleteDivision = async (id: number) => {
  try {
    const response = await api.delete(`/division/delete/${id}`);
    return response;
  } catch (error) {
    console.error("Error deleting division:", error);
    throw error;
  }
};