import { Track } from "@/types";
import PlayButton from "@/components/button/PlayButton";

interface ContentCardProps {
  track: Track;
  handlePlayTrack: (track: Track) => void;
}

const TrackCard = ({ track, handlePlayTrack }: ContentCardProps) => {
  return (
    <div
      onClick={() => handlePlayTrack(track)}
      className="group cursor-pointer rounded bg-transparent p-3 transition-all hover:bg-zinc-800/50"
    >
      <div className="relative mb-1.5">
        <div className="aspect-square overflow-hidden rounded shadow-lg">
          <img
            src={track.image.url}
            alt={track.name}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            draggable={false}
          />
        </div>
        <PlayButton track={track} handlePlayTrack={handlePlayTrack} />
      </div>
      <div className="h-[70px] w-full">
        <h3 className="line-clamp-2 text-[15px] font-light hover:underline">
          {track.name}
        </h3>
        <p className="mt-1 truncate text-sm font-light text-zinc-400 hover:underline">
          {track.artists.map((artist) => artist.name).join(", ")}
        </p>
      </div>
    </div>
  );
};
export default TrackCard;
