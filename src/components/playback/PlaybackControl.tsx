import { usePlayerStore } from "@/stores/usePlayerStore";
import { Slider } from "@/components/ui/slider";
// Icons
import { RepeatIcon, ShuffleIcon } from "lucide-react";
import PauseIcon from "@/components/icons/PauseIcon";
import PlayIcon from "@/components/icons/PlayIcon";
import PrevIcon from "@/components/icons/PrevIcon";
import NextIcon from "@/components/icons/NextIcon";
import IconButton from "@/components/button/IconButton";

interface PlaybackControlProps {
  currentTime: number;
  duration: number;
  handleSeek: (value: number[]) => void;
}

const PlaybackControl = ({ currentTime, duration, handleSeek }: PlaybackControlProps) => {
  const { currentTrack, isPlaying, togglePlay, playNext, playPrevious } = usePlayerStore();

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  return (
    <div className="flex flex-1 flex-col items-center gap-2">
      <div className="flex items-center gap-5">
        <IconButton icon={<ShuffleIcon className="size-4" />} onClick={() => {}} />
        <IconButton
          icon={<PrevIcon className="size-6" />}
          onClick={playPrevious}
          disabled={!currentTrack}
        />
        <button
          className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-white text-black outline-none hover:bg-white/80"
          onClick={togglePlay}
          disabled={!currentTrack}
        >
          {isPlaying ? <PauseIcon className="size-6" /> : <PlayIcon className="size-7 pr-px" />}
        </button>
        <IconButton
          icon={<NextIcon className="size-6" />}
          onClick={playNext}
          disabled={!currentTrack}
        />
        <IconButton
          icon={<RepeatIcon className="size-4" />}
          onClick={playNext}
          disabled={!currentTrack}
        />
      </div>
      <div className="hidden w-full items-center gap-2 sm:flex">
        <div className="text-xs text-zinc-400">{formatTime(currentTime)}</div>
        <Slider
          value={[currentTime]}
          max={duration || 100}
          step={1}
          className="w-full hover:cursor-grab active:cursor-grabbing"
          onValueChange={handleSeek}
        />
        <div className="text-xs text-zinc-400">{formatTime(duration)}</div>
      </div>
    </div>
  );
};
export default PlaybackControl;
