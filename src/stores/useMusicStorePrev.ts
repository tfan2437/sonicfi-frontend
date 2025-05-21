import { axiosInstance } from "@/lib/axios";
import { create } from "zustand";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import { Album, Song, Stats } from "@/types";

interface MusicStore {
  album: Album | null;
  albums: Album[];
  songs: Song[];

  madeForYouSongs: Song[];
  trendingSongs: Song[];
  featuredSongs: Song[];
  stats: Stats;

  isLoading: boolean;
  error: string | null;
  fetchAlbums: () => Promise<void>;
  fetchAlbumById: (id: string) => Promise<void>;

  fetchMadeForYouSongs: () => Promise<void>;
  fetchTrendingSongs: () => Promise<void>;
  fetchFeaturedSongs: () => Promise<void>;

  fetchStats: () => Promise<void>;
  fetchSongs: () => Promise<void>;
  deleteSong: (id: string) => Promise<void>;
  deleteAlbum: (id: string) => Promise<void>;
}

export const useMusicStore = create<MusicStore>((set) => ({
  album: null,
  albums: [],
  songs: [],

  madeForYouSongs: [],
  trendingSongs: [],
  featuredSongs: [],
  stats: {
    totalSongs: 0,
    totalAlbums: 0,
    totalUsers: 0,
    totalArtists: 0,
  },

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

  deleteSong: async (id) => {
    set({ isLoading: true, error: null });
    try {
      await axiosInstance.delete(`/admin/songs/${id}`);

      set((state) => ({
        songs: state.songs.filter((song) => song._id !== id),
      }));
      toast.success("Song deleted successfully");
    } catch (error: any) {
      console.log("Error in deleteSong", error);
      toast.error("Error deleting song");
    } finally {
      set({ isLoading: false });
    }
  },

  deleteAlbum: async (id) => {
    set({ isLoading: true, error: null });
    try {
      await axiosInstance.delete(`/admin/albums/${id}`);
      set((state) => ({
        albums: state.albums.filter((album) => album._id !== id),
        songs: state.songs.map((song) =>
          song.albumId === state.albums.find((a) => a._id === id)?.title
            ? { ...song, album: null }
            : song
        ),
      }));
      toast.success("Album deleted successfully");
    } catch (error: any) {
      toast.error("Failed to delete album: " + error.message);
    } finally {
      set({ isLoading: false });
    }
  },

  fetchSongs: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.get("/songs");
      set({ songs: response.data });
    } catch (error: any) {
      set({ error: error.message });
    } finally {
      set({ isLoading: false });
    }
  },

  fetchStats: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.get("/stats");
      set({ stats: response.data });
    } catch (error: any) {
      set({ error: error.message });
    } finally {
      set({ isLoading: false });
    }
  },
}));
