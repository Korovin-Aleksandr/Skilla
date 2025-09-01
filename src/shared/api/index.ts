import type { GetCallListParams } from "./model/hallp";
import { API_CONFIG, type ApiResponse } from "./model/types";

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