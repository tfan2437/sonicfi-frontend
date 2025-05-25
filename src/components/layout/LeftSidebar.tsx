import { ListIcon, PlayIcon, PlusIcon } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
// store
import { useSuggestStore } from "@/stores/useSuggestionsStore";
import { usePlayerStore } from "@/stores/usePlayerStore";

const LeftSidebar = () => {
  const { popularTracks } = useSuggestStore();

  const { currentTrack, playTracks, togglePlay, isPlaying } = usePlayerStore();

  return (
    <div className="flex h-full flex-col gap-2 select-none">
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
        <ScrollArea className="h-[calc(100vh-250px)] px-2">
          {popularTracks && (
            <div className="flex flex-col">
              {popularTracks.map((track, index) => (
                <div
                  key={track._id}
                  onClick={() => playTracks(popularTracks, index)}
                  className="grid grid-cols-[48px_1fr_48px] items-center gap-2 p-2 rounded hover:bg-zinc-800 cursor-pointer group"
                >
                  <div className="size-12">
                    <img
                      src={track.image.url}
                      alt={track.name}
                      className="size-12 rounded"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-sm font-light text-zinc-100 group-hover:underline truncate">
                      {track.name}
                    </span>{" "}
                    <span className="text-xs font-light text-zinc-400 truncate">
                      {track.artists.map((artist) => artist.name).join(", ")}
                    </span>
                  </div>
                  <div className="size-10 flex items-center justify-center rounded-full text-white bg-zinc-700 hover:bg-zinc-600 transition-all duration-300">
                    <PlayIcon className="size-5" />
                  </div>
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
