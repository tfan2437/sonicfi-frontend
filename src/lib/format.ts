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
