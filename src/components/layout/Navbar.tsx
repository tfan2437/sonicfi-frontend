import ProfileImage from "@/components/ProfileImage";
import SearchBar from "@/components/SeachBar";

const Navbar = () => {
  return (
    <nav className="px-2 pt-3 pb-1 w-full">
      <div className="w-full grid grid-cols-3 items-center h-fit">
        <div className="flex items-center gap-2 h-full">
          <img
            src={"/sonicfi-logo.png"}
            alt="sonicfi-logo"
            className="px-2 h-9"
          />
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
