import { Track } from "@/types";
import SectionGridSkeleton from "@/components/skeletons/SectionGridSkeleton";
import PlayButton from "@/components/PlayButton";
import { usePlayerStore } from "@/stores/usePlayerStore";
interface TracksSectionProps {
  title: string;
  tracks: Track[];
  isLoading: boolean;
}

const TracksSection = ({ tracks, title, isLoading }: TracksSectionProps) => {
  const { currentTrack, togglePlay, setTracksAndCurrentTrack } = usePlayerStore();

  const handlePlayTrack = (track: Track) => {
    if (currentTrack?._id === track._id) {
      togglePlay();
    } else {
      setTracksAndCurrentTrack(track, tracks);
    }
  };

  if (isLoading) return <SectionGridSkeleton />;

  return (
    <div className="px-7">
      <div className="mb-1 flex items-end justify-between px-3">
        <h2 className="font-montserrat text-2xl font-semibold">{title}</h2>
        <button className="cursor-pointer text-sm text-zinc-400 hover:text-zinc-100 hover:underline">
          Show all
        </button>
      </div>

      <div className="grid grid-cols-7">
        {tracks.map((track) => (
          <div
            key={track._id}
            className="group cursor-pointer rounded bg-transparent p-3 transition-all hover:bg-zinc-800/50"
          >
            <div className="relative mb-1.5">
              <div className="aspect-square overflow-hidden rounded shadow-lg">
                <img
                  src={track.image.url}
                  alt={track.name}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <PlayButton track={track} handlePlayTrack={handlePlayTrack} />
            </div>
            <div className="h-[70px] w-full">
              <h3 className="line-clamp-2 text-[15px] font-light hover:underline">{track.name}</h3>
              <p className="mt-1 truncate text-sm font-light text-zinc-400 hover:underline">
                {track.artists.map((artist) => artist.name).join(", ")}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default TracksSection;
