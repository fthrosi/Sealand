import api from ".";

export const getFlags = async () => {
  try {
    const response = await api.get("/flags");
    return response;
  } catch (error) {
    console.error("Error fetching flags:", error);
    throw error;
  }
};
export const addFlag = async (flagData: { name: string; }) => {
  try {
    const response = await api.post("/flags/add", flagData);
    return response;
  } catch (error) {
    console.error("Error adding flag:", error);
    throw error;
  }
};
export const updateFlag = async (id: number, flagData: { name: string; }) => {
  try {
    const response = await api.put(`/flags/edit/${id}`, flagData);
    return response;
  } catch (error) {
    console.error("Error updating flag:", error);
    throw error;
  }
};
export const deleteFlag = async (id: number) => {
  try {
    const response = await api.delete(`/flags/delete/${id}`);
    return response;
  } catch (error) {
    console.error("Error deleting flag:", error);
    throw error;
  }
};