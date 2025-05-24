import { Track } from "@/types";
import { twMerge } from "tailwind-merge";
import { usePlayerStore } from "@/stores/usePlayerStore";
import PauseIcon from "@/components/icons/PauseIcon";
import PlayIcon from "@/components/icons/PlayIcon";

const PlayButton = ({
  track,
  handlePlayTrack,
}: {
  track: Track;
  handlePlayTrack: (track: Track) => void;
}) => {
  const { currentTrack, isPlaying } = usePlayerStore();
  const isCurrentTrack = currentTrack && currentTrack._id === track._id;

  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        handlePlayTrack(track);
      }}
      className={twMerge(
        "absolute right-2 bottom-2 rounded-full bg-black/50 p-2 text-white backdrop-blur-xs transition-all duration-200 hover:scale-105",
        isCurrentTrack && isPlaying ? "block" : "hidden group-hover:block"
      )}
    >
      {isCurrentTrack && isPlaying ? (
        <div className="flex size-7 items-center justify-center">
          <PauseIcon className="size-6" />
        </div>
      ) : (
        <PlayIcon className="size-7" />
      )}
    </button>
  );
};
export default PlayButton;
