import { twMerge } from "tailwind-merge";

const NextIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 -960 960 960"
      fill="currentColor"
      className={twMerge("size-6", className)}
    >
      <path d="M669.61-204.39v-551.22h106v551.22h-106Zm-485.22 0v-551.22L598.09-480l-413.7 275.61Z" />
    </svg>
  );
};
export default NextIcon;
