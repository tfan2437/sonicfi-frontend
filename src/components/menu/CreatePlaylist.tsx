import { PlusIcon } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";

const CreatePlaylist = ({
  handleCreatePlaylist,
}: {
  handleCreatePlaylist: (name: string) => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [playlistName, setPlaylistName] = useState("");

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <div className="cursor-pointer flex items-center p-1 rounded-full bg-transparent hover:bg-zinc-700 transition-all duration-300 text-white">
          <PlusIcon className="size-5" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="start"
        side="bottom"
        className="w-[260px] p-0"
      >
        <div className="p-3 flex items-center gap-2">
          <input
            type="text"
            placeholder="Enter playlist name"
            value={playlistName}
            onChange={(e) => setPlaylistName(e.target.value)}
            className="w-full py-1 px-3 bg-neutral-700 text-white text-sm rounded placeholder:text-neutral-400 placeholder:font-light"
          />
          <button
            onClick={() => {
              if (playlistName.trim() === "") return;
              setIsOpen(false);
              handleCreatePlaylist(playlistName);
              setPlaylistName("");
            }}
            className="bg-black hover:bg-neutral-800 border font-medium border-neutral-500 text-sm text-white px-3 rounded py-1"
          >
            Create
          </button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CreatePlaylist;
