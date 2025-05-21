import Topbar from "@/components/Topbar";
import FeatureSection from "@/components/FeatureSection";
import { useMusicStore } from "@/stores/useMusicStore";
import { useEffect } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import SectionGrid from "@/components/SectionGrid";
import { usePlayerStore } from "@/stores/usePlayerStore";
import { useSuggestStore } from "@/stores/useSuggestionsStore";

const HomePage = () => {
  // const {
  //   isLoading,
  //   madeForYouSongs,
  //   trendingSongs,
  //   featuredSongs,
  //   fetchMadeForYouSongs,
  //   fetchTrendingSongs,
  //   fetchFeaturedSongs,
  // } = useMusicStore();

  // const { initializeQueue } = usePlayerStore();

  // useEffect(() => {
  //   fetchMadeForYouSongs();
  //   fetchTrendingSongs();
  //   fetchFeaturedSongs();
  // }, [fetchMadeForYouSongs, fetchTrendingSongs, fetchFeaturedSongs]);

  // useEffect(() => {
  //   if (
  //     madeForYouSongs.length > 0 &&
  //     trendingSongs.length > 0 &&
  //     featuredSongs.length > 0
  //   ) {
  //     initializeQueue([...madeForYouSongs, ...trendingSongs, ...featuredSongs]);
  //   }
  // }, [madeForYouSongs, trendingSongs, featuredSongs, initializeQueue]);

  const { isLoading, newReleaseAlbums, newReleaseTracks, fetchNewReleases } =
    useSuggestStore();

  useEffect(() => {
    fetchNewReleases();
  }, [fetchNewReleases]);

  useEffect(() => {
    if (newReleaseAlbums && newReleaseTracks) {
      console.log("ALBUMS: ", newReleaseAlbums);
      console.log("TRACKS: ", newReleaseTracks);
    }
  }, [newReleaseAlbums, newReleaseTracks]);

  return (
    <main className="rounded overflow-hidden h-full bg-gradient-to-b from-zinc-800 to-zinc-900">
      <Topbar />
      <ScrollArea className="h-[calc(100vh-180px)]">
        <div className="p-4 sm:p-6">
          <h1 className="text-2xl sm:text-3xl font-bold mb-6">
            Good afternoon
          </h1>
          <FeatureSection />
          <div className="space-y-8">
            <SectionGrid
              title="New Releases"
              tracks={newReleaseTracks}
              isLoading={isLoading}
            />
            {/* <SectionGrid
              title="Trending"
              songs={trendingSongs}
              isLoading={isLoading}
            /> */}
          </div>
        </div>
      </ScrollArea>
    </main>
  );
};

export default HomePage;
