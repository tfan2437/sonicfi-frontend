import { ListIcon, PlusIcon } from "lucide-react";
import PauseIcon from "@/components/icons/PauseIcon";
import { ScrollArea } from "@/components/ui/scroll-area";
// store
import { usePlayerStore } from "@/stores/usePlayerStore";
import { useUserStore } from "@/stores/useAuthStore";
import { twMerge } from "tailwind-merge";
// types
import { ArtistCredit, Playlist, User } from "@/types/index";
import { createPlaylist, getPlaylists } from "@/services/playlist";
import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import PlayIcon from "@/components/icons/PlayIcon";

const LeftSidebar = () => {
  const navigate = useNavigate();
  const { user } = useUserStore();

  const [isLoading, setIsLoading] = useState(false);
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [displayType, setDisplayType] = useState<
    "playlists" | "albums" | "artists"
  >("playlists");

  const fetchPlaylists = useCallback(async () => {
    if (!user) return;
    const playlists = await getPlaylists(user.uid);
    setPlaylists(playlists);
  }, [user]);

  useEffect(() => {
    fetchPlaylists();
  }, [user, fetchPlaylists]);

  const handleCreatePlaylist = async () => {
    if (!user || isLoading) return;
    setIsLoading(true);
    await createPlaylist(user.uid, `My Playlist #${playlists.length + 1}`, [
      "65EIzsI7l5NgVG6ARaPath",
    ]);
    await fetchPlaylists();
    setIsLoading(false);
  };

  const displayAlbums = [
    ...new Map(
      playlists
        .flatMap((playlist) => playlist.tracks.map((track) => track.album))
        .map((album) => [album._id, album])
    ).values(),
  ];

  const displayArtists = [
    ...new Map(
      playlists
        .flatMap((playlist) =>
          playlist.tracks.flatMap((track) => track.artists)
        )
        .map((artist) => [artist._id, artist])
    ).values(),
  ];

  return (
    <div className="flex h-full flex-col gap-2 select-none w-[300px]">
      <div className="flex-1 rounded-lg bg-zinc-900 py-4">
        <div className="flex items-center justify-between px-4">
          <span className="font-semibold">Your Library</span>
          <button
            onClick={handleCreatePlaylist}
            className="flex items-center p-1 rounded-full bg-transparent hover:bg-zinc-700 transition-all duration-300 text-white"
          >
            <PlusIcon className="size-5" />
          </button>
        </div>
        <div className="flex items-center justify-between my-2 px-4">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setDisplayType("playlists")}
              className="px-3 py-1 rounded-full bg-zinc-700 hover:bg-zinc-600 transition-all duration-300 font-light text-xs text-zinc-200"
            >
              Playlists
            </button>
            <button
              onClick={() => setDisplayType("albums")}
              className="px-3 py-1 rounded-full bg-zinc-700 hover:bg-zinc-600 transition-all duration-300 font-light text-xs text-zinc-200"
            >
              Albums
            </button>
            <button
              onClick={() => setDisplayType("artists")}
              className="px-3 py-1 rounded-full bg-zinc-700 hover:bg-zinc-600 transition-all duration-300 font-light text-xs text-zinc-200"
            >
              Artists
            </button>
          </div>
          <button className="flex items-center p-1 rounded-full transition-all duration-300 text-zinc-400">
            <ListIcon className="size-5" />
          </button>
        </div>
        <ScrollArea className="h-[calc(100vh-260px)] px-2">
          {displayType === "playlists" && (
            <Playlists playlists={playlists} user={user} navigate={navigate} />
          )}
          {displayType === "albums" && (
            <AlbumItem albums={displayAlbums} navigate={navigate} />
          )}
          {displayType === "artists" && (
            <ArtistItem artists={displayArtists} navigate={navigate} />
          )}
        </ScrollArea>
      </div>
    </div>
  );
};
export default LeftSidebar;

const Playlists = ({
  playlists,
  user,
  navigate,
}: {
  playlists: Playlist[];
  user: User | null;
  navigate: (path: string) => void;
}) => {
  return (
    <div className="flex flex-col w-[284px]">
      {playlists.map((playlist) => (
        <PlayListItem
          key={playlist._id}
          playlist={playlist}
          user={user}
          navigate={navigate}
        />
      ))}
    </div>
  );
};

const PlayListItem = ({
  playlist,
  user,
  navigate,
}: {
  playlist: Playlist;
  user: User | null;
  navigate: (path: string) => void;
}) => {
  const {
    playListId,
    isPlaying,
    togglePlay,
    setTracksAndCurrentTrack,
    setPlayList,
  } = usePlayerStore();

  return (
    <div
      key={playlist._id}
      className="group grid w-full grid-cols-[48px_1fr_24px] items-center hover:bg-zinc-800 gap-2 p-2 rounded cursor-pointer group"
      onClick={() => {
        setPlayList(playlist);
        navigate(`/playlist/${playlist._id}`);
      }}
    >
      <div className="size-12 relative">
        <div className="absolute inset-0 flex items-center justify-center">
          {playListId === playlist._id && isPlaying && (
            <div
              onClick={(e) => {
                e.stopPropagation();
                togglePlay();
              }}
              className={twMerge(
                "size-8 items-center bg-black/10 backdrop-blur-sm rounded-full justify-center text-white flex"
              )}
            >
              <PauseIcon className="size-6" />
            </div>
          )}
          {(playListId !== playlist._id || !isPlaying) && (
            <div
              onClick={(e) => {
                e.stopPropagation();
                if (playlist.tracks.length === 0) return;
                setTracksAndCurrentTrack(
                  playlist.tracks[0],
                  playlist.tracks,
                  playlist._id
                );
              }}
              className={twMerge(
                "size-8 items-center justify-center bg-black/10 backdrop-blur-sm rounded-full text-white hidden group-hover:flex"
              )}
            >
              <PlayIcon className="size-6" />
            </div>
          )}
        </div>
        {playlist.tracks.length > 0 ? (
          <img
            src={playlist.tracks[0].album.image.url}
            alt={playlist.name}
            className="size-12 rounded"
          />
        ) : (
          <div className="size-12 rounded bg-zinc-700" />
        )}
      </div>
      <div className="flex flex-col gap-1 overflow-hidden">
        <span className="text-sm font-light text-zinc-100 group-hover:underline truncate">
          {playlist.name}
        </span>
        <span className="text-xs font-light text-zinc-400 truncate">
          {user ? user.username.split("@")[0] : "User"}
        </span>
      </div>
    </div>
  );
};

const AlbumItem = ({
  albums,
  navigate,
}: {
  albums: {
    _id: string;
    type: string;
    name: string;
    image: {
      url: string;
      width: number;
      height: number;
    };
    release_date: string;
  }[];
  navigate: (path: string) => void;
}) => {
  return (
    <div className="flex flex-col w-[284px]">
      {albums.map((album) => (
        <div
          key={album._id}
          className="group grid w-full grid-cols-[48px_1fr] items-center gap-2 p-2 rounded hover:bg-zinc-800 cursor-pointer group"
          onClick={() => navigate(`/album/${album._id}`)}
        >
          <div className="size-12">
            {album.image.url ? (
              <img
                src={album.image.url}
                alt={album.name}
                className="size-12 rounded"
              />
            ) : (
              <div className="size-12 rounded bg-zinc-700" />
            )}
          </div>
          <div className="flex flex-col gap-1 overflow-hidden pr-2">
            <span className="text-sm font-light text-zinc-100 group-hover:underline truncate">
              {album.name}
            </span>
            <span className="text-xs font-light text-zinc-400 truncate">
              {album.type}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

const ArtistItem = ({
  artists,
  navigate,
}: {
  artists: ArtistCredit[];
  navigate: (path: string) => void;
}) => {
  return (
    <div className="flex flex-col w-[284px]">
      {artists.map((artist) => (
        <div
          key={artist._id}
          className="group grid w-full grid-cols-[48px_1fr] items-center gap-2 p-2 rounded hover:bg-zinc-800 cursor-pointer group"
          onClick={() => navigate(`/artist/${artist._id}`)}
        >
          <div className="size-12">
            {artist.profile_image.url ? (
              <img
                src={artist.profile_image.url}
                alt={artist.name}
                className="size-12 rounded"
              />
            ) : (
              <div className="size-12 rounded bg-zinc-700" />
            )}
          </div>
          <div className="flex flex-col gap-1 overflow-hidden pr-2">
            <span className="text-sm font-light text-zinc-100 group-hover:underline truncate">
              {artist.name}
            </span>
            <span className="text-xs font-light text-zinc-400 truncate">
              Artist
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};
