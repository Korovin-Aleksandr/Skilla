import { IncomingIcon, MissedIcon, NonCallIcon, OutgoingIcon } from "../../assets/svg/Icon";

export type CallDirection = 1 | 0 | 2 | 3 | null;

interface IconProps {
  typeCall: CallDirection;
}
 
export const CallIcon: React.FC<IconProps> = ({
  typeCall
}) => {
  switch (typeCall) {
    case 1:
      return <IncomingIcon/>;
    case 0:
      return <OutgoingIcon/>;
    case 2:
      return <MissedIcon />;
    case 3:
      return <NonCallIcon />;
    default:
      return <IncomingIcon/>;
  }
};  