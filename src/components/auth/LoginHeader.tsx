import { Link } from "react-router-dom";

const LoginHeader = () => {
  return (
    <div className="flex flex-row items-center justify-between px-5 py-5 bg-black">
      <Link to={"/"}>
        <img src="/sonicfi-logo.png" alt="" className="h-8 block" />
      </Link>
      <div className="flex flex-row px-5 py-2 rounded-full border-1 border-neutral-600 text-neutral-200 text-sm gap-1 cursor-default select-none">
        <span>You are signing into </span>
        <span className="font-medium font-outfit">OrbitAI</span>
      </div>
    </div>
  );
};
export default LoginHeader;
