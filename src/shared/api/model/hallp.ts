export interface GetCallListParams {
  date_start?: string;
  date_end?: string;
  in_out?: number;
}

import {
  format,
  startOfDay,
  endOfDay,
  subDays,
  subMonths,
  subYears,
  parseISO,
  isValid,
} from "date-fns";



export function getDateRangeParams(period: string): {
  date_start: string;
  date_end: string;
} {
  const now = new Date();
  const today = startOfDay(now);

  let startDate: Date;
  let endDate: Date = endOfDay(now);

  if (period.includes(":")) {
    const [startStr, endStr] = period.split(":");

    const parsedStart = parseISO(startStr);
    const parsedEnd = parseISO(endStr);

    if (isValid(parsedStart) && isValid(parsedEnd)) {
      startDate = startOfDay(parsedStart);
      endDate = endOfDay(parsedEnd);
    } else {
      startDate = subDays(today, 3);
    }
  } else {
    switch (period) {
      case "three-days":
        startDate = subDays(today, 3);
        break;
      case "month":
        startDate = subMonths(today, 1);
        break;
      case "year":
        startDate = subYears(today, 1);
        break;
      default:
        startDate = subDays(today, 3);
    }
  }

  const formatDateForAPI = (date: Date): string => {
    return format(date, "yyyy-MM-dd");
  };

  return {
    date_start: formatDateForAPI(startDate),
    date_end: formatDateForAPI(endDate),
  };
}
