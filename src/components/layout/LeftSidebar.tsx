import { Link } from "react-router-dom";
import { LibraryIcon, MessageCircleIcon } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import PlaylistSkeleton from "@/components/skeletons/PlaylistSkeleton";
import { useMusicStore } from "@/stores/useMusicStore";
import { useEffect } from "react";
import SibebarLink from "@/components/link/SibebarLink";
import HomeIcon from "@/components/icons/HomeIcon";

const LeftSidebar = () => {
  // const { albums, isLoading, fetchAlbums } = useMusicStore();

  // useEffect(() => {
  //   fetchAlbums();
  // }, [fetchAlbums]);

  return (
    <div className="flex h-full flex-col gap-2">
      {/* Library Section */}
      <div className="flex-1 rounded-lg bg-zinc-900 px-3 py-2">
        <SibebarLink to="/" label="Home" icon={<HomeIcon />} />
        <SibebarLink to="/" label="Message" icon={<MessageCircleIcon className="size-5" />} />
        <SibebarLink to="/" label="Library" icon={<LibraryIcon className="size-5" />} />

        <ScrollArea className="h-[calc(100vh-300px)]">
          {/* <div className="space-y-2">
            {isLoading ? (
              <PlaylistSkeleton />
            ) : (
              albums.map((album) => (
                <Link
                  to={`/albums/${album._id}`}
                  key={album._id}
                  className="p-2 hover:bg-zinc-800 rounded-md flex items-center gap-3 group cursor-pointer"
                >
                  <img
                    src={album.imageUrl}
                    alt={"Playlist Image"}
                    className="size-12 flex-shrink-0 object-cover rounded-md"
                  />
                  <div className="flex-1 min-w-0 hidden md:block">
                    <p className="font-medium truncate">{album.title}</p>
                    <p className="text-sm text-zinc-400 truncate">
                      Album • {album.artist}
                    </p>
                  </div>
                </Link>
              ))
            )}
          </div> */}
        </ScrollArea>
      </div>
    </div>
  );
};
export default LeftSidebar;
