import { usePlayerStore } from "@/stores/usePlayerStore";
import { useEffect, useRef, useState } from "react";
import TrackInfo from "@/components/playback/TrackInfo";
import PlaybackControl from "@/components/playback/PlaybackControl";
import VolumeControl from "@/components/playback/VolumeControl";

const TrackControl = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { currentTrack } = usePlayerStore();

  const [volume, setVolume] = useState<number>(50);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);

  const handleSeek = (value: number[]) => {
    if (audioRef.current) {
      audioRef.current.currentTime = value[0];
    }
  };

  useEffect(() => {
    audioRef.current = document.querySelector("audio");

    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);

    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("loadedmetadata", updateDuration);

    const handleEnded = () => {
      usePlayerStore.setState({ isPlaying: false });
    };

    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("loadedmetadata", updateDuration);
      audio.removeEventListener("ended", handleEnded);
    };
  }, [currentTrack]);

  return (
    <div className="h-20 w-full border-t border-zinc-800 bg-black px-3">
      <div className="flex h-full w-full items-center">
        <TrackInfo track={currentTrack} />
        <PlaybackControl
          currentTime={currentTime}
          duration={duration}
          handleSeek={handleSeek}
        />
        <VolumeControl
          volume={volume}
          setVolume={setVolume}
          audioRef={audioRef}
        />
      </div>
    </div>
  );
};

export default TrackControl;
