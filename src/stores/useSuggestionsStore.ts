import { Album, Artist, Track } from "@/types";
import { create } from "zustand";
import { axiosInstance } from "@/lib/axios";

interface SuggestStore {
  newReleaseAlbums: Album[] | null;
  newReleaseTracks: Track[] | null;

  topArtists: Artist[] | null;

  moreByArtist: Artist | null;
  moreByArtistAlbums: Album[] | null;

  //

  popularAlbums: Album[] | null;
  popularTracks: Track[] | null;

  discoverAlbums: Album[] | null;
  discoverTracks: Track[] | null;

  artistAlbums: Album[] | null;

  fetchNewReleases: () => Promise<void>;
  fetchTopArtistsAndMoreBy: () => Promise<void>;
  fetchDiscoverAndPopular: () => Promise<void>;
  fetchArtistAlbums: (artistId: string) => Promise<void>;
}

export const useSuggestStore = create<SuggestStore>((set) => ({
  newReleaseAlbums: null,
  newReleaseTracks: null,

  topArtists: null,

  moreByArtist: null,
  moreByArtistAlbums: null,

  popularAlbums: null,
  popularTracks: null,

  discoverAlbums: null,
  discoverTracks: null,

  artistAlbums: null,

  fetchNewReleases: async () => {
    try {
      const response = await axiosInstance.get(`/suggestion/new-releases`);
      const { newReleaseAlbums, newReleaseTracks } = response.data;
      set({ newReleaseAlbums, newReleaseTracks });
    } catch (error) {
      console.log("Error in fetchNewReleases: ", error);
    }
  },

  fetchTopArtistsAndMoreBy: async () => {
    try {
      const response = await axiosInstance.get(
        `/suggestion/top-artists-and-more-by`
      );
      const { topArtists, moreByArtist, moreByArtistAlbums } = response.data;
      set({ topArtists, moreByArtist, moreByArtistAlbums });
    } catch (error) {
      console.log("Error in fetchTopArtistsAndMoreBy: ", error);
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

  fetchArtistAlbums: async (artistId: string) => {
    try {
      const response = await axiosInstance.get(`/album/by-artist/${artistId}`);
      const { albums } = response.data;
      set({ artistAlbums: albums });
    } catch (error) {
      console.log("Error in fetchArtistAlbums: ", error);
    }
  },
}));
