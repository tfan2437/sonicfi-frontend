import { Album, Track } from "@/types";
import { create } from "zustand";
import { axiosInstance } from "@/lib/axios";

interface SuggestStore {
  newReleaseAlbums: Album[] | null;
  newReleaseTracks: Track[] | null; //

  popularAlbums: Album[] | null;
  popularTracks: Track[] | null;

  discoverAlbums: Album[] | null;
  discoverTracks: Track[] | null;

  fetchNewReleases: () => Promise<void>;
  fetchDiscoverAndPopular: () => Promise<void>;

  // done
  artistAlbums: Album[] | null;
  fetchArtistAlbums: (artistId: string) => Promise<void>;
}

export const useSuggestStore = create<SuggestStore>((set) => ({
  newReleaseAlbums: null,
  newReleaseTracks: null,

  popularAlbums: null,
  popularTracks: null,

  discoverAlbums: null,
  discoverTracks: null,

  fetchNewReleases: async () => {
    try {
      const response = await axiosInstance.get(`/suggestion/new-releases`);
      const { newReleaseAlbums, newReleaseTracks } = response.data;
      set({ newReleaseAlbums, newReleaseTracks });
    } catch (error) {
      console.log("Error in fetchNewReleases: ", error);
    }
  },

  fetchDiscoverAndPopular: async () => {
    try {
      const response = await axiosInstance.get(
        `/suggestion/discover-and-popular`
      );
      const { popularAlbums, popularTracks, discoverAlbums, discoverTracks } =
        response.data;
      set({ popularAlbums, popularTracks, discoverAlbums, discoverTracks });
    } catch (error) {
      console.log("Error in fetchTopArtistsAndMoreBy: ", error);
    }
  },

  // done
  artistAlbums: null,
  fetchArtistAlbums: async (artistId: string) => {
    try {
      const response = await axiosInstance.get(`/albums/by-artist/${artistId}`);
      const { albums } = response.data;
      set({ artistAlbums: albums });
    } catch (error) {
      console.log("Error in fetchArtistAlbums: ", error);
    }
  },
}));
