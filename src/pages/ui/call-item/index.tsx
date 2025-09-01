
import { CallIcon, Estimation } from "@/shared/ui";
import "./index.css";
import type { CallDirection, EstimationType } from "@shared/model/types";

export interface CallItemProps {
  typeCall: CallDirection;
  time: string;
  person: string |null;
  number: string;
  estimation: EstimationType;
  source: string;
  duration: string;
}

const CallItem = ({
  typeCall,
  time,
  person,
  number,
  source,
  estimation,
  duration,
}: CallItemProps) => {
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

export default CallItem;