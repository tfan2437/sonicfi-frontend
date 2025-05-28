import {
  Ellipsis,
  PencilIcon,
  PlayIcon,
  Disc2Icon,
  UserPenIcon,
  PlusIcon,
  SquareArrowOutUpRightIcon,
} from "lucide-react";

import {
  DropdownMenu as Dropdown,
  DropdownMenuContent as Content,
  DropdownMenuItem,
  DropdownMenuTrigger as Trigger,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from "@/components/ui/dropdown-menu";

import { twMerge } from "tailwind-merge";
import { CircleMinusIcon } from "lucide-react";

const LayerItem = () => {
  return (
    <div className="flex flex-row items-center justify-between rounded bg-neutral-100 p-2 py-3 hover:bg-neutral-200">
      <span>Layer</span>
      <UserMenu />
    </div>
  );
};

export default LayerItem;

const PlaylistMenu = () => {
  return (
    <Dropdown>
      <Trigger asChild>
        <div className="flex cursor-pointer items-center justify-center rounded-full p-1">
          <Ellipsis className="size-4" />
        </div>
      </Trigger>
      <Content align="start" className="w-[200px] p-0">
        <Item
          icon={<PlayIcon className="size-4" />}
          text="Play"
          onClick={() => {}}
        />
        <Item
          icon={<PencilIcon className="size-4" />}
          text="Rename"
          onClick={() => {}}
        />
        <Item
          icon={<SquareArrowOutUpRightIcon className="size-4" />}
          text="Share"
          onClick={() => {}}
        />
        <Item
          icon={<CircleMinusIcon className="size-4" strokeWidth={2.5} />}
          text="Delete"
          onClick={() => {}}
          className="text-red-600"
        />
      </Content>
    </Dropdown>
  );
};

const TrackMenu = () => {
  const artists = ["Artist 1", "Artist 2", "Artist 3"];
  const playlists = ["Playlist 1", "Playlist 2", "Playlist 3"];

  return (
    <Dropdown>
      <Trigger asChild>
        <div className="flex cursor-pointer items-center justify-center rounded-full p-1">
          <Ellipsis className="size-4" />
        </div>
      </Trigger>
      <Content align="start" side="top" className="w-[220px] p-0">
        <DropdownMenuSub>
          <DropdownMenuSubTrigger className="cursor-pointer py-3 pl-4 pr-3">
            <div className="flex items-center gap-4">
              <PlusIcon className="size-4" />
              <span className="text-sm">Add to playlist</span>
            </div>
          </DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent className="w-[200px] p-0">
              {playlists.map((playlist) => (
                <Item
                  key={playlist}
                  icon={null}
                  text={playlist}
                  onClick={() => {}}
                />
              ))}
              <hr />
              <Item icon={null} text="Create playlist" onClick={() => {}} />
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
                <Item
                  key={artist}
                  icon={null}
                  text={artist}
                  onClick={() => {}}
                />
              ))}
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>
        <Item
          icon={<Disc2Icon className="size-4" />}
          text="Go to album"
          onClick={() => {}}
        />
        <Item
          icon={<SquareArrowOutUpRightIcon className="size-4" />}
          text="Share"
          onClick={() => {}}
        />
      </Content>
    </Dropdown>
  );
};

const UserMenu = () => {
  return (
    <Dropdown>
      <Trigger asChild>
        <div className="flex cursor-pointer items-center justify-center rounded-full p-1">
          <Ellipsis className="size-4" />
        </div>
      </Trigger>
      <Content align="start" side="top" className="w-[220px] p-0">
        <Item icon={null} text="Account" onClick={() => {}} />
        <Item icon={null} text="Profile" onClick={() => {}} />
        <Item icon={null} text="Settings" onClick={() => {}} />
        <hr />
        <Item icon={null} text="Logout" onClick={() => {}} />
      </Content>
    </Dropdown>
  );
};

const Item = ({
  icon,
  text,
  className,
  onClick,
}: {
  icon: React.ReactNode;
  text: string;
  className?: string;
  onClick: () => void;
}) => {
  return (
    <DropdownMenuItem className="cursor-pointer py-3 pl-4 pr-6">
      <div
        className={twMerge("flex items-center gap-4", className)}
        onClick={onClick}
      >
        {icon}
        <span className="text-sm">{text}</span>
      </div>
    </DropdownMenuItem>
  );
};
