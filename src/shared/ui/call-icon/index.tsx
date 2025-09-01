import { IncomingIcon, MissedIcon, NonCallIcon, OutgoingIcon } from "@shared/assets/svg/Icon";
import type { CallDirection } from "@shared/model/types";

interface IconProps {
  typeCall: CallDirection;
}
 
const CallIcon: React.FC<IconProps> = ({
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

export default CallIcon