import { Album, HomeDisplayMode } from "@/types";
import SectionGridSkeleton from "@/components/skeletons/SectionGridSkeleton";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

interface AlbumsSectionProps {
  title: string;
  albums: Album[];
  displayMode: HomeDisplayMode;
}

const AlbumsSection = ({ albums, title, displayMode }: AlbumsSectionProps) => {
  const navigate = useNavigate();
  const [showAll, setShowAll] = useState<boolean>(false);

  if (displayMode !== "albums" && displayMode !== "all") return null;
  if (!albums) return <SectionGridSkeleton />;

  return (
    <div className="px-7">
      <div className="mb-1 flex items-end justify-between px-3">
        <h2 className="font-montserrat text-2xl font-semibold">{title}</h2>
        <button
          onClick={() => setShowAll(!showAll)}
          className="text-sm text-zinc-400 hover:text-zinc-100 hover:underline"
        >
          {showAll ? "Show less" : "Show all"}
        </button>
      </div>
      {/* TODO: add a button to show all albums */}
      <div className="responsive-grid">
        {(showAll ? albums : albums.slice(0, 8)).map((album) => (
          <div
            key={album._id}
            onClick={() => navigate(`/album/${album._id}`)}
            className="group cursor-pointer rounded bg-transparent p-3 transition-all hover:bg-zinc-800/50"
          >
            <div className="relative mb-1.5">
              <div className="aspect-square overflow-hidden rounded shadow-lg">
                <img
                  src={album.image.url}
                  alt={album.name}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
            </div>
            <div className="h-[70px] w-full">
              <h3 className="line-clamp-2 text-[15px] font-light hover:underline">
                {album.name}
              </h3>
              <p className="mt-1 truncate text-sm font-light text-zinc-400 hover:underline">
                {album.artists.map((artist) => artist.name).join(", ")}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default AlbumsSection;
