import {
  PlusIcon,
  Disc2Icon,
  UserPenIcon,
  EllipsisIcon,
  SquareArrowOutUpRightIcon,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from "@/components/ui/dropdown-menu";
import MenuItem from "@/components/menu/MenuItem";
import { copyCurrentUrl } from "@/lib/utils";
import { ArtistCredit } from "@/types";
import { useNavigate } from "react-router-dom";

const TrackMenu = ({
  artists,
  albumId,
}: {
  artists: ArtistCredit[];
  albumId: string;
}) => {
  const navigate = useNavigate();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex cursor-pointer items-center justify-center rounded-full p-1">
          <EllipsisIcon className="size-4" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" side="top" className="w-[220px] p-0">
        <DropdownMenuSub>
          <DropdownMenuSubTrigger className="cursor-pointer py-3 pl-4 pr-3">
            <div className="flex items-center gap-4">
              <PlusIcon className="size-4" />
              <span className="text-sm">Add to playlist</span>
            </div>
          </DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent className="w-[200px] p-0">
              {artists.map((artist) => (
                <MenuItem
                  key={artist._id}
                  text={artist.name}
                  icon={
                    <div className="flex items-center justify-center size-4">
                      <img
                        src={artist.profile_image.url}
                        alt={artist.name}
                        className="size-4 rounded-full"
                      />
                    </div>
                  }
                  onClick={() => {
                    navigate(`/artist/${artist._id}`);
                  }}
                />
              ))}
              <hr />
              <MenuItem text="Create playlist" onClick={() => {}} />
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger className="cursor-pointer py-3 pl-4 pr-3">
            <div className="flex items-center gap-4">
              <UserPenIcon className="size-4" />
              <span className="text-sm">Go to artist</span>
            </div>
          </DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent className="w-[200px] p-0">
              {artists.map((artist) => (
                <MenuItem
                  key={artist._id}
                  text={artist.name}
                  icon={
                    <div className="flex items-center justify-center size-4">
                      <img
                        src={artist.profile_image.url}
                        alt={artist.name}
                        className="size-4 rounded-full"
                      />
                    </div>
                  }
                  onClick={() => {
                    navigate(`/artist/${artist._id}`);
                  }}
                />
              ))}
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>
        <MenuItem
          icon={<Disc2Icon className="size-4" />}
          text="Go to album"
          onClick={() => {}}
        />
        <MenuItem
          icon={<SquareArrowOutUpRightIcon className="size-4" />}
          text="Share"
          onClick={copyCurrentUrl}
        />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default TrackMenu;
