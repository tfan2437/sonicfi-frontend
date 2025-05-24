import { useMusicStore } from "@/stores/useMusicStore";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { ScrollArea } from "@/components/ui/scroll-area";
import { DotIcon, CheckIcon } from "lucide-react";
import PauseIcon from "@/components/icons/PauseIcon";
import PlayIcon from "@/components/icons/PlayIcon";
import { formatDuration } from "@/lib/utils";
import { usePlayerStore } from "@/stores/usePlayerStore";
import { Album, Track } from "@/types";
import MusicAnimationIcon from "@/components/icons/MusicAnimationIcon";
import { formatDate, formatNumber } from "@/lib/format";
import { useState } from "react";

// TODO: loading state and loading skeleton for album, tracks, and more like artist albums

const ArtistPage = () => {
  const { id } = useParams();
  const { artist, albums, tracks, fetchArtistById } = useMusicStore();

  const { currentTrack, playTracks, playListTracks, isPlaying } =
    usePlayerStore();

  const [showMoreTracks, setShowMoreTracks] = useState<boolean>(false);

  const isTracksPlaying = tracks.some((t) => t._id === currentTrack?._id);

  const handlePlayTrack = (index: number) => {
    playTracks(tracks, index);
  };

  useEffect(() => {
    if (id) fetchArtistById(id);
  }, [fetchArtistById, id]);

  useEffect(() => {
    if (tracks) console.log(tracks);
  }, [tracks]);

  if (!artist || !albums || !tracks)
    return <div className="text-4xl text-white">Loading...</div>;

  return (
    <div className="h-full bg-zinc-950 select-none">
      <ScrollArea className="h-full w-full">
        <div className="h-full w-full relative">
          <ArtistHeaderImage headerImage={artist.header_image.url} />
          <div className="flex gap-6 px-8 py-6 w-full h-[350px] items-end rounded-t-md">
            <div className="flex flex-col flex-1 text-white z-10">
              <div className="flex items-center gap-2 mb-2">
                <div className="bg-blue-500 rounded-full p-1">
                  <CheckIcon className="size-2.5 text-white" strokeWidth={3} />
                </div>
                <p className="text-sm font-light">Verified Artist</p>
              </div>
              <h1 className="text-8xl min-h-[104px] max-h-[208px] mt-1 font-extrabold line-clamp-2">
                {artist.name}
              </h1>
              <div className="flex items-center gap-1 text-sm font-light text-white">
                <span>{formatNumber(artist.monthly_listeners)}</span>
                <span>monthly listeners</span>
              </div>
            </div>
          </div>

          {/* Table Section */}
          <div className="bg-black/60 backdrop-blur-lg">
            <TableHeader />
            <div className="space-y-2 py-4 px-6">
              {tracks.map((track, index) => {
                if (!showMoreTracks && index > 9) return null;
                return (
                  <TrackListItem
                    key={track._id}
                    track={track}
                    index={index}
                    isPlaying={isPlaying}
                    isCurrentTrack={currentTrack?._id === track._id}
                    handlePlayTrack={handlePlayTrack}
                  />
                );
              })}
            </div>
            <div className="flex items-center px-10 pb-20">
              <button
                onClick={() => setShowMoreTracks(!showMoreTracks)}
                className="text-sm text-zinc-400 hover:text-white"
              >
                {showMoreTracks ? "Show Less" : "Show More"}
              </button>
            </div>
            {/* <AlbumCopyright
              releaseDate={album.release_date}
              copyright={album.copyright}
            /> */}
          </div>
          {/* <div className="w-full mt-20 pb-6">
            <AlbumsSection
              title={`More by ${album.artists[0].name}`}
              albums={moreByArtistAlbums.filter((a) => a._id !== album._id)}
              isLoading={isLoading}
            />
          </div> */}
        </div>
      </ScrollArea>
    </div>
  );
};
export default ArtistPage;

const ArtistHeaderImage = ({ headerImage }: { headerImage: string }) => {
  return (
    <div className="absolute inset-0 w-full">
      <div className="w-full h-auto relative">
        <img
          src={headerImage}
          alt="artist header"
          className="w-full object-cover rounded-t-md"
        />
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(to bottom, transparent, #09090b)`,
          }}
        />
      </div>
    </div>
  );
};

const ArtistInfo = ({
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
    <div className="flex items-center pl-10 pt-6">
      <span className="text-xl font-semibold text-white">Popular</span>
    </div>
  );
};
// className =
//   "grid grid-cols-[16px_4fr_2fr_1fr] gap-4 border-b border-white/5 px-10 py-2 text-sm text-zinc-400";
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
      className="group grid w-full max-w-7xl grid-cols-[16px_4fr_2fr_2fr] gap-4 px-10 cursor-pointer rounded-md pl-3.5 pr-6 py-2 text-sm text-zinc-400 hover:bg-white/10"
    >
      <div className="flex items-center justify-center size-6 h-full">
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
        <img
          src={track.image.url}
          alt={track.name}
          className="w-10 h-10 rounded-[3px]"
        />
        <div className="font-medium text-white">{track.name}</div>
      </div>

      <div className="w-full flex items-center justify-end">
        <div className="flex items-center h-full">
          {formatNumber(track.playcount)}
        </div>
      </div>
      <div className="w-full flex items-center justify-end">
        <div className="flex items-center h-full">
          {formatDuration(track.duration)}
        </div>
      </div>
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
