// FontawesomeIcon.tsx
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-common-types';

interface FontawesomeIconProps {
  icon: IconDefinition;
  // Additional props that you may need can be added here
}

const FontawesomeIcon: React.FC<FontawesomeIconProps> = ({ icon, ...props }) => {
  return <FontAwesomeIcon icon={icon} {...props} />;
};

export default FontawesomeIcon;
