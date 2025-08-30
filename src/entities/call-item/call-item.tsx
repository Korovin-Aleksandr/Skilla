import { CallIcon } from "../../shared/ui/call-item/call-item";
import { Estimation } from "../../shared/ui/estimation/estimation";
import "./index.css";

export interface CallItemProps {
  typeCall: 'incoming' | 'outgoing' | 'missed' | 'non-call';
  time: string;
  person: string;
  number: string;
  estimation: 'bad' | 'good' | 'great' | 'none-sript';
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
      <CallIcon type={typeCall} />
      <span className="CallListItemTime">{time}</span>
      <img src={person} alt={person} className="avatar" />
      <span className="CallListItemNumber">{number}</span>
      <span className="CallListItemSource">{source}</span>
      <Estimation type={estimation} />
      <span className="CallListItemDuration">{duration}</span>
    </li>
  );
}
