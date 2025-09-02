import { CallIcon, Estimation } from "@/shared";
import "./index.css";
import type { CallDirection, EstimationType } from "@shared/model/types";
import { useAudioRecord } from "@shared/hooks";

export interface CallItemProps {
  typeCall: CallDirection;
  time: string;
  person: string | null;
  number: string;
  estimation: EstimationType;
  source: string;
  duration: string;
  record?: string;
  partnership_id?: string;
}

export const CallItem = ({
  typeCall,
  time,
  person,
  number,
  source,
  estimation,
  duration,
  record,
  partnership_id,
}: CallItemProps) => {
  const { audioFile, loading, error, fetchAudio } = useAudioRecord(
    record,
    partnership_id
  );

  return (
    <li className="CallListItem">
      <span className="CallListItemIcon">
        <CallIcon typeCall={typeCall} />
      </span>
      <span className="CallListItemTime">
        <span>{time}</span>
      </span>
      <span className="avatar">
        <img src={person || undefined} alt="Аватар сотрудника" />
      </span>
      <span className="CallListItemNumber">
        <span>{number}</span>
      </span>
      <span className="CallListItemSource">
        <span>{source}</span>
      </span>
      <span>
        <Estimation type={estimation} />
      </span>
      <span className="CallListItemDuration">
        {loading ? (
          <span className="audio-loading">Загрузка...</span>
        ) : error ? (
          <div className="audio-error">
            <span>Ошибка</span>
            <button onClick={fetchAudio} className="retry-audio">
              ⟳
            </button>
          </div>
        ) : audioFile ? (
          <audio className="audio-player" controls src={audioFile.url}></audio>
        ) : (
          <span>{duration}</span>
        )}
      </span>
    </li>
  );
};