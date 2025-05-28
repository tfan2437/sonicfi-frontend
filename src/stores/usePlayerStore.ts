import { create } from "zustand";
import { Playlist, Track } from "@/types";

interface PlayerStore {
  currentTrack: Track | null;
  queuedTracks: Track[];
  isPlaying: boolean;
  currentIndex: number;

  playListId: string | null;
  playList: Playlist | null;

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
  setPlayList: (playList: Playlist | null) => void;
}

export const usePlayerStore = create<PlayerStore>((set, get) => ({
  currentTrack: null,
  queuedTracks: [],
  isPlaying: false,
  currentIndex: -1,
  playListId: null,
  playList: null,

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

  setPlayList: (playList: Playlist | null) => {
    set({ playList });
  },
}));
