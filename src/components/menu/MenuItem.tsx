import { twMerge } from "tailwind-merge";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";

const MenuItem = ({
  icon = null,
  text,
  className,
  onClick,
}: {
  icon?: React.ReactNode;
  text: string;
  className?: string;
  onClick: () => void | Promise<void>;
}) => {
  return (
    <DropdownMenuItem className="cursor-pointer py-3 pl-4 pr-6">
      <div
        className={twMerge("flex items-center gap-4", className)}
        onClick={onClick}
      >
        {icon}
        <span className="text-sm">{text}</span>
      </div>
    </DropdownMenuItem>
  );
};

export default MenuItem;
