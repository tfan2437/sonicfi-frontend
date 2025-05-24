import { create } from "zustand";
import { Track } from "@/types";

interface PlayerStore {
  currentTrack: Track | null;
  queuedTracks: Track[];
  isPlaying: boolean;
  currentIndex: number;

  togglePlay: () => void;
  setCurrentTrack: (track: Track | null) => void;
  initializeQueue: (tracks: Track[]) => void;
  setTracksAndCurrentTrack: (track: Track, tracks: Track[]) => void;
  playListTracks: (tracks: Track[]) => void;
  playTracks: (tracks: Track[], startIndex?: number) => void;
  playNext: () => void;
  playPrevious: () => void;
}

export const usePlayerStore = create<PlayerStore>((set, get) => ({
  currentTrack: null,
  queuedTracks: [],
  isPlaying: false,
  currentIndex: -1,

  playListTracks: (tracks: Track[]) => {
    if (tracks.length === 0) return;

    if (tracks.some((track) => track._id === get().currentTrack?._id)) {
      set({ isPlaying: !get().isPlaying });
    } else {
      set({
        queuedTracks: tracks,
        currentTrack: tracks[0],
        currentIndex: 0,
        isPlaying: true,
      });
    }
  },

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

  setTracksAndCurrentTrack: (track: Track, tracks: Track[]) => {
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
      });
    } else {
      set({
        currentTrack: track,
        currentIndex: index,
        isPlaying: true,
      });
    }
  },

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
}));
