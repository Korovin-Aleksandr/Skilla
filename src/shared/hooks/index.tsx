import { useState, useCallback, useEffect } from "react";
import { getCallList } from "@/shared/";
import { getDateRangeParams } from "@shared/api";
import type { CallData, GetCallListParams } from "@/shared/api/model/types";
import { getCallRecord } from "@shared/api";

export const useCalls = (selectType?: string, selectData?: string) => {
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

  useEffect(() => {
    fetchCalls(selectType, selectData);
  }, [selectType, selectData, fetchCalls]);

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

interface AudioRecord {
  blob: Blob;
  url: string;
  response: Response;
}

interface UseAudioRecordResult {
  audioFile: AudioRecord | null;
  loading: boolean;
  error: string | null;
  fetchAudio: () => Promise<void>;
}

export const useAudioRecord = (
  recordId?: string,
  partnershipId?: string
): UseAudioRecordResult => {
  const [audioFile, setAudioFile] = useState<AudioRecord | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAudio = useCallback(async () => {
    if (!recordId || !partnershipId) {
      setError("Не указаны recordId или partnershipId");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const audioData = await getCallRecord(recordId, partnershipId);
      setAudioFile(audioData);
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : "Неизвестная ошибка при загрузке аудиозаписи";

      setError(errorMessage);
      console.error("Ошибка при загрузке аудиозаписи:", err);
    } finally {
      setLoading(false);
    }
  }, [recordId, partnershipId]);

  useEffect(() => {
    if (recordId && partnershipId) {
      fetchAudio();
    }
  }, [recordId, partnershipId, fetchAudio]);

  return {
    audioFile,
    loading,
    error,
    fetchAudio,
  };
};
