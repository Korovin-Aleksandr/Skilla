import "./index.css";

export interface CallItemProps {
  typeCall: React.ReactNode;
  time: string;
  person: string;
  number: string;
  source: string;
  estimation: string;
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
      <span className="CallListItemType">{typeCall}</span>
      <span className="CallListItemTime">{time}</span>
      <img src={person} alt={person} className="avatar" />
      <span className="CallListItemNumber">{number}</span>
      <span className="CallListItemSource">{source}</span>
      <span className="CallListItemEstimation">{estimation}</span>
      <span className="CallListItemDuration">{duration}</span>
    </li>
  );
}
