import React from "react";
import "./index.css";
import { DownloadIcon, StartIcon, PauseIcon } from "@shared/assets/svg/Icon";
import { useAudioPlayer } from "@shared/hooks";
import { formatTimeAudio } from "@shared/lib/format";


interface AudioPlayerProps {
  audioUrl: string;
  fileName?: string;
  onLoad?: () => void;
  onError?: (error: string) => void;
  compact?: boolean;
}

export const AudioPlayer = ({
  audioUrl,
  fileName = "audio",
  onLoad,
  onError,
}: AudioPlayerProps) => {
  const {
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
  } = useAudioPlayer(audioUrl, onLoad, onError);

  const onProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    handleProgressChange(newTime);
  };

  const onDownload = () => {
    handleDownload(fileName);
  };

  return (
    <div className="audio-player">
      <audio ref={audioRef} src={audioUrl} preload="metadata" />
      <span className="time-duration">{formatTimeAudio(duration)}</span>
      <button
        className={`play-pause-btn ${isPlaying ? "playing" : ""}`}
        onClick={togglePlayPause}
        disabled={isLoading || !!error}
        title={isPlaying ? "Пауза" : "Воспроизвести"}
      >
        {isPlaying ? <PauseIcon /> : <StartIcon />}
      </button>

      <div className="progress-container">
        <div className="progress-bar-container">
          <input
            type="range"
            className="progress-bar"
            min="0"
            max={duration || 0}
            value={currentTime}
            onChange={onProgressChange}
            disabled={isLoading || !!error}
          />
          <div
            className="progress-bar-fill"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <button
        className="download-btn"
        onClick={onDownload}
        disabled={!!error}
        title="Скачать аудио"
      >
        <DownloadIcon />
      </button>
    </div>
  );
};
