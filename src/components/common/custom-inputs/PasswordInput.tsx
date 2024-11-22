import { Input, InputProps } from 'antd';
import React from 'react';

type PasswordInputProps = InputProps & {
  size?: 'small' | 'middle' | 'large';
};

const PasswordInput: React.FC<PasswordInputProps> = ({
  size,
  style,
  ...props
}) => {
  const getInputSize = () => {
    if (size === 'small') return '30px';
    if (size === 'middle') return '40px';
    return '50px';
  };
  return (
    <Input.Password
      {...props}
      style={{
        height: getInputSize(),
        ...style,
      }}
    />
  );
};

export default PasswordInput;
