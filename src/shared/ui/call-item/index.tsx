import { IncomingIcon, MissedIcon, NonCallIcon, OutgoingIcon } from "../../assets/svg/Icon";

export type IconType = 'incoming' | 'outgoing' | 'missed' | 'non-call';

interface IconProps extends React.SVGProps<SVGSVGElement> {
  type: IconType;
}

export const CallIcon: React.FC<IconProps> = ({
  type
}) => {
  switch (type) {
    case 'incoming':
      return <IncomingIcon/>;
    case 'outgoing':
      return <OutgoingIcon/>;
    case 'missed':
      return <MissedIcon />;
    case 'non-call':
      return <NonCallIcon />;
    default:
      return <IncomingIcon/>;
  }
};  