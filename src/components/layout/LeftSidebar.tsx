import { ListIcon, PlusIcon } from "lucide-react";
import MusicAnimationIcon from "@/components/icons/MusicAnimationIcon";
import PauseIcon from "@/components/icons/PauseIcon";
import { ScrollArea } from "@/components/ui/scroll-area";
// store
import { useSuggestStore } from "@/stores/useSuggestionsStore";
import { usePlayerStore } from "@/stores/usePlayerStore";
import { twMerge } from "tailwind-merge";
// types
import { Track } from "@/types/index";

const LeftSidebar = () => {
  const { popularTracks } = useSuggestStore();

  const { currentTrack, playTracks, isPlaying, togglePlay } = usePlayerStore();

  const handleTrackClick = (tracks: Track[], track: Track, index: number) => {
    if (currentTrack?._id === track._id) {
      togglePlay();
    } else {
      playTracks(tracks, index);
    }
  };

  return (
    <div className="flex h-full flex-col gap-2 select-none w-[300px]">
      <div className="flex-1 rounded-lg bg-zinc-900 py-4">
        <div className="flex items-center justify-between px-4">
          <span className="font-semibold">Your Library</span>
          <button className="flex items-center p-1 rounded-full bg-transparent hover:bg-zinc-700 transition-all duration-300 text-white">
            <PlusIcon className="size-5" />
          </button>
        </div>
        <div className="flex items-center justify-between my-2 px-4">
          <div className="flex items-center gap-2">
            <button className="px-3 py-1 rounded-full bg-zinc-700 hover:bg-zinc-600 transition-all duration-300 font-light text-xs text-zinc-200">
              Playlists
            </button>
            <button className="px-3 py-1 rounded-full bg-zinc-700 hover:bg-zinc-600 transition-all duration-300 font-light text-xs text-zinc-200">
              Albums
            </button>
            <button className="px-3 py-1 rounded-full bg-zinc-700 hover:bg-zinc-600 transition-all duration-300 font-light text-xs text-zinc-200">
              Artists
            </button>
          </div>
          <button className="flex items-center p-1 rounded-full transition-all duration-300 text-zinc-400">
            <ListIcon className="size-5" />
          </button>
        </div>
        <ScrollArea className="h-[calc(100vh-260px)] px-2">
          {popularTracks && (
            <div className="flex flex-col w-[284px]">
              {popularTracks.map((track, index) => (
                <div
                  key={track._id}
                  onClick={() => handleTrackClick(popularTracks, track, index)}
                  className="group grid w-full grid-cols-[48px_1fr_32px] items-center gap-2 p-2 rounded hover:bg-zinc-800 cursor-pointer group"
                >
                  <div className="size-12">
                    <img
                      src={track.image.url}
                      alt={track.name}
                      className="size-12 rounded"
                    />
                  </div>
                  <div className="flex flex-col gap-1 overflow-hidden">
                    <span className="text-sm font-light text-zinc-100 group-hover:underline truncate">
                      {track.name}
                    </span>
                    <span className="text-xs font-light text-zinc-400 truncate">
                      {track.artists.map((artist) => artist.name).join(", ")}
                    </span>
                  </div>
                  {currentTrack?._id === track._id && isPlaying && (
                    <div
                      className={twMerge(
                        "size-8 flex items-center justify-center group-hover:hidden"
                      )}
                    >
                      <MusicAnimationIcon />
                    </div>
                  )}
                  {currentTrack?._id === track._id && isPlaying && (
                    <div
                      className={twMerge(
                        "size-8 items-center justify-center text-zinc-300 hidden group-hover:flex"
                      )}
                    >
                      <PauseIcon className="size-6" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
      </div>
    </div>
  );
};
export default LeftSidebar;
