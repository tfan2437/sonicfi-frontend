import { usePlayerStore } from "@/stores/usePlayerStore";
import { useEffect, useRef } from "react";

const AudioPlayer = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const prevSongRef = useRef<string | null>(null);

  const { currentTrack, isPlaying, playNext } = usePlayerStore();

  // handle play/pause logic
  useEffect(() => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  // handle track end
  useEffect(() => {
    if (!audioRef.current) return;
    const audio = audioRef.current;

    const handleEnded = () => {
      playNext();
    };

    audio.addEventListener("ended", handleEnded);

    return () => audio.removeEventListener("ended", handleEnded);
  }, [playNext]);

  // handle track changes
  useEffect(() => {
    if (!audioRef.current || !currentTrack) return;

    const audio = audioRef.current;

    const isSongChange = prevSongRef.current !== currentTrack.preview_url;
    if (isSongChange) {
      audio.src = currentTrack.preview_url;
      audio.currentTime = 0;
      prevSongRef.current = currentTrack.preview_url;

      if (isPlaying) audio.play();
    }
  }, [currentTrack, isPlaying]);

  return <audio ref={audioRef} />;
};
export default AudioPlayer;
