import { Ellipsis } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import MenuItem from "./MenuItem";

const UserMenu = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex cursor-pointer items-center justify-center rounded-full p-1">
          <Ellipsis className="size-4" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" side="top" className="w-[220px] p-0">
        <MenuItem text="Account" onClick={() => {}} />
        <MenuItem text="Profile" onClick={() => {}} />
        <MenuItem text="Settings" onClick={() => {}} />
        <hr />
        <MenuItem text="Logout" onClick={() => {}} />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserMenu;
