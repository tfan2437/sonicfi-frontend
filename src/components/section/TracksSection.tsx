import { Track } from "@/types";
import SectionGridSkeleton from "@/components/skeletons/SectionGridSkeleton";
import { usePlayerStore } from "@/stores/usePlayerStore";
import { useState } from "react";
import TrackCard from "@/components/item/TrackCard";

interface TracksSectionProps {
  title: string;
  tracks: Track[];
}

const TracksSection = ({ tracks, title }: TracksSectionProps) => {
  const { currentTrack, togglePlay, setTracksAndCurrentTrack } =
    usePlayerStore();

  const [showAll, setShowAll] = useState<boolean>(false);

  const handlePlayTrack = (track: Track) => {
    if (currentTrack?._id === track._id) {
      togglePlay();
    } else {
      setTracksAndCurrentTrack(track, tracks);
    }
  };

  if (!tracks) return <SectionGridSkeleton />;

  return (
    <div className="px-7">
      <div className="mb-1 flex items-end justify-between px-3">
        <h2 className="font-montserrat text-2xl font-semibold">{title}</h2>
        <button
          onClick={() => setShowAll(!showAll)}
          className="cursor-pointer text-sm text-zinc-400 hover:text-zinc-100 hover:underline"
        >
          {showAll ? "Show less" : "Show all"}
        </button>
      </div>

      <div className="grid grid-cols-7">
        {(showAll ? tracks : tracks.slice(0, 7)).map((track) => (
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
export default TracksSection;
