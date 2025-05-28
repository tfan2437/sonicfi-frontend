import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  PlayIcon,
  PencilIcon,
  EllipsisIcon,
  CircleMinusIcon,
  SquareArrowOutUpRightIcon,
} from "lucide-react";
import MenuItem from "@/components/menu/MenuItem";

const PlaylistMenu = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex cursor-pointer items-center justify-center rounded-full p-1">
          <EllipsisIcon className="size-4" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-[200px] p-0">
        <MenuItem
          icon={<PlayIcon className="size-4" />}
          text="Play"
          onClick={() => {}}
        />
        <MenuItem
          icon={<PencilIcon className="size-4" />}
          text="Rename"
          onClick={() => {}}
        />
        <MenuItem
          icon={<SquareArrowOutUpRightIcon className="size-4" />}
          text="Share"
          onClick={() => {}}
        />
        <MenuItem
          icon={<CircleMinusIcon className="size-4" strokeWidth={2.5} />}
          text="Delete"
          onClick={() => {}}
          className="text-red-600"
        />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default PlaylistMenu;
