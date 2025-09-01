import { CallIcon } from "../../../shared/ui/call-item";
import { Estimation } from "../../../shared/ui/estimation";
import "./index.css";

export interface CallItemProps {
  typeCall: 1 | 0 | 2 | 3 | null;
  time: string;
  person: string |null;
  number: string;
  estimation: "Не дозвонился" | "Успешный" | "Исчерпывающий" | "Скрипт не использован" | []
  source: string;
  duration: string;
}

export function CallItem({
  typeCall,
  time,
  person,
  number,
  source,
  estimation,
  duration,
}: CallItemProps) {
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
        <span>{duration}</span>
      </span>
    </li>
  );
}