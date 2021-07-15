import React, { HtmlHTMLAttributes, ComponentType } from 'react';

import { IconBaseProps } from 'react-icons';
import { CSSProperties } from 'styled-components';

import { CustonButton } from './styles';

interface ButtonProps extends HtmlHTMLAttributes<HTMLButtonElement> {
  textContent?: string;
  textColor?: string;
  backgroundColor?: string;
  maxWidth?: string | number;
  maxHeight?: string | number;
  isTextBold?: boolean;
  type: 'button' | 'reset' | 'submit';
  extraStyles?: CSSProperties;
  icon?: ComponentType<IconBaseProps>;
  iconColor?: string;
  iconSize?: number;
}

const Button: React.FC<ButtonProps> = ({
  backgroundColor,
  maxHeight,
  maxWidth,
  textColor,
  textContent,
  isTextBold,
  type,
  extraStyles,
  icon: Icon,
  iconColor,
  iconSize = 20,
  ...rest
}) => {
  return (
    <CustonButton
      style={{
        maxHeight: maxHeight ?? '',
        maxWidth: maxWidth ?? '',
        ...extraStyles,
      }}
      isTextBold={isTextBold}
      backgroundColor={backgroundColor}
      textColor={textColor}
      type={type}
      {...rest}
    >
      {Icon && <Icon size={iconSize} color={iconColor} />}
      {textContent}
    </CustonButton>
  );
};

export default Button;
