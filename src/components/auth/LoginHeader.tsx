import { Link } from "react-router-dom";

const LoginHeader = () => {
  return (
    <div className="flex flex-row items-center justify-between px-5 py-5">
      <Link to={"/"}>
        <img src="/logo/200x200-i.png" alt="" className="size-7 block" />
      </Link>
      <div className="flex flex-row px-4 py-2 rounded-full hover:bg-neutral-100 border-1 border-neutral-200 text-black text-sm gap-1 cursor-default select-none">
        <span>You are signing into </span>
        <span className="font-medium font-outfit">OrbitAI</span>
      </div>
    </div>
  );
};
export default LoginHeader;
