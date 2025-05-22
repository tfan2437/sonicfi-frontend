import { Album, Track } from "@/types";
import { create } from "zustand";
import { axiosInstance } from "@/lib/axios";
import { AxiosError } from "axios";

interface MusicStore {
  album: Album | null;
  tracks: Track[];

  isLoading: boolean;
  error: string | null;

  isAlbumLoading: boolean;

  fetchAlbumById: (id: string) => Promise<void>;
}

export const useMusicStore = create<MusicStore>((set) => ({
  // state
  album: null,
  tracks: [],

  isLoading: false,
  error: null,

  isAlbumLoading: true,

  // actions
  fetchAlbumById: async (id: string) => {
    set({ isAlbumLoading: true, error: null });
    try {
      const response = await axiosInstance.get(`/album/${id}`);
      const { album, tracks } = response.data;
      set({ album, tracks });
    } catch (error) {
      set({
        error: error instanceof AxiosError ? error.response?.data.message : "An error occurred",
      });
    } finally {
      set({ isAlbumLoading: false });
    }
  },
}));
