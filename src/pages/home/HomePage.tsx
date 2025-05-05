import Topbar from "@/components/Topbar";
import { useMusicStore } from "@/stores/useMusicStore";
import { useEffect } from "react";

const HomePage = () => {
  const {
    isLoading,
    error,
    madeForYouSongs,
    trendingSongs,
    featuredSongs,
    fetchMadeForYouSongs,
    fetchTrendingSongs,
    fetchFeaturedSongs,
  } = useMusicStore();

  useEffect(() => {
    fetchMadeForYouSongs();
    fetchTrendingSongs();
    fetchFeaturedSongs();
  }, [fetchMadeForYouSongs, fetchTrendingSongs, fetchFeaturedSongs]);

  return (
    <div className="rounded">
      <Topbar />
    </div>
  );
};

export default HomePage;
