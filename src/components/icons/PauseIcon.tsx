import { twMerge } from "tailwind-merge";

const PauseIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 -960 960 960"
      fill="currentColor"
      className={twMerge("size-6", className)}
    >
      <path d="M560-200v-560h160v560H560Zm-320 0v-560h160v560H240Z" />
    </svg>
  );
};
export default PauseIcon;
