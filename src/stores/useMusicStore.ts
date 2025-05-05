import { axiosInstance } from "@/lib/axios";
import { create } from "zustand";
import { AxiosError } from "axios";
import { Album, Song } from "@/types";

interface MusicStore {
  album: Album | null;
  albums: Album[];
  songs: Song[];

  madeForYouSongs: Song[];
  trendingSongs: Song[];
  featuredSongs: Song[];

  isLoading: boolean;
  error: string | null;
  fetchAlbums: () => Promise<void>;
  fetchAlbumById: (id: string) => Promise<void>;

  fetchMadeForYouSongs: () => Promise<void>;
  fetchTrendingSongs: () => Promise<void>;
  fetchFeaturedSongs: () => Promise<void>;
}

export const useMusicStore = create<MusicStore>((set) => ({
  album: null,
  albums: [],
  songs: [],

  madeForYouSongs: [],
  trendingSongs: [],
  featuredSongs: [],

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

  fetchAlbumById: async (id: string) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.get(`/albums/${id}`);
      set({ album: response.data });
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

  fetchMadeForYouSongs: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.get("/songs/made-for-you");
      set({ madeForYouSongs: response.data });
    } catch (error) {
      set({
        error:
          error instanceof AxiosError
            ? error.response?.data.message
            : "Failed to fetch made for you songs",
      });
    } finally {
      set({ isLoading: false });
    }
  },

  fetchTrendingSongs: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.get("/songs/trending");
      set({ trendingSongs: response.data });
    } catch (error) {
      set({
        error:
          error instanceof AxiosError
            ? error.response?.data.message
            : "Failed to fetch trending songs",
      });
    } finally {
      set({ isLoading: false });
    }
  },

  fetchFeaturedSongs: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.get("/songs/featured");
      set({ featuredSongs: response.data });
    } catch (error) {
      set({
        error:
          error instanceof AxiosError
            ? error.response?.data.message
            : "Failed to fetch featured songs",
      });
    } finally {
      set({ isLoading: false });
    }
  },
}));
