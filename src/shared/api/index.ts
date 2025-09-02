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
    const Period: Record<string, Date> = {
      "three-days": subDays(today, 3),
      month: subMonths(today, 1),
      year: subYears(today, 1),
    };

    startDate = Period[period] || subDays(today, 3);
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
    const queryString = [
      params?.date_start ? `date_start=${params.date_start}` : "",
      params?.date_end ? `date_end=${params.date_end}` : "",
      params?.in_out !== undefined ? `in_out=${params.in_out}` : "",
    ]
      .filter((param) => param !== "")
      .join("&");

    const url = `${API_CONFIG.URL}/getList${
      queryString ? `?${queryString}` : ""
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

export const getCallRecord = async (
  recordId: string,
  partnershipId: string
) => {
  try {
    const url = `${API_CONFIG.URL}/getRecord?record=${recordId}&partnership_id=${partnershipId}`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${API_CONFIG.TOKEN}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Ошибка HTTP: ${response.status}`);
    }

    const audioBlob = await response.blob();

    const audioUrl = URL.createObjectURL(audioBlob);

    return {
      blob: audioBlob,
      url: audioUrl,
      response: response,
    };
  } catch (error) {
    console.error("Ошибка при получении записи звонка:", error);
    throw error;
  }
};

export default getCallList;
