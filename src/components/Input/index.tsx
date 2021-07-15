import React, {
  HtmlHTMLAttributes,
  useEffect,
  useRef,
  useState,
  useCallback,
  ComponentType,
  CSSProperties,
} from 'react';

import { useField } from '@unform/core';
import { IconBaseProps } from 'react-icons';

import { Container, StyledInput } from './styles';

interface InputProps extends HtmlHTMLAttributes<HTMLInputElement> {
  name: string;
  icon?: ComponentType<IconBaseProps>;
  extraStyles?: CSSProperties;
  disabled?: boolean;
  readonly?: boolean;
  uppercase?: boolean;
}

const Input: React.FC<InputProps> = ({
  name,
  icon: Icon,
  extraStyles,
  disabled,
  readonly,
  uppercase,
  ...rest
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  const { fieldName, defaultValue, error, registerField } = useField(name);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);

    setIsFilled(!!inputRef.current?.value);
  }, []);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  return (
    <Container
      style={extraStyles}
      isFocused={isFocused}
      isFilled={isFilled}
      isErrored={!!error}
    >
      {Icon && <Icon size={20} />}
      <StyledInput
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        defaultValue={defaultValue}
        ref={inputRef}
        disabled={disabled}
        readOnly={readonly}
        uppercase={uppercase}
        {...rest}
      />
    </Container>
  );
};

export default Input;
