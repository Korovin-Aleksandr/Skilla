import { useState, useCallback, useEffect, useRef } from "react";
import { getCallList } from "@/shared/";
import { getDateRangeParams } from "@shared/api";
import type { CallData, GetCallListParams } from "@/shared/api/model/types";
import { getCallRecord } from "@shared/api";

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

export const useAudioPlayer = (
  audioUrl: string,
  onLoad?: () => void,
  onError?: (error: string) => void
) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  const handleLoadedMetadata = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    setDuration(audio.duration);
    setIsLoading(false);
    setError(null);
    onLoad?.();
  }, [onLoad]);

  const handleTimeUpdate = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    setCurrentTime(audio.currentTime);
  }, []);

  const handleEnded = useCallback(() => {
    setIsPlaying(false);
    setCurrentTime(0);
  }, []);

  const handleError = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const errorMsg = `Ошибка загрузки аудио: ${
      audio.error?.message || "Неизвестная ошибка"
    }`;
    setError(errorMsg);
    setIsLoading(false);
    onError?.(errorMsg);
  }, [onError]);

  const handleLoadStart = useCallback(() => {
    setIsLoading(true);
    setError(null);
  }, []);

  const togglePlayPause = useCallback(() => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch((err) => {
        setError(`Ошибка воспроизведения: ${err.message}`);
      });
    }
    setIsPlaying(!isPlaying);
  }, [isPlaying]);

  const handleProgressChange = useCallback((newTime: number) => {
    setCurrentTime(newTime);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
    }
  }, []);

  const handleDownload = useCallback(
    (fileName: string) => {
      const link = document.createElement("a");
      link.href = audioUrl;
      link.download = `${fileName}.mp3`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    },
    [audioUrl]
  );

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("ended", handleEnded);
    audio.addEventListener("error", handleError);
    audio.addEventListener("loadstart", handleLoadStart);

    return () => {
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("error", handleError);
      audio.removeEventListener("loadstart", handleLoadStart);
    };
  }, [
    handleLoadedMetadata,
    handleTimeUpdate,
    handleEnded,
    handleError,
    handleLoadStart,
  ]);

  useEffect(() => {
    setIsPlaying(false);
    setCurrentTime(0);
    setDuration(0);
    setIsLoading(true);
    setError(null);
  }, [audioUrl]);

  return {
    audioRef,
    isPlaying,
    currentTime,
    duration,
    isLoading,
    error,
    progress,
    togglePlayPause,
    handleProgressChange,
    handleDownload,
  };
};
