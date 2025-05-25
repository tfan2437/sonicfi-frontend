import FeatureSection from "@/components/FeatureSection";
import { useEffect } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import TracksSection from "@/components/section/TracksSection";
import { useSuggestStore } from "@/stores/useSuggestionsStore";
import AlbumsSection from "@/components/section/AlbumsSection";
import ArtistsSection from "@/components/section/ArtistsSection";

const HomePage = () => {
  const {
    newReleaseAlbums,
    newReleaseTracks,
    topArtists,
    moreByArtist,
    moreByArtistAlbums,
    popularAlbums,
    popularTracks,
    discoverAlbums,
    discoverTracks,
    fetchNewReleases,
    fetchTopArtistsAndMoreBy,
    fetchDiscoverAndPopular,
  } = useSuggestStore();

  const hasEmpty =
    !newReleaseAlbums ||
    !newReleaseTracks ||
    !topArtists ||
    !moreByArtist ||
    !moreByArtistAlbums ||
    !popularAlbums ||
    !popularTracks ||
    !discoverAlbums ||
    !discoverTracks;

  useEffect(() => {
    const fetchSuggestions = async () => {
      await Promise.all([
        fetchNewReleases(),
        fetchTopArtistsAndMoreBy(),
        fetchDiscoverAndPopular(),
      ]);
    };

    if (hasEmpty) {
      fetchSuggestions();
    }
  }, [
    fetchNewReleases,
    fetchTopArtistsAndMoreBy,
    fetchDiscoverAndPopular,
    hasEmpty,
  ]);

  if (hasEmpty) return <div className="text-4xl text-white">Loading...</div>;

  return (
    <main className="h-full overflow-hidden rounded-lg bg-zinc-900">
      <ScrollArea className="h-full">
        <FeatureSection />
        <div className="space-y-8">
          <ArtistsSection title="Top Artists" artists={topArtists} />
          <AlbumsSection
            title={`More By ${moreByArtistAlbums[0].artists[0].name}`}
            albums={moreByArtistAlbums}
          />
          <AlbumsSection title={"Discover New"} albums={discoverAlbums} />
          <AlbumsSection title={"Top Albums"} albums={popularAlbums} />
          <AlbumsSection title="New Releases" albums={newReleaseAlbums} />

          <TracksSection title="Top Hits" tracks={popularTracks} />
          <TracksSection title="Discover More" tracks={discoverTracks} />
          <TracksSection title="Trending Songs" tracks={newReleaseTracks} />
        </div>
      </ScrollArea>
    </main>
  );
};

export default HomePage;
