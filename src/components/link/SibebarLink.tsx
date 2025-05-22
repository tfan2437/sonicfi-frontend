import { Link } from "react-router-dom";

interface SibebarLinkProps {
  to: string;
  label?: string;
  icon: React.ReactNode;
}

const SibebarLink = ({ to, label = "", icon }: SibebarLinkProps) => {
  return (
    <Link to={to} className="h-20 w-full">
      <div className="flex items-center justify-start gap-2 rounded-md px-2 py-2 font-medium text-white hover:bg-zinc-800">
        <div className="flex size-6 items-center justify-center">{icon}</div>
        {label && <span className="hidden md:inline">{label}</span>}
      </div>
    </Link>
  );
};
export default SibebarLink;
