import { Artist } from "@/types";
import SectionGridSkeleton from "@/components/skeletons/SectionGridSkeleton";
import { useNavigate } from "react-router-dom";

interface ArtistsSectionProps {
  title: string;
  artists: Artist[];
  isLoading: boolean;
}

const ArtistsSection = ({ title, artists, isLoading }: ArtistsSectionProps) => {
  const navigate = useNavigate();

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
        {artists.map((artist) => (
          <div
            key={artist._id}
            onClick={() => navigate(`/artist/${artist._id}`)}
            className="cursor-pointer rounded bg-transparent p-3 transition-all hover:bg-zinc-800/50"
          >
            <div className="relative mb-1.5">
              <div className="aspect-square overflow-hidden rounded-full shadow-lg">
                <img
                  src={artist.profile_image.url}
                  alt={artist.name}
                  className="h-full w-full rounded-full object-cover transition-transform duration-300"
                />
              </div>
            </div>
            <div className="h-auto w-full">
              <h3 className="line-clamp-1 text-[15px] font-light hover:underline">
                {artist.name} sdfd dsfds fdsfsdf
              </h3>
              <p className="mt-1 truncate text-sm font-light text-zinc-400 hover:underline">
                Artist
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default ArtistsSection;
