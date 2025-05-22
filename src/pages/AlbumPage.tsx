import { useMusicStore } from "@/stores/useMusicStore";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ClockIcon, DotIcon, Music4Icon } from "lucide-react";
import PauseIcon from "@/components/icons/PauseIcon";
import PlayIcon from "@/components/icons/PlayIcon";
import { formatDuration } from "@/lib/utils";
import { usePlayerStore } from "@/stores/usePlayerStore";

const AlbumPage = () => {
  const { id } = useParams();
  const { isAlbumLoading, album, tracks, fetchAlbumById } = useMusicStore();

  const { currentTrack, playAlbum, togglePlay, isPlaying } = usePlayerStore();

  const isAlbumPlaying = album?.track_ids.some(
    (id) => id === currentTrack?._id,
  );

  const handlePlaySong = (index: number) => {
    playAlbum(tracks, index);
  };

  const handlePlayAlbum = () => {
    if (isAlbumPlaying) {
      togglePlay();
    } else {
      playAlbum(tracks, 0);
    }
  };

  useEffect(() => {
    if (id) fetchAlbumById(id);
  }, [fetchAlbumById, id]);

  useEffect(() => {
    if (album) console.log(album.color);
  }, [album?.color, album]);

  if (!album || !tracks || isAlbumLoading)
    return <div className="text-4xl text-white">Loading...</div>;

  return (
    <div className="h-full">
      <ScrollArea className="h-full">
        <div className="h-full w-full">
          <div className="relative">
            <div
              className="absolute inset-0 h-[500px] w-full rounded-md"
              style={{
                background: `linear-gradient(to bottom, ${album.color}, black)`,
              }}
            />
            <div className="flex w-full flex-col">
              <div className="z-10 flex gap-6 p-6">
                <img
                  src={album.image.url}
                  alt={album.name}
                  className="h-60 w-60 rounded shadow-lg"
                />
                <div className="flex flex-col justify-end text-white">
                  <p className="text-sm font-light">
                    {album.type[0].toUpperCase() + album.type.slice(1)}
                  </p>
                  <h1 className="mt-2 mb-4 text-8xl font-extrabold">
                    {album.name}
                  </h1>
                  <div className="flex items-center gap-1 text-sm font-light text-white/50">
                    <span className="font-semibold text-white">
                      {album.artists.map((artist) => artist.name).join(", ")}
                    </span>
                    <DotIcon className="size-4" />
                    <span>{album.release_date.split("-")[0]}</span>
                    <DotIcon className="size-4" />
                    <span>{tracks.length} songs</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Table Section */}
            <div className="bg-black/20 backdrop-blur-sm">
              <div className="z-10 flex w-full items-center justify-between px-6 py-6">
                <button
                  onClick={handlePlayAlbum}
                  className="flex size-14 cursor-pointer items-center justify-center rounded-full bg-blue-500 text-black transition-all hover:scale-105 hover:bg-blue-400"
                >
                  {isPlaying && isAlbumPlaying ? (
                    <div className="flex size-7 items-center justify-center">
                      <PauseIcon className="size-6" />
                    </div>
                  ) : (
                    <PlayIcon className="size-7" />
                  )}
                </button>
              </div>
              {/* table header */}
              <div className="grid grid-cols-[16px_4fr_2fr_1fr] gap-4 border-b border-white/5 px-10 py-2 text-sm text-zinc-400">
                <div>#</div>
                <div>Title</div>
                <div>Released Date</div>
                <div>
                  <ClockIcon className="h-4 w-4" />
                </div>
              </div>

              {/* Tracks List */}

              <div className="px-6">
                <div className="space-y-2 py-4">
                  {tracks.map((track, index) => {
                    const isCurrentSong = currentTrack?._id === track._id;

                    return (
                      <div
                        onClick={() => handlePlaySong(index)}
                        key={track._id}
                        className="group grid cursor-pointer grid-cols-[16px_4fr_2fr_1fr] gap-4 rounded-md px-4 py-2 text-sm text-zinc-400 hover:bg-white/5"
                      >
                        <div className="flex items-center justify-center">
                          {isCurrentSong && isPlaying ? (
                            <Music4Icon className="size-4 text-green-500" />
                          ) : (
                            <span className="group-hover:hidden">
                              {index + 1}
                            </span>
                          )}
                          {!isCurrentSong && (
                            <PlayIcon className="hidden h-4 w-4 group-hover:block" />
                          )}
                        </div>

                        <div className="flex items-center gap-3">
                          <img
                            src={track.image.url}
                            alt={track.name}
                            className="size-10"
                          />

                          <div>
                            <div className="font-medium text-white">
                              {track.name}
                            </div>
                            <div>
                              {track.artists
                                .map((artist) => artist.name)
                                .join(", ")}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center">
                          {track.createdAt.split("T")[0]}
                        </div>
                        <div className="flex items-center">
                          {formatDuration(track.duration)}
                        </div>
                      </div>
                    );
                  })}
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
