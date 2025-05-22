import { Track } from "@/types";

const TrackInfo = ({ track }: { track: Track | null }) => {
  return (
    <div className="flex w-1/4 items-center gap-4">
      {track && (
        <>
          <img
            src={track.image.url}
            alt={track.name}
            className="h-14 w-14 rounded-md object-cover"
          />
          <div className="min-w-0 flex-1">
            <div className="cursor-pointer truncate font-medium hover:underline">{track.name}</div>
            <div className="cursor-pointer truncate text-xs font-light text-zinc-400 hover:underline">
              {track.artists.map((artist) => artist.name).join(", ")}
            </div>
          </div>
        </>
      )}
    </div>
  );
};
export default TrackInfo;
