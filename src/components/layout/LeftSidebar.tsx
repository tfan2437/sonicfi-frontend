import { ListIcon, PlusIcon } from "lucide-react";
import PauseIcon from "@/components/icons/PauseIcon";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { PlaylistDisplayMode } from "@/types/index";
// store
import { usePlayerStore } from "@/stores/usePlayerStore";
import { useUserStore } from "@/stores/useAuthStore";
import { twMerge } from "tailwind-merge";
// types
import { ArtistCredit, Playlist, User } from "@/types/index";
import { createPlaylist } from "@/api/playlist";
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import PlayIcon from "@/components/icons/PlayIcon";
import PlaylistMenu from "@/components/menu/PlaylistMenu";

const LeftSidebar = () => {
  const navigate = useNavigate();
  const { user } = useUserStore();

  const { playlists, fetchPlaylists } = usePlayerStore();

  const [isLoading, setIsLoading] = useState(false);
  const [displayMode, setDisplayMode] =
    useState<PlaylistDisplayMode>("playlists");

  useEffect(() => {
    if (user && user.uid) {
      fetchPlaylists(user.uid);
    }
  }, [user, fetchPlaylists]);

  const handleCreatePlaylist = async () => {
    if (!user || !user.uid || isLoading) return;
    setIsLoading(true);
    await createPlaylist(user.uid, `My Playlist #${playlists.length + 1}`, []);
    await fetchPlaylists(user.uid);
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
          <div
            onClick={() => handleCreatePlaylist()}
            className="cursor-pointer flex items-center p-1 rounded-full bg-transparent hover:bg-zinc-700 transition-all duration-300 text-white"
          >
            {isLoading ? (
              <div className="loader" />
            ) : (
              <PlusIcon className="size-5" />
            )}
          </div>
        </div>
        <div className="flex items-center justify-between my-2 px-4">
          <div className="flex items-center gap-2">
            <ModeToggleButton
              mode="playlists"
              displayMode={displayMode}
              setDisplayMode={setDisplayMode}
            />
            <ModeToggleButton
              mode="albums"
              displayMode={displayMode}
              setDisplayMode={setDisplayMode}
            />
            <ModeToggleButton
              mode="artists"
              displayMode={displayMode}
              setDisplayMode={setDisplayMode}
            />
          </div>
          <button className="flex items-center p-1 rounded-full transition-all duration-300 text-zinc-400">
            <ListIcon className="size-5" />
          </button>
        </div>
        <ScrollArea className="h-[calc(100vh-260px)] px-2">
          {!user && <NoAuthItem navigate={navigate} />}
          {displayMode === "playlists" && (
            <Playlists playlists={playlists} user={user} navigate={navigate} />
          )}
          {displayMode === "albums" && (
            <AlbumItem albums={displayAlbums} navigate={navigate} />
          )}
          {displayMode === "artists" && (
            <ArtistItem artists={displayArtists} navigate={navigate} />
          )}
        </ScrollArea>
      </div>
    </div>
  );
};
export default LeftSidebar;

const ModeToggleButton = ({
  mode,
  displayMode,
  setDisplayMode,
}: {
  mode: PlaylistDisplayMode;
  displayMode: PlaylistDisplayMode;
  setDisplayMode: (displayMode: PlaylistDisplayMode) => void;
}) => {
  return (
    <button
      onClick={() => setDisplayMode(mode)}
      className={twMerge(
        "px-3 py-1 rounded-full transition-all duration-300 font-light text-xs ",
        displayMode === mode
          ? "bg-white text-black"
          : "bg-zinc-700 hover:bg-zinc-600 text-zinc-200"
      )}
    >
      {mode.charAt(0).toUpperCase() + mode.slice(1)}
    </button>
  );
};

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
    setPlaylist,
    renamePlaylist,
  } = usePlayerStore();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [playlistName, setPlaylistName] = useState(playlist.name);

  const inputRef = useRef<HTMLInputElement>(null);

  const handleBlur = () => {
    setIsEditing(false);
    renamePlaylist(playlist._id, playlistName);
  };

  useEffect(() => {
    if (isEditing && inputRef.current) {
      // Use a small timeout to ensure the DOM has updated
      const timeoutId = setTimeout(() => {
        inputRef.current?.focus();
        inputRef.current?.select();
      }, 200);

      return () => clearTimeout(timeoutId);
    }
  }, [isEditing]);

  return (
    <div
      key={playlist._id}
      className="group grid w-full grid-cols-[48px_1fr_24px] items-center hover:bg-zinc-800 gap-2 p-2 rounded cursor-pointer group"
      onClick={() => {
        setPlaylist(playlist);
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
        {isEditing ? (
          <input
            ref={inputRef}
            type="text"
            value={playlistName}
            onChange={(e) => setPlaylistName(e.target.value)}
            onBlur={handleBlur}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === "Escape") {
                handleBlur();
              }
            }}
            onClick={(e) => e.stopPropagation()}
            className="w-full bg-neutral-600 px-0.5 text-sm text-white outline-none"
          />
        ) : (
          <span className="text-sm font-light text-zinc-100 group-hover:underline truncate">
            {playlistName}
          </span>
        )}
        <span className="text-xs font-light text-zinc-400 truncate">
          {user ? user.username.split("@")[0] : "User"}
        </span>
      </div>
      <div
        onClick={(e) => e.stopPropagation()}
        className={twMerge(
          "group-hover:opacity-100 opacity-0 items-center justify-center",
          isMenuOpen && "opacity-100"
        )}
      >
        <PlaylistMenu
          isMenuOpen={isMenuOpen}
          setIsMenuOpen={setIsMenuOpen}
          playlistId={playlist._id}
          setIsEditing={setIsEditing}
        />
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

const NoAuthItem = ({ navigate }: { navigate: (path: string) => void }) => {
  const handleGetStarted = () => {
    navigate(`/login`);
  };

  return (
    <div className="flex flex-col w-full px-2 gap-3">
      <div className="w-full flex flex-col gap-2 p-2 rounded-lg bg-zinc-700">
        <div className="flex flex-col gap-1 pr-2 text-sm px-1 py-1">
          <span className="text-white font-semibold">
            Create your first playlist
          </span>
          <span className="text-zinc-300 font-light">
            It's easy. We'll help.
          </span>
          <button
            onClick={handleGetStarted}
            className="w-full py-1.5 text-black bg-white rounded-full mt-2 hover:scale-103 hover:bg-white/80 transition-all duration-200"
          >
            <span className="font-semibold text-sm ">Create playlist</span>
          </button>
        </div>
      </div>
      <div className="w-full flex flex-col gap-2 p-2 rounded-lg bg-zinc-700">
        <div className="flex flex-col gap-1 pr-2 text-sm px-1 py-1">
          <span className="text-white font-semibold">
            Unlock the full power of Sonicfi
          </span>
          <span className="text-zinc-300 font-light">
            The music platform redefining how you create and connect
          </span>
          <button
            onClick={handleGetStarted}
            className="w-full py-1.5 text-black bg-white rounded-full mt-2 hover:scale-103 hover:bg-white/80 transition-all duration-200"
          >
            <span className="font-semibold text-sm">Get started</span>
          </button>
        </div>
      </div>
    </div>
  );
};
