import React from 'react';
import * as Icons from 'lucide-react';

type IconName = keyof typeof Icons;

interface DynamicIconProps {
  iconName: IconName;
  size?: number;
  color?: string;
}

const DynamicIcon: React.FC<DynamicIconProps> = ({
  iconName,
  size = 12,
  color = 'currentColor'
}) => {
  const IconComponent = Icons[iconName];

  if (!IconComponent) {
    return <p>Icon "{iconName}" not found</p>;
  }

  return <IconComponent size={size} color={color} />;
};

export default DynamicIcon;
