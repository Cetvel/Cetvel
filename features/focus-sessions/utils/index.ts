export const convertSecondsToTime = (totalSeconds: number) => {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  const hoursStr = hours > 0 ? `${hours} Saat ` : '';
  const minutesStr = minutes > 0 ? `${minutes} Dakika ` : '';
  const secondsStr = seconds > 0 ? `${seconds} Saniye` : '';

  return `${hoursStr}${minutesStr}${secondsStr}`.trim();
};
