import { Link } from "react-router-dom";

interface SibebarLinkProps {
  to: string;
  label?: string;
  icon: React.ReactNode;
}

const SibebarLink = ({ to, label = "", icon }: SibebarLinkProps) => {
  return (
    <Link to={to} className="w-full h-20">
      <div className="flex items-center gap-2 text-white font-medium rounded-md hover:bg-zinc-800 justify-start py-2 px-2">
        <div className="size-6 flex items-center justify-center">{icon}</div>
        {label && <span className="hidden md:inline">{label}</span>}
      </div>
    </Link>
  );
};
export default SibebarLink;
