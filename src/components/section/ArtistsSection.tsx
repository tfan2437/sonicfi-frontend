import { HomeDisplayMode } from "@/types";
import { useNavigate } from "react-router-dom";
import { DISPLAY_ARTISTS } from "@/constants";

interface ArtistsSectionProps {
  displayMode: HomeDisplayMode;
}

const ArtistsSection = ({ displayMode }: ArtistsSectionProps) => {
  const navigate = useNavigate();

  if (displayMode !== "artists" && displayMode !== "all") return null;

  return (
    <div className="px-7">
      <div className="mb-1 flex items-end justify-between px-3">
        <h2 className="font-montserrat text-2xl font-semibold">Artists</h2>
      </div>

      <div className="responsive-grid">
        {DISPLAY_ARTISTS.map((artist) => (
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
                {artist.name}
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
