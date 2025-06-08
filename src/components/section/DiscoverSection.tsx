import { Track } from "@/types";
import SectionGridSkeleton from "@/components/skeletons/SectionGridSkeleton";
import { usePlayerStore } from "@/stores/usePlayerStore";

interface TracksSectionProps {
  tracks: Track[];
}

const DiscoverSection = ({ tracks }: TracksSectionProps) => {
  const { currentTrack, togglePlay, setTracksAndCurrentTrack } =
    usePlayerStore();

  const handlePlayTrack = (track: Track) => {
    if (currentTrack?._id === track._id) {
      togglePlay();
    } else {
      setTracksAndCurrentTrack(track, tracks);
    }
  };

  if (!tracks) return <SectionGridSkeleton />;

  return (
    <div className="px-10">
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
        {tracks.slice(0, 8).map((track) => (
          <TrackCard
            key={track._id}
            track={track}
            handlePlayTrack={handlePlayTrack}
          />
        ))}
      </div>
    </div>
  );
};
export default DiscoverSection;

const TrackCard = ({
  track,
  handlePlayTrack,
}: {
  track: Track;
  handlePlayTrack: (track: Track) => void;
}) => {
  return (
    <div
      onClick={() => handlePlayTrack(track)}
      className="group select-none cursor-pointer rounded bg-zinc-800 p-0 transition-all hover:bg-zinc-700 flex flew-row items-center gap-3"
    >
      <div className="aspect-square overflow-hidden size-16 shrink-0">
        <img
          src={track.album.image.url}
          alt={track.name}
          className="h-full w-full object-cover rounded-l"
          draggable={false}
        />
      </div>
      <span className="truncate text-base font-medium">{track.name}</span>
      <div className="size-2" />
    </div>
  );
};
