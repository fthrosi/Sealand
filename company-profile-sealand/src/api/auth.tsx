import api from ".";
import { LoginType } from "@/schema/authSchema";

export const login = async (data: LoginType) => {
  try {
    const response = await api.post("/auth/login", data);
    return response;
  } catch (error) {
    console.error("Error during login:", error);
    throw error;
  }
};

export const logout = async () => {
  try {
    const response = await api.post("/auth/logout");
    return response;
  } catch (error) {
    console.error("Error during logout:", error);
    throw error;
  }
};