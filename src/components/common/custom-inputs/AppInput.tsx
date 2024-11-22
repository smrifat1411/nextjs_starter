import { Input, InputProps } from 'antd';
import React from 'react';

type AppInputProps = InputProps & {
  size?: 'small' | 'middle' | 'large';
};

const AppInput: React.FC<AppInputProps> = ({ size, style, ...props }) => {
  const getInputSize = () => {
    if (size === 'small') return '30px';
    if (size === 'middle') return '40px';
    return '50px';
  };
  return (
    <Input
      className='!font-proxima'
      {...props}
      style={{
        height: getInputSize(),
        ...style,
      }}
    />
  );
};

export default AppInput;
