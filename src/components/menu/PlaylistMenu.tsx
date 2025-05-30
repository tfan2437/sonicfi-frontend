import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import {
  ListMusicIcon,
  PencilIcon,
  EllipsisIcon,
  CircleMinusIcon,
  SquareArrowOutUpRightIcon,
} from "lucide-react";
import MenuItem from "@/components/menu/MenuItem";
import { useNavigate } from "react-router-dom";
import { Dispatch } from "react";
import { SetStateAction } from "react";
import { copyCurrentUrl } from "@/lib/utils";
import { usePlayerStore } from "@/stores/usePlayerStore";

interface PlaylistMenuProps {
  playlistId: string;
  isMenuOpen: boolean;
  setIsMenuOpen: Dispatch<SetStateAction<boolean>>;
  setIsEditing: Dispatch<SetStateAction<boolean>>;
}

const PlaylistMenu = ({
  playlistId,
  isMenuOpen,
  setIsMenuOpen,
  setIsEditing,
}: PlaylistMenuProps) => {
  const navigate = useNavigate();

  const { deletePlaylist } = usePlayerStore();

  return (
    <DropdownMenu open={isMenuOpen} onOpenChange={setIsMenuOpen}>
      <DropdownMenuTrigger asChild>
        <div className="flex cursor-pointer items-center justify-center rounded-full p-1">
          <EllipsisIcon className="size-4" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-[200px] p-0">
        <MenuItem
          icon={<ListMusicIcon className="size-4" />}
          text="Go to playlist"
          onClick={() => {
            navigate(`/playlist/${playlistId}`);
          }}
        />
        <MenuItem
          icon={<PencilIcon className="size-4" />}
          text="Rename"
          onClick={() => {
            setIsEditing(true);
          }}
        />
        <DropdownMenuItem className="cursor-pointer py-3 pl-4 pr-6">
          <div className="flex items-center gap-4" onClick={copyCurrentUrl}>
            <SquareArrowOutUpRightIcon className="size-4" />
            <span className="text-sm">Share</span>
          </div>
        </DropdownMenuItem>
        <MenuItem
          icon={
            <CircleMinusIcon
              className="size-4 text-red-500"
              strokeWidth={2.5}
            />
          }
          text="Delete"
          onClick={() => {
            deletePlaylist(playlistId);
          }}
          className="text-red-500"
        />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default PlaylistMenu;
