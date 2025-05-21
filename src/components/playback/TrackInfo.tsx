import { Song } from "@/types";

const TrackInfo = ({ currentSong }: { currentSong: Song | null }) => {
  return (
    <div className="flex items-center gap-4 w-1/4">
      {currentSong && (
        <>
          <img
            src={currentSong.imageUrl}
            alt={currentSong.title}
            className="w-14 h-14 object-cover rounded-md"
          />
          <div className="flex-1 min-w-0">
            <div className="font-medium truncate hover:underline cursor-pointer">
              {currentSong.title}
            </div>
            <div className="text-xs text-zinc-400 font-light truncate hover:underline cursor-pointer">
              {currentSong.artist}
            </div>
          </div>
        </>
      )}
    </div>
  );
};
export default TrackInfo;
