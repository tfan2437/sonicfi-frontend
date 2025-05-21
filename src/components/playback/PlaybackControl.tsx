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

const PlaybackControl = ({
  currentTime,
  duration,
  handleSeek,
}: PlaybackControlProps) => {
  const { currentSong, isPlaying, togglePlay, playNext, playPrevious } =
    usePlayerStore();

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  return (
    <div className="flex flex-col items-center gap-2 flex-1">
      <div className="flex items-center gap-5">
        <IconButton
          icon={<ShuffleIcon className="size-4" />}
          onClick={() => {}}
        />
        <IconButton
          icon={<PrevIcon className="size-6" />}
          onClick={playPrevious}
          disabled={!currentSong}
        />
        <button
          className="bg-white hover:bg-white/80 text-black rounded-full h-8 w-8 flex items-center justify-center cursor-pointer outline-none"
          onClick={togglePlay}
          disabled={!currentSong}
        >
          {isPlaying ? (
            <PauseIcon className="size-6" />
          ) : (
            <PlayIcon className="size-7 pr-px" />
          )}
        </button>
        <IconButton
          icon={<NextIcon className="size-6" />}
          onClick={playNext}
          disabled={!currentSong}
        />
        <IconButton
          icon={<RepeatIcon className="size-4" />}
          onClick={playNext}
          disabled={!currentSong}
        />
      </div>
      <div className="hidden sm:flex items-center gap-2 w-full">
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
