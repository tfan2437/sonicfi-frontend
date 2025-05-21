import { Album, Artist, Track } from "@/types";
import { create } from "zustand";
import { axiosInstance } from "@/lib/axios";
import { AxiosError } from "axios";

interface SuggestStore {
  newReleaseAlbums: Album[];
  newReleaseTracks: Track[];

  topArtists: Artist[];
  moreLikeArtist: Artist | null;

  popularAlbums: Album[];
  popularTracks: Track[];

  discoverAlbums: Album[];
  discoverTracks: Track[];

  isLoading: boolean;
  error: string | null;

  fetchNewReleases: () => Promise<void>;

  // fetchTopArtists: () => Promise<void>;
  // fetchMoreLikeArtist: (id: string) => Promise<void>;
}

export const useSuggestStore = create<SuggestStore>((set) => ({
  newReleaseAlbums: [],
  newReleaseTracks: [],

  topArtists: [],
  moreLikeArtist: null,

  popularAlbums: [],
  popularTracks: [],

  discoverAlbums: [],
  discoverTracks: [],

  // state
  isLoading: false,
  error: null,

  fetchNewReleases: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.get(`/suggestions/new-releases`);
      const { newReleaseAlbums, newReleaseTracks } = response.data;
      set({ newReleaseAlbums, newReleaseTracks });
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
