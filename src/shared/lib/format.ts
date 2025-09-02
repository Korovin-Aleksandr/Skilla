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