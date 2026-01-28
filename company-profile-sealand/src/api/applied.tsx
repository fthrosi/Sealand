import api from ".";


export const getApplieds = async () => {
  try {
    const response = await api.get("/applied");
    return response;
  } catch (error) {
    console.error("Error fetching applieds:", error);
    throw error;
  }
};
export const addApplied = async (appliedData: FormData) => {
  try {
    const response = await api.post("/applied/add", appliedData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
    return response;
  } catch (error) {
    console.error("Error adding applied:", error);
    throw error;
  }
};
export const deleteApplied = async (id: number) => {
  try {
    const response = await api.delete(`/applied/delete/${id}`);
    return response;
  } catch (error) {
    console.error("Error deleting applied:", error);
    throw error;
  }
};