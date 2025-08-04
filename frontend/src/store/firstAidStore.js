import { create } from "zustand";
import axios from "axios";
const baseURL = import.meta.env.VITE_API_BASE_URL;

const API_URL = `${baseURL}/api/first-aid/all-first-aid`;
export const useFirstAidStore = create((set) => ({
  firstAidData: [], 
  isLoading: false,
  error: null,

  fetchFirstAid: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get(`${API_URL}`);
      set({
        firstAidData: response.data.data, 
        isLoading: false,
      });
    } catch (error) {
      set({
        error: error.response?.data?.message || "Error fetching first aid data",
        isLoading: false,
      });
    }
  },
}));
