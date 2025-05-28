import { Playlist, Track } from "@/types";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
// utils
import { formatDuration } from "@/lib/utils";
// store
import { usePlayerStore } from "@/stores/usePlayerStore";
// components
import { ClockIcon, DotIcon } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import PauseIcon from "@/components/icons/PauseIcon";
import PlayIcon from "@/components/icons/PlayIcon";
import MusicAnimationIcon from "@/components/icons/MusicAnimationIcon";
import ContextMenu from "@/components/ContextMenu";
import { getPlayList } from "@/services/playlist";
import { useUserStore } from "@/stores/useAuthStore";

const PlayListPage = () => {
  const { id } = useParams();
  const {
    currentTrack,
    playTracks,
    togglePlay,
    isPlaying,
    playListId,
    playList,
    setPlayList,
    setTracksAndCurrentTrack,
  } = usePlayerStore();

  const handlePlayPlaylist = (track: Track, tracks: Track[]) => {
    if (isPlaying && playListId === id) {
      togglePlay();
    } else {
      setTracksAndCurrentTrack(track, tracks, id);
    }
  };

  useEffect(() => {
    const fetchPlayList = async (id: string) => {
      const response = await getPlayList(id);
      if (response) {
        setPlayList(response);
      }
    };

    if (id && !playList) {
      fetchPlayList(id);
    }
  }, [id, playList, setPlayList]);

  if (!playList) return <ArtistSkeleton />;

  return (
    <div className="h-full bg-zinc-900 select-none">
      <ScrollArea className="h-full w-full">
        <div className="h-full w-full relative">
          <AlbumColorGradient color={"#000000"} />
          <PlaylistInfo
            playList={playList}
            trackLength={playList.tracks.length}
            handlePlayPlaylist={handlePlayPlaylist}
            isPlaylistPlaying={isPlaying && playListId === id}
          />
          {/* Table Section */}
          <div className="bg-black/20 backdrop-blur-sm">
            <TableHeader />
            <div className="space-y-2 py-4 px-6">
              {playList.tracks.map((track, index) => (
                <TrackListItem
                  key={track._id}
                  track={track}
                  index={index}
                  isPlaying={isPlaying}
                  isCurrentTrack={currentTrack?._id === track._id}
                  handlePlayTrack={() => playTracks(playList.tracks, index)}
                />
              ))}
            </div>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
};
export default PlayListPage;

const AlbumColorGradient = ({ color }: { color: string }) => {
  return (
    <div
      className="absolute inset-0 h-[500px] w-full rounded-md"
      style={{
        background: `linear-gradient(to bottom, ${color}, #18181b)`,
      }}
    />
  );
};

const PlaylistInfo = ({
  playList,
  trackLength,
  handlePlayPlaylist,
  isPlaylistPlaying,
}: {
  playList: Playlist;
  trackLength: number;
  handlePlayPlaylist: (track: Track, tracks: Track[]) => void;
  isPlaylistPlaying: boolean;
}) => {
  const { user } = useUserStore();

  return (
    <div className="w-full flex items-end justify-between pr-4">
      <div className="z-10 flex gap-6 p-6">
        <img
          src={playList.tracks[0].album.image.url}
          alt={playList.name}
          className="h-60 w-60 rounded shadow-lg"
          draggable={false}
        />
        <div className="flex flex-col w-full justify-end text-white">
          <p className="text-sm font-light">Playlist</p>
          <h1 className="text-8xl min-h-[104px] max-h-[208px] mt-1 font-extrabold line-clamp-2">
            {playList.name}
          </h1>
          <div className="flex items-center gap-1 text-sm font-light text-white/50">
            <span className="font-semibold text-white hover:underline">
              {user ? user.username : "User Created"}
            </span>
            <DotIcon className="size-4" />
            <span>{trackLength} songs</span>
          </div>
        </div>
      </div>

      <div className="z-10 flex items-center justify-between px-6 py-6">
        <button
          onClick={() =>
            handlePlayPlaylist(playList.tracks[0], playList.tracks)
          }
          className="flex size-14 cursor-pointer items-center justify-center rounded-full bg-white/60 text-black transition-all duration-200 hover:scale-105 hover:bg-white"
        >
          {isPlaylistPlaying ? (
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
  handlePlayTrack: () => void;
}) => {
  return (
    <div
      onClick={handlePlayTrack}
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

      <div className="flex items-center gap-2">
        <span>{formatDuration(track.duration)}</span>
        <ContextMenu />
      </div>
    </div>
  );
};

const ArtistSkeleton = () => {
  return (
    <div className="h-full bg-zinc-900 select-none">
      <ScrollArea className="h-full w-full">
        <div className="h-full w-full relative">
          <AlbumColorGradient color={"#000000"} />
          <div className="w-full flex items-end justify-between pr-4">
            <div className="z-10 p-6">
              <div className="size-60 animate-pulse rounded-md bg-zinc-800/50" />
            </div>
          </div>
          <div className="bg-black/20 backdrop-blur-sm pb-40">
            <TableHeader />
            <div className="space-y-2 py-4 px-6">
              {Array.from({ length: 6 }).map((_, index) => (
                <div
                  key={index}
                  className="group flex cursor-pointer items-center justify-between rounded-md pl-3.5 pr-6 py-2 text-sm text-zinc-400 hover:bg-white/10"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex items-center justify-center size-6">
                      {index + 1}
                    </div>
                    <div className="flex items-center gap-3 h-10 w-32 bg-zinc-800/50 animate-pulse rounded-md" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
};
