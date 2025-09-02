import { CallIcon, Estimation } from "@/shared";
import "./index.css";
import type { CallDirection, EstimationType } from "@shared/model/types";
import { useEffect, useState } from "react";
import { getCallRecord } from "@shared/api";

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

interface AudioRecord {
  blob: Blob;
  url: string;
  response: Response;
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
  const [audioFile, setAudioFile] = useState<AudioRecord | null>(null);

  useEffect(() => {
    if (record && partnership_id) {
      getCallRecord(record, partnership_id).then((item) => {
        setAudioFile(item);
      });
    }
  }, [record, partnership_id]);

  return (
    <li className="CallListItem">
      <span className="CallListItemIcon">
        <CallIcon typeCall={typeCall} />
      </span>
      <span className="CallListItemTime">
        <span>{time}</span>
      </span>
      <span className="avatar">
        <img src={person || undefined} />
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
        {audioFile ? (
          <audio controls src={audioFile.url}></audio>
        ) : (
          <span>{duration}</span>
        )}
      </span>
    </li>
  );
};
