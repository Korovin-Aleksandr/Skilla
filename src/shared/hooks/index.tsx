import { useState, useCallback } from "react";
import { getCallList } from "@/shared/";
import { getDateRangeParams } from "@shared/api";
import type { CallData, GetCallListParams } from "@/shared/api/model/types";

export const useCall = () => {
  const [calls, setCalls] = useState<CallData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCalls = useCallback(async (typeCall?: string, period?: string) => {
    try {
      setLoading(true);
      setError(null);

      const params: GetCallListParams = {};

      if (typeCall && typeCall !== "all-types") {
        params.in_out = Number(typeCall);
      }

      if (period && period !== "all-periods") {
        const dateParams = getDateRangeParams(period);
        params.date_start = dateParams.date_start;
        params.date_end = dateParams.date_end;
      }

      const response = await getCallList(params);
      setCalls(response.results);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Неизвестная ошибка");
      console.error("Ошибка при загрузке звонков:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    calls,
    loading,
    error,
    fetchCalls,
    setCalls,
    setLoading,
    setError,
  };
};
