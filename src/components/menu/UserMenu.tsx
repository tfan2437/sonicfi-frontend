import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import MenuItem from "./MenuItem";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useUserStore } from "@/stores/useAuthStore";
import { signOut } from "@/services/firebase";
import { useNavigate } from "react-router-dom";

const UserMenu = () => {
  const { user, setUser } = useUserStore();
  const navigate = useNavigate();

  const handleLogout = async () => {
    console.log("signing out");
    try {
      await signOut();
      setUser(null); // Clear user state
      navigate("/login"); // Navigate to login page
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="size-9 bg-blue-500 cursor-pointer">
          <AvatarImage src={user?.image_url} alt={user?.username || "User"} />
          <AvatarFallback className="bg-blue-500">S</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        side="top"
        sideOffset={10}
        className="w-[220px] p-0"
      >
        <MenuItem text="Account" onClick={() => {}} />
        <MenuItem text="Profile" onClick={() => {}} />
        <MenuItem text="Settings" onClick={() => {}} />
        <hr />
        <MenuItem text="Logout" onClick={handleLogout} />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserMenu;
