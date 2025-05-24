import { Album, Artist, Track } from "@/types";
import { create } from "zustand";
import { axiosInstance } from "@/lib/axios";
import { AxiosError } from "axios";

interface MusicStore {
  artist: Artist | null;
  album: Album | null;
  albums: Album[];
  tracks: Track[];

  isLoading: boolean;
  error: string | null;

  isAlbumLoading: boolean;

  fetchArtistById: (id: string) => Promise<void>;
  fetchAlbumById: (id: string) => Promise<void>;
}

export const useMusicStore = create<MusicStore>((set) => ({
  // state
  artist: null,
  album: null,
  albums: [],
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
        error:
          error instanceof AxiosError
            ? error.response?.data.message
            : "An error occurred",
      });
    } finally {
      set({ isAlbumLoading: false });
    }
  },

  fetchArtistById: async (id: string) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.get(`/artist/${id}`);
      const { artist, albums, tracks } = response.data;
      set({ artist, albums, tracks });
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
