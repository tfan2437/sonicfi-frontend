import { useNavigate } from "react-router-dom";

import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import ProfileImage from "@/components/nav/ProfileImage";
import SearchBar from "@/components/nav/SeachBar";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="px-2 pt-3 pb-1 w-full">
      <div className="w-full grid grid-cols-3 items-center h-fit">
        <div className="flex items-center gap-6 h-full">
          <div className="h-9 w-fit">
            <img
              src={"/sonicfi-logo.png"}
              alt="sonicfi-logo"
              className="px-2 h-9"
            />
          </div>
          <div className="h-9 w-fit flex items-center gap-2">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center justify-center size-8 bg-zinc-900 rounded-full text-zinc-500 hover:text-zinc-100 hover:bg-zinc-800"
            >
              <ChevronLeftIcon className="size-6" />
            </button>
            <button
              onClick={() => navigate(1)}
              className="flex items-center justify-center size-8 bg-zinc-900 rounded-full text-zinc-500 hover:text-zinc-100 hover:bg-zinc-800"
            >
              <ChevronRightIcon className="size-6" />
            </button>
          </div>
        </div>
        <SearchBar />
        <div className="flex items-center justify-end">
          <ProfileImage />
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
