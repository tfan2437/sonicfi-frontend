import { Album, Artist, Track } from "@/types";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
// utils
import { formatDuration } from "@/lib/utils";
import { formatNumber } from "@/lib/utils";
// store
import { useMusicStore } from "@/stores/useMusicStore";
import { usePlayerStore } from "@/stores/usePlayerStore";
// components
import { CheckIcon } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import PlayIcon from "@/components/icons/PlayIcon";
import MusicAnimationIcon from "@/components/icons/MusicAnimationIcon";
import AlbumsSection from "@/components/section/AlbumsSection";
import BiographySection from "@/components/section/BiographySection";

const ArtistPage = () => {
  const { id } = useParams();
  const { fetchArtistById } = useMusicStore();
  const { currentTrack, playTracks, isPlaying } = usePlayerStore();
  const [showMoreTracks, setShowMoreTracks] = useState<boolean>(false);

  const [artist, setArtist] = useState<Artist | null>(null);
  const [albums, setAlbums] = useState<Album[] | null>(null);
  const [tracks, setTracks] = useState<Track[] | null>(null);

  const handlePlayTrack = (tracks: Track[], index: number) => {
    playTracks(tracks, index);
  };

  useEffect(() => {
    const getArtist = async (id: string) => {
      const response = await fetchArtistById(id);
      if (response) {
        setArtist(response.artist);
        setAlbums(response.albums);
        setTracks(response.tracks);
      }
    };

    if (id) getArtist(id);
  }, [fetchArtistById, id]);

  if (!artist || !albums || !tracks) {
    return <ArtistSkeleton />;
  }

  return (
    <div className="h-full bg-zinc-900 select-none">
      <ScrollArea className="h-full w-full">
        <div className="h-full w-full relative">
          <ArtistHeaderImage headerImage={artist.header_image.url} />
          <ArtistInfo artist={artist} />
          <div className="bg-black/60 backdrop-blur-lg">
            <TableHeader />
            <div className="grid grid-cols-1 xl:grid-cols-[2fr_1fr]">
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
                      handlePlayTrack={() => handlePlayTrack(tracks, index)}
                    />
                  );
                })}
              </div>
              <ArtistPick
                album={albums[0]}
                artistImage={artist.profile_image.url}
              />
            </div>
            <div className="flex items-center px-10 pb-20">
              <button
                onClick={() => setShowMoreTracks(!showMoreTracks)}
                className="text-sm text-zinc-400 hover:text-white"
              >
                {showMoreTracks ? "Show Less" : "Show More"}
              </button>
            </div>
            <AlbumsSection
              title={"Discography"}
              albums={albums}
              displayMode="albums"
            />
            <div className="px-7 mt-32 pb-4">
              <BiographySection
                artist={artist}
                className="text-zinc-300 font-light text-sm"
              />
            </div>
          </div>
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
            background: `linear-gradient(to bottom, transparent, #18181b)`,
          }}
        />
      </div>
    </div>
  );
};

const ArtistInfo = ({ artist }: { artist: Artist }) => {
  return (
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
  );
};

const TableHeader = () => {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-[2fr_1fr] px-6 pt-6 text-xl font-semibold text-white">
      <span className="pl-4">Popular</span>
      <span className="pl-2 hidden xl:block">Artist Pick</span>
    </div>
  );
};

const ArtistPick = ({
  album,
  artistImage,
}: {
  album: Album;
  artistImage: string;
}) => {
  return (
    <div className="w-full hidden xl:block">
      <Link to={`/album/${album._id}`}>
        <div className="flex gap-4 pt-4">
          <img
            src={album.image.url}
            alt={album.name}
            className="aspect-square size-22 rounded"
          />
          <div className="flex flex-col">
            <div className="flex items-center gap-2 mb-3">
              <img
                src={artistImage}
                alt={album.artists[0].name}
                className="size-5 rounded-full"
              />
              <div className="text-sm text-zinc-400">
                {album.artists.map((artist) => artist.name).join(", ")}
              </div>
            </div>
            <div className="font-medium text-white">{album.name}</div>
            <div className="text-sm text-zinc-400 font-light">
              {album.type[0].toUpperCase() + album.type.slice(1)}
            </div>
          </div>
        </div>
      </Link>
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
  handlePlayTrack: () => void;
}) => {
  return (
    <div
      onClick={handlePlayTrack}
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
          src={track.album.image.url}
          alt={track.name}
          className="w-10 h-10 rounded-[3px]"
        />
        <div className="font-medium text-white line-clamp-1">{track.name}</div>
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

const ArtistSkeleton = () => {
  return (
    <div className="h-full bg-zinc-900 select-none">
      <ScrollArea className="h-full w-full">
        <div className="h-full w-full relative">
          <div className="flex gap-6 px-8 py-6 w-full h-[350px] rounded-t-md bg-zinc-800/50 animate-pulse" />
          <div className="bg-black/60 backdrop-blur-lg pb-40">
            <div className="grid grid-cols-[2fr_1fr] px-6 pt-6 text-xl font-semibold text-white opacity-0">
              <span className="pl-4">.</span>
              <span className="pl-2">.</span>
            </div>
            <div className="grid grid-cols-[2fr_1fr]">
              <div className="space-y-2 py-4 px-6">
                {Array.from({ length: 6 }).map((_, index) => (
                  <div
                    key={index}
                    className="group grid w-full max-w-7xl grid-cols-[16px_4fr_2fr_2fr] gap-4 px-10 cursor-pointer rounded-md pl-3.5 pr-6 py-2 text-sm text-zinc-400 hover:bg-white/10"
                  >
                    <div className="flex items-center justify-center size-6 h-full">
                      <span>{index + 1}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="size-10 bg-zinc-800/50 animate-pulse rounded-md" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
};
