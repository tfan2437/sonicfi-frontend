import { Album, Artist, Track } from "@/types";
import { create } from "zustand";
import { axiosInstance } from "@/lib/axios";

interface MusicStore {
  artist: Artist | null;
  album: Album | null;
  albums: Album[];
  tracks: Track[];

  fetchAlbumById: (
    id: string
  ) => Promise<{ album: Album; tracks: Track[] } | null>;
  fetchArtistById: (
    id: string
  ) => Promise<{ artist: Artist; albums: Album[]; tracks: Track[] } | null>;
}

export const useMusicStore = create<MusicStore>((set) => ({
  // state
  artist: null,
  album: null,
  albums: [],
  tracks: [],

  // actions
  fetchAlbumById: async (id: string) => {
    try {
      const response = await axiosInstance.get(`/album/${id}`);
      const { album, tracks } = response.data;
      set({ album, tracks });
      return { album, tracks };
    } catch (error) {
      console.log("Error in fetchAlbumById: ", error);
      return null;
    }
  },

  fetchArtistById: async (id: string) => {
    try {
      const response = await axiosInstance.get(`/artist/${id}`);
      const { artist, albums, tracks } = response.data;
      set({ artist, albums, tracks });
      return { artist, albums, tracks };
    } catch (error) {
      console.log("Error in fetchArtistById: ", error);
      return null;
    }
  },
}));
