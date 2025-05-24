import { useMusicStore } from "@/stores/useMusicStore";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ClockIcon, DotIcon } from "lucide-react";
import PauseIcon from "@/components/icons/PauseIcon";
import PlayIcon from "@/components/icons/PlayIcon";
import { formatDuration } from "@/lib/utils";
import { usePlayerStore } from "@/stores/usePlayerStore";
import { Album, Track } from "@/types";
import MusicAnimationIcon from "@/components/icons/MusicAnimationIcon";
import { formatDate } from "@/lib/format";
import { useSuggestStore } from "@/stores/useSuggestionsStore";
import AlbumsSection from "@/components/section/AlbumsSection";

// TODO: loading state and loading skeleton for album, tracks, and more like artist albums

const AlbumPage = () => {
  const { id } = useParams();
  const { isAlbumLoading, album, tracks, fetchAlbumById } = useMusicStore();

  const { currentTrack, playTracks, togglePlay, isPlaying } = usePlayerStore();
  const { isLoading, moreByArtistAlbums, fetchMoreByArtistAlbums } =
    useSuggestStore();

  const isAlbumPlaying = album?.track_ids.some(
    (id) => id === currentTrack?._id
  );

  const handlePlayTrack = (index: number) => {
    playTracks(tracks, index);
  };

  const handlePlayAlbum = () => {
    if (isAlbumPlaying) {
      togglePlay();
    } else {
      playTracks(tracks, 0);
    }
  };

  useEffect(() => {
    if (id) fetchAlbumById(id);
  }, [fetchAlbumById, id]);

  useEffect(() => {
    if (album) fetchMoreByArtistAlbums(album.artists[0].id);
  }, [fetchMoreByArtistAlbums, album, id]);

  if (!album || !tracks || isAlbumLoading)
    return <div className="text-4xl text-white">Loading...</div>;

  return (
    <div className="h-full bg-zinc-950 select-none">
      <ScrollArea className="h-full w-full">
        <div className="h-full w-full relative">
          <AlbumColorGradient color={album.color} />
          <AlbumInfo
            album={album}
            trackLength={tracks.length}
            handlePlayAlbum={handlePlayAlbum}
            isPlaying={isPlaying}
            isAlbumPlaying={isAlbumPlaying || false}
          />
          {/* Table Section */}
          <div className="bg-black/20 backdrop-blur-sm">
            <TableHeader />
            <div className="space-y-2 py-4 px-6">
              {tracks.map((track, index) => (
                <TrackListItem
                  key={track._id}
                  track={track}
                  index={index}
                  isPlaying={isPlaying}
                  isCurrentTrack={currentTrack?._id === track._id}
                  handlePlayTrack={handlePlayTrack}
                />
              ))}
            </div>
            <AlbumCopyright
              releaseDate={album.release_date}
              copyright={album.copyright}
            />
          </div>
          <div className="w-full mt-20 pb-6">
            <AlbumsSection
              title={`More by ${album.artists[0].name}`}
              albums={moreByArtistAlbums.filter((a) => a._id !== album._id)}
              isLoading={isLoading}
            />
          </div>
        </div>
      </ScrollArea>
    </div>
  );
};
export default AlbumPage;

const AlbumColorGradient = ({ color }: { color: string }) => {
  return (
    <div
      className="absolute inset-0 h-[500px] w-full rounded-md"
      style={{
        background: `linear-gradient(to bottom, ${color}, #09090b)`,
      }}
    />
  );
};

const AlbumInfo = ({
  album,
  trackLength,
  handlePlayAlbum,
  isPlaying,
  isAlbumPlaying,
}: {
  album: Album;
  trackLength: number;
  handlePlayAlbum: () => void;
  isPlaying: boolean;
  isAlbumPlaying: boolean;
}) => {
  return (
    <div className="w-full flex items-end justify-between pr-4">
      <div className="z-10 flex gap-6 p-6">
        <img
          src={album.image.url}
          alt={album.name}
          className="h-60 w-60 rounded shadow-lg"
          draggable={false}
        />
        <div className="flex flex-col w-full justify-end text-white">
          <p className="text-sm font-light">
            {album.type[0].toUpperCase() + album.type.slice(1)}
          </p>
          <h1 className="text-8xl min-h-[104px] max-h-[208px] mt-1 font-extrabold line-clamp-2">
            {album.name}
          </h1>
          <div className="flex items-center gap-1 text-sm font-light text-white/50">
            <Link to={`/artist/${album.artists[0].id}`}>
              <span className="font-semibold text-white hover:underline">
                {album.artists.map((artist) => artist.name).join(", ")}
              </span>
            </Link>
            <DotIcon className="size-4" />
            <span>{album.release_date.split("-")[0]}</span>
            <DotIcon className="size-4" />
            <span>{trackLength} songs</span>
          </div>
        </div>
      </div>

      <div className="z-10 flex items-center justify-between px-6 py-6">
        <button
          onClick={handlePlayAlbum}
          className="flex size-14 cursor-pointer items-center justify-center rounded-full bg-white/60 text-black transition-all duration-200 hover:scale-105 hover:bg-white"
        >
          {isPlaying && isAlbumPlaying ? (
            <div className="flex size-8 items-center justify-center">
              <PauseIcon className="size-7" />
            </div>
          ) : (
            <PlayIcon className="size-8" />
          )}
        </button>
      </div>
    </div>
  );
};

const TableHeader = () => {
  return (
    <div className="flex items-center justify-between border-b border-white/10 pl-10 pr-12 py-5 text-sm text-zinc-400">
      <div className="flex items-center gap-4">
        <div className="flex size-6 items-center justify-center">
          <span className="text-sm">#</span>
        </div>
        <div>Title</div>
      </div>
      <ClockIcon className="size-4" />
    </div>
  );
};

const TrackListItem = ({
  track,
  index,
  isPlaying,
  isCurrentTrack,
  handlePlayTrack,
}: {
  track: Track;
  index: number;
  isPlaying: boolean;
  isCurrentTrack: boolean;
  handlePlayTrack: (index: number) => void;
}) => {
  return (
    <div
      onClick={() => handlePlayTrack(index)}
      key={track._id}
      className="group flex cursor-pointer items-center justify-between rounded-md pl-3.5 pr-6 py-2 text-sm text-zinc-400 hover:bg-white/10"
    >
      <div className="flex items-center gap-4">
        <div className="flex items-center justify-center size-6">
          {isCurrentTrack && isPlaying ? (
            <MusicAnimationIcon />
          ) : (
            <span className="group-hover:hidden">{index + 1}</span>
          )}
          {!isCurrentTrack && (
            <PlayIcon className="hidden h-4 w-4 group-hover:block" />
          )}
        </div>
        <div className="flex items-center gap-3">
          <div>
            <div className="font-medium text-white">{track.name}</div>
            <div>{track.artists.map((artist) => artist.name).join(", ")}</div>
          </div>
        </div>
      </div>

      <div className="flex items-center">{formatDuration(track.duration)}</div>
    </div>
  );
};

const AlbumCopyright = ({
  releaseDate,
  copyright,
}: {
  releaseDate: string;
  copyright: string;
}) => {
  return (
    <div className="flex w-full items-center justify-between px-9 mt-4">
      <div className="flex flex-col font-light text-[11px] text-zinc-400">
        <span className="text-sm mb-1">{formatDate(releaseDate)}</span>
        <span>{copyright}</span>
        <span>{copyright}</span>
      </div>
    </div>
  );
};
