import type { GetCallListParams } from "./model/types";
import { API_CONFIG, type ApiResponse } from "./model/types";
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


export const getCallList = async (
  params?: GetCallListParams
): Promise<ApiResponse> => {
  try {
    const queryParams = new URLSearchParams();

    if (params?.date_start) {
      queryParams.append("date_start", params.date_start);
    }

    if (params?.date_end) {
      queryParams.append("date_end", params.date_end);
    }

    if (params?.in_out !== undefined) {
      queryParams.append("in_out", params.in_out.toString());
    }

    const url = `${API_CONFIG.URL}${
      queryParams.toString() ? `?${queryParams.toString()}` : ""
    }`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${API_CONFIG.TOKEN}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(
        `HTTP error! status: ${response.status} ${response.statusText}`
      );
    }

    const data: ApiResponse = await response.json();

    return data;
  } catch (err) {
    console.error("Ошибка при запросе:", err);
    throw err;
  }
};

export default getCallList;
