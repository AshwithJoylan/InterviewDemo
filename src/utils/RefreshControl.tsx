import React from 'react';
import { RefreshControl as Refresh } from 'react-native';
import { useColors } from '@theme';

/**
 * @interface RefreshControlProps
 */
interface RefreshControlProps {
  onRefresh?: () => void;
  refreshing: boolean;
}

/**
 * RefreshControl
 */
const RefreshControl: React.FC<RefreshControlProps> = (props) => {
  const colors = useColors();
  return (
    <Refresh
      colors={[colors.darkText]}
      tintColor={colors.darkText}
      {...props}
    />
  );
};

export default RefreshControl;
