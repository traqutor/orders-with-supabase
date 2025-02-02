import React from 'react';
import { MailIcon, PenIcon, FileIcon, PhoneIcon, PackageIcon, IdCardIcon, AtSignIcon, BellRingIcon, BellIcon, BeerIcon, BanIcon, Package } from 'lucide-react';

interface DynamicIconProps {
  iconName: string; // Allow any string (dynamic usage)
  size?: number;
  color?: string;
}

export const Icons: Record<string, React.ElementType> = { MailIcon, PenIcon, FileIcon, PhoneIcon, PackageIcon, IdCardIcon, AtSignIcon, BellRingIcon, BellIcon, BeerIcon, BanIcon, Package };

const DynamicIcon: React.FC<DynamicIconProps> = ({ iconName, size = 12, color = 'currentColor' }) => {


  const IconComponent = Icons[iconName] as React.ElementType;

  if (!IconComponent) {
    return <BanIcon size={size} color={color} />;
  }

  return <IconComponent size={size} color={color} />;
};


export default DynamicIcon;