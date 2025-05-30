import { create } from "zustand";
import { Playlist, Track } from "@/types";

import { getPlaylists, updatePlaylist, deletePlaylist } from "@/api/playlist";

interface PlayerStore {
  currentTrack: Track | null;
  queuedTracks: Track[];
  isPlaying: boolean;
  currentIndex: number;

  playListId: string | null;
  playList: Playlist | null;

  isLoading: boolean;
  playlists: Playlist[];

  togglePlay: () => void;
  setCurrentTrack: (track: Track | null) => void;
  initializeQueue: (tracks: Track[]) => void;
  setTracksAndCurrentTrack: (
    track: Track,
    tracks: Track[],
    playListId?: string
  ) => void;
  playTracks: (tracks: Track[], startIndex?: number) => void;
  playNext: () => void;
  playPrevious: () => void;
  setPlaylist: (playList: Playlist | null) => void;

  fetchPlaylists: (uid: string) => Promise<void>;
  renamePlaylist: (playlistId: string, name: string) => Promise<void>;
  deletePlaylist: (playlistId: string) => Promise<void>;
  addToPlaylist: (
    playlistId: string,
    trackId: string,
    track: Track
  ) => Promise<void>;
}

export const usePlayerStore = create<PlayerStore>((set, get) => ({
  currentTrack: null,
  queuedTracks: [],
  isPlaying: false,
  currentIndex: -1,
  playListId: null,
  playList: null,
  playlists: [],

  isLoading: false,

  setCurrentTrack: (track: Track | null) => {
    if (!track) return;

    const index = get().queuedTracks.findIndex((t) => t._id === track._id);

    set({
      currentTrack: track,
      isPlaying: true,
      currentIndex: index !== -1 ? index : get().currentIndex,
    });
  },

  togglePlay: () => {
    set({ isPlaying: !get().isPlaying });
  },

  initializeQueue: (tracks: Track[]) => {
    set({
      queuedTracks: tracks,
      currentTrack: get().currentTrack || tracks[0],
      currentIndex: get().currentIndex === -1 ? 0 : get().currentIndex,
    });
  },

  setTracksAndCurrentTrack: (
    track: Track,
    tracks: Track[],
    playListId: string | null = null
  ) => {
    const currentTracks = get().queuedTracks;

    const hasChanged =
      currentTracks.length !== tracks.length ||
      tracks.some((track, index) => track._id !== currentTracks[index]?._id);

    const index = tracks.findIndex((t) => t._id === track._id);

    if (hasChanged) {
      set({
        queuedTracks: tracks,
        currentTrack: track,
        currentIndex: index,
        isPlaying: true,
        playListId: playListId,
      });
    } else {
      set({
        currentTrack: track,
        currentIndex: index,
        isPlaying: true,
        playListId: playListId,
      });
    }
  },

  // , playListId: string | null = null
  playTracks: (tracks: Track[], startIndex = 0) => {
    if (tracks.length === 0) return;

    const track = tracks[startIndex];

    set({
      queuedTracks: tracks,
      currentTrack: track,
      currentIndex: startIndex,
      isPlaying: true,
    });
  },

  playNext: () => {
    const { currentIndex, queuedTracks } = get();

    if (queuedTracks.length === 0) {
      set({ isPlaying: false });
      return;
    }

    const index = (currentIndex + 1) % queuedTracks.length;
    set({
      currentTrack: queuedTracks[index],
      currentIndex: index,
      isPlaying: true,
    });
  },

  playPrevious: () => {
    const { currentIndex, queuedTracks } = get();

    if (queuedTracks.length === 0) {
      set({ isPlaying: false });
      return;
    }

    const index =
      currentIndex === -1
        ? 0
        : (currentIndex - 1 + queuedTracks.length) % queuedTracks.length;

    set({
      currentTrack: queuedTracks[index],
      currentIndex: index,
      isPlaying: true,
    });
  },

  setPlaylist: (playList: Playlist | null) => {
    set({ playList });
  },

  fetchPlaylists: async (uid: string) => {
    if (!uid || get().isLoading) return;
    set({ isLoading: true });
    const playlists = await getPlaylists(uid);
    set({ playlists, isLoading: false });
  },

  renamePlaylist: async (playlistId: string, name: string) => {
    if (!playlistId) return;
    set({
      playlists: get().playlists.map((playlist) =>
        playlist._id === playlistId ? { ...playlist, name } : playlist
      ),
      isLoading: false,
    });
    await updatePlaylist({ _id: playlistId, name });
  },

  deletePlaylist: async (playlistId: string) => {
    if (!playlistId) return;
    set({
      playlists: get().playlists.filter(
        (playlist) => playlist._id !== playlistId
      ),
    });
    await deletePlaylist(playlistId);
  },

  addToPlaylist: async (playlistId: string, trackId: string, track: Track) => {
    console.log("addToPlaylist", playlistId, trackId, track);
    if (!playlistId || !trackId || !track) return;
    const track_ids = [
      ...(get().playlists.find((p) => p._id === playlistId)?.track_ids || []),
      trackId,
    ];
    set({
      playlists: get().playlists.map((playlist) =>
        playlist._id === playlistId
          ? {
              ...playlist,
              track_ids: track_ids,
              tracks: [...playlist.tracks, track],
            }
          : playlist
      ),
    });
    await updatePlaylist({
      _id: playlistId,
      track_ids: track_ids,
    });
  },
}));
