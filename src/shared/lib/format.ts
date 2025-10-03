import { format } from "date-fns";

 export const formatTime = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleTimeString("ru-RU", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

 export const formatDuration = (seconds: number): string => {
    if (seconds === 0) return "0:00";

    const date = new Date(seconds * 1000);
    return format(date, "m:ss");
  };

export  const formatDateForAPI = (date: Date): string => {
    return format(date, "yyyy-MM-dd");
  };

export const formatTimeAudio = (time: number): string => {
  if (isNaN(time)) return '00:00';

  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
};