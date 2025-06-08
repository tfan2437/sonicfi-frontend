import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
// store
import { useSuggestStore } from "@/stores/useSuggestionsStore";
// types
import { HomeDisplayMode } from "@/types";
// components
import { ScrollArea } from "@/components/ui/scroll-area";
import TracksSection from "@/components/section/TracksSection";
import AlbumsSection from "@/components/section/AlbumsSection";
import ArtistsSection from "@/components/section/ArtistsSection";
import DiscoverSection from "@/components/section/DiscoverSection";
import LoadingSkeleton from "@/components/skeletons/LoadingSkeleton";

const HomePage = () => {
  const {
    newReleaseAlbums,
    newReleaseTracks,
    popularAlbums,
    popularTracks,
    discoverAlbums,
    discoverTracks,
    fetchNewReleases,
    fetchDiscoverAndPopular,
  } = useSuggestStore();

  const [displayMode, setDisplayMode] = useState<HomeDisplayMode>("all");

  const hasEmpty =
    !newReleaseAlbums ||
    !newReleaseTracks ||
    !popularAlbums ||
    !popularTracks ||
    !discoverAlbums ||
    !discoverTracks;

  useEffect(() => {
    const fetchSuggestions = async () => {
      await Promise.all([fetchNewReleases(), fetchDiscoverAndPopular()]);
    };

    if (hasEmpty) {
      fetchSuggestions();
    }
  }, [fetchNewReleases, fetchDiscoverAndPopular, hasEmpty]);

  if (hasEmpty) return <LoadingSkeleton height="300px" />;

  return (
    <main className="h-full overflow-hidden rounded-lg bg-zinc-900">
      <ScrollArea className="h-full">
        <div className="space-y-6">
          <DisplayMode
            displayMode={displayMode}
            setDisplayMode={setDisplayMode}
          />
          <DiscoverSection tracks={discoverTracks} />
          <AlbumsSection
            title="Top Albums"
            displayMode={displayMode}
            albums={popularAlbums}
          />
          <ArtistsSection displayMode={displayMode} />
          <AlbumsSection
            title="New Releases"
            displayMode={displayMode}
            albums={newReleaseAlbums}
          />
          <AlbumsSection
            title="Discover New"
            displayMode={displayMode}
            albums={discoverAlbums}
          />

          <TracksSection
            title="Top Hits"
            displayMode={displayMode}
            tracks={popularTracks}
          />

          <TracksSection
            title="Discover More"
            displayMode={displayMode}
            tracks={discoverTracks}
          />
          <TracksSection
            title="Trending Songs"
            displayMode={displayMode}
            tracks={newReleaseTracks}
          />
        </div>
      </ScrollArea>
    </main>
  );
};

export default HomePage;

const DisplayMode = ({
  displayMode,
  setDisplayMode,
}: {
  displayMode: HomeDisplayMode;
  setDisplayMode: Dispatch<SetStateAction<HomeDisplayMode>>;
}) => {
  return (
    <div className="flex items-center gap-2 px-10 mt-6">
      <button
        onClick={() => setDisplayMode("all")}
        className={twMerge(
          "px-4 py-1 rounded-full transition-all duration-300 font-medium text-sm ",
          displayMode === "all"
            ? "bg-white text-black"
            : "bg-zinc-700 hover:bg-zinc-600 text-zinc-200"
        )}
      >
        All
      </button>
      <button
        onClick={() => setDisplayMode("tracks")}
        className={twMerge(
          "px-4 py-1 rounded-full transition-all duration-300 font-medium text-sm ",
          displayMode === "tracks"
            ? "bg-white text-black"
            : "bg-zinc-700 hover:bg-zinc-600 text-zinc-200"
        )}
      >
        Tracks
      </button>
      <button
        onClick={() => setDisplayMode("albums")}
        className={twMerge(
          "px-4 py-1 rounded-full transition-all duration-300 font-medium text-sm ",
          displayMode === "albums"
            ? "bg-white text-black"
            : "bg-zinc-700 hover:bg-zinc-600 text-zinc-200"
        )}
      >
        Albums
      </button>
      <button
        onClick={() => setDisplayMode("artists")}
        className={twMerge(
          "px-4 py-1 rounded-full transition-all duration-300 font-medium text-sm ",
          displayMode === "artists"
            ? "bg-white text-black"
            : "bg-zinc-700 hover:bg-zinc-600 text-zinc-200"
        )}
      >
        Artists
      </button>
    </div>
  );
};
