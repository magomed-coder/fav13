import { API_ENDPOINTS } from "@/constants/api-endpoints";
import api from "@/lib/axios";
import { RealEstateItem } from "@/types";

const getAll = async (): Promise<RealEstateItem[]> => {
  try {
    const response = await api.get(API_ENDPOINTS.REAL_ESTATE_LIST);
    return response.data;
  } catch (error: any) {
    console.error("[Get real estate error]", error);
    throw (
      error.response?.data ||
      new Error("Не удалось получить список недвижимости")
    );
  }
};

export const realEstateService = {
  getAll,
};
