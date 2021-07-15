import React, { memo } from 'react';

import ScaleLoader from 'react-spinners/ScaleLoader';

interface LoaderProps {
  isLoading: boolean;
  color?: string;
  size?: number;
}

const Loader: React.FC<LoaderProps> = ({
  isLoading,
  color = '#F7941E',
  size = 50,
}) => (
  <ScaleLoader color={color} loading={isLoading} height={size} width={size} />
);

export default memo(Loader);
