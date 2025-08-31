import { CallIcon } from "../../../shared/ui/call-item";
import { Estimation } from "../../../shared/ui/estimation/estimation";
import "./index.css";

export interface CallItemProps {
  typeCall: "incoming" | "outgoing" | "missed" | "non-call";
  time: string;
  person: string;
  number: string;
  estimation: "bad" | "good" | "great" | "none-sript" | null;
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
        <CallIcon type={typeCall} />
      </span>
      <span className="CallListItemTime">
        <span>{time}</span>
      </span>
      <span className="avatar">
        <img src={person} alt={person}  />
      </span>
      <span className="CallListItemNumber">
        <span >{number}</span>
      </span>
      <span className="CallListItemSource">
        <span >{source}</span>
      </span>
      <span>
        <Estimation type={estimation} />
      </span>
      <span className="CallListItemDuration">
        <span >{duration}</span>
      </span>
    </li>
  );
}
