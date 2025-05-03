import { useMusicStore } from "@/stores/useMusicStore";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ClockIcon, DotIcon, PlayIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatDuration } from "@/lib/utils";

const AlbumPage = () => {
  const { id } = useParams();
  const { album, fetchAlbumById, isLoading } = useMusicStore();

  useEffect(() => {
    if (id) fetchAlbumById(id);
  }, [fetchAlbumById, id]);

  if (isLoading) return null;

  return (
    <div className="h-full">
      <ScrollArea className="h-full">
        {/* Main Content */}
        <div className="min-h-full w-full">
          {/* BG Gradient */}
          <div
            className="absolute inset-0 bg-gradient-to-b from-[#5038a0]/80 
          via-zinc-900/80 to-zinc-900 pointer-events-none rounded-md"
            aria-hidden="true"
          />
          {/* Content */}
          <div className="relative z-10">
            {/* Album Info */}
            <div className="flex p-6 gap-6 pb-8">
              <img
                src={album?.imageUrl}
                alt={album?.title}
                className="w-60 h-60 rounded shadow-xl"
              />
              <div className="flex flex-col justify-end">
                <p className="text-sm font-medium">Album</p>
                <h1 className="text-7xl font-bold my-4">{album?.title}</h1>
                <div className="flex items-center gap-1 text-sm text-zinc-100">
                  <span className="text-white font-medium">
                    {album?.artist}
                  </span>
                  <DotIcon className="size-4" />
                  <span>{album?.songs.length} songs</span>
                  <DotIcon className="size-4" />
                  <span>{album?.releaseYear}</span>
                </div>
              </div>
            </div>

            {/* Play Button */}
            <div className="px-6 pb-4 flex items-center gap-6">
              <Button
                size="icon"
                className="size-14 rounded-full bg-green-500 hover:bg-green-400 hover:scale-105 transition-all"
              >
                <PlayIcon className="h-7 w-7 text-black" />
              </Button>
            </div>

            {/* Table Section */}
            <div className="bg-black/20 backdrop-blur-sm">
              {/* table header */}
              <div className="grid grid-cols-[16px_4fr_2fr_1fr] gap-4 px-10 py-2 text-sm text-zinc-400 border-b border-white/5">
                <div>#</div>
                <div>Title</div>
                <div>Released Date</div>
                <div>
                  <ClockIcon className="h-4 w-4" />
                </div>
              </div>

              {/* Songs List */}

              <div className="px-6">
                <div className="space-y-2 py-4">
                  {album?.songs.map((song, index) => (
                    <div
                      key={song._id}
                      className="grid grid-cols-[16px_4fr_2fr_1fr] gap-4 px-4 py-2 text-sm 
                      text-zinc-400 hover:bg-white/5 rounded-md group cursor-pointer"
                    >
                      <div className="flex items-center justify-center">
                        <span className="group-hover:hidden">{index + 1}</span>
                        <PlayIcon className="h-4 w-4 hidden group-hover:block" />
                      </div>

                      <div className="flex items-center gap-3">
                        <img
                          src={song.imageUrl}
                          alt={song.title}
                          className="size-10"
                        />

                        <div>
                          <div className="font-medium text-white">
                            {song.title}
                          </div>
                          <div>{song.artist}</div>
                        </div>
                      </div>
                      <div className="flex items-center">
                        {song.createdAt.split("T")[0]}
                      </div>
                      <div className="flex items-center">
                        {formatDuration(song.duration)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/*  */}
          </div>
        </div>
      </ScrollArea>
    </div>
  );
};
export default AlbumPage;
