import FeatureSection from "@/components/FeatureSection";
import { useEffect } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import TracksSection from "@/components/section/TracksSection";
import { useSuggestStore } from "@/stores/useSuggestionsStore";
import AlbumsSection from "@/components/section/AlbumsSection";
import ArtistsSection from "@/components/section/ArtistsSection";

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

  const {
    isLoading,
    newReleaseAlbums,
    newReleaseTracks,
    topArtists,
    moreLikeArtist,
    fetchNewReleases,
    fetchTopAndMoreLike,
  } = useSuggestStore();

  useEffect(() => {
    fetchNewReleases();
    fetchTopAndMoreLike();
  }, [fetchNewReleases, fetchTopAndMoreLike]);

  useEffect(() => {
    if (newReleaseAlbums && newReleaseTracks) {
      console.log("ALBUMS: ", newReleaseAlbums);
      console.log("TRACKS: ", newReleaseTracks);
    }
  }, [newReleaseAlbums, newReleaseTracks]);

  return (
    <main className="h-full overflow-hidden rounded bg-zinc-900">
      {/* <Topbar /> */}
      <ScrollArea className="h-full">
        <FeatureSection />
        <div className="space-y-8">
          <ArtistsSection title="Top Artists" artists={topArtists} isLoading={isLoading} />
          <AlbumsSection title="New Releases" albums={newReleaseAlbums} isLoading={isLoading} />
          <TracksSection title="New Releases" tracks={newReleaseTracks} isLoading={isLoading} />
        </div>
      </ScrollArea>
    </main>
  );
};

export default HomePage;
