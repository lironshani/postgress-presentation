export const getLocaleDateTime = (date) =>
  `${getLocaleDate(date)} ${getLocaleHourMinutes(date)}`;

const getLocaleDate = (time) => {
  return new Date(time).toLocaleDateString("he-IL", {
    timeZone: "Asia/Jerusalem",
  });
};

const getLocaleHourMinutes = (time) => {
  var date = new Date(time);
  return date.toLocaleTimeString("he-IL", {
    hour: "2-digit",
    minute: "2-digit",
  });
};
