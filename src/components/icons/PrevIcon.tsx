import { twMerge } from "tailwind-merge";

const PrevIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 -960 960 960"
      fill="currentColor"
      className={twMerge("size-6", className)}
    >
      <path d="M184.39-204.39v-551.22h106v551.22h-106Zm591.22 0L361.91-480l413.7-275.61v551.22Z" />
    </svg>
  );
};
export default PrevIcon;
