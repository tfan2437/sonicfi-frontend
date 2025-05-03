import { axiosInstance } from "@/lib/axios";
import { create } from "zustand";
import { AxiosError } from "axios";

interface MusicStore {
  albums: any[];
  songs: any[];
  isLoading: boolean;
  error: string | null;
  fetchAlbums: () => Promise<void>;
}

export const useMusicStore = create<MusicStore>((set) => ({
  albums: [],
  songs: [],
  isLoading: false,
  error: null,
  fetchAlbums: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.get("/albums");
      set({ albums: response.data });
    } catch (error) {
      set({
        error:
          error instanceof AxiosError
            ? error.response?.data.message
            : "An error occurred",
      });
    } finally {
      set({ isLoading: false });
    }
  },
}));
