import api from ".";
import { PortfolioOutput } from "@/types/portfolio.types";

export const getPortfolios = async () => {
  try {
    const response = await api.get("/portfolio");
    return response;
  } catch (error) {
    console.error("Error fetching portfolios:", error);
    throw error;
  }
};

export const addPortfolio = async (portfolioData: FormData) => {
  try {
    const response = await api.post("/portfolio/add", portfolioData,{
        headers:{
            'Content-Type': 'multipart/form-data'
        }
    });
    return response;
  } catch (error) {
    console.error("Error adding portfolio:", error);
    throw error;
  }
};
export const updatePortfolio = async (id: string, portfolioData: FormData) => {
  try {
    const response = await api.put(`/portfolio/edit/${id}`, portfolioData,{
        headers:{
            'Content-Type': 'multipart/form-data'
        }
    });
    return response;
  } catch (error) {
    console.error("Error updating portfolio:", error);
    throw error;
  }
};

export const deletePortfolio = async (id: number) => {
  try {
    const response = await api.delete(`/portfolio/delete/${id}`);
    return response;
  } catch (error) {
    console.error("Error deleting portfolio:", error);
    throw error;
  }
};