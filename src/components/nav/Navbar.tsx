import { Link, useNavigate } from "react-router-dom";

import { BellIcon, ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import UserMenu from "@/components/menu/UserMenu";
import SearchBar from "@/components/nav/SeachBar";
import { useUserStore } from "@/stores/useAuthStore";
import UsersIcon from "@/components/icons/UsersIcon";

const Navbar = () => {
  const navigate = useNavigate();
  const { user } = useUserStore();

  return (
    <nav className="pl-2 pr-3 pt-3 pb-1 w-full">
      <div className="w-full grid grid-cols-3 items-center h-fit">
        <div className="flex items-center gap-6 h-full">
          <Link to="/">
            <div className="h-auto w-36">
              <img
                src={"/sonicfi-logo.png"}
                alt="sonicfi-logo"
                className="px-2 w-full"
              />
            </div>
          </Link>
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
          {user ? (
            <div className="flex items-center gap-4 text-zinc-400">
              <BellIcon className="size-4" />
              <UsersIcon className="size-5" />
              <UserMenu />
            </div>
          ) : (
            <div className="flex items-center">
              <button
                onClick={() => navigate("/login")}
                className="px-6 py-2 hover:underline text-neutral-400"
              >
                <span className="font-semibold text-sm">Sign up</span>
              </button>
              <button
                onClick={() => navigate("/login")}
                className="px-6 py-2 bg-white rounded-full hover:scale-110 hover:bg-white/90 transition-all duration-200"
              >
                <span className="text-black font-semibold text-sm">Log in</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
