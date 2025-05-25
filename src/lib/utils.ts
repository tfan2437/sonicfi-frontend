import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDuration(duration: number) {
  // give me a ms to mm:ss format
  const minutes = Math.floor(duration / 60000);
  const seconds = Math.floor((duration % 60000) / 1000);
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

export const formatDate = (date: string) => {
  const [year, month, day] = date.split("-");

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // Convert month to zero-based index and get month name
  const monthName = months[parseInt(month) - 1];

  // Remove leading zero from day if present
  const dayWithoutLeadingZero = parseInt(day).toString();

  return `${monthName} ${dayWithoutLeadingZero}, ${year}`;
};

export const formatNumber = (number: number) => {
  return number.toLocaleString("en-US");
};
