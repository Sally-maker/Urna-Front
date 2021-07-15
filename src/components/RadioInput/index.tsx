import { useEffect, useRef, InputHTMLAttributes, memo } from 'react';

import { useField } from '@unform/core';

import { Input } from './styles';

type CheckboxOptions = Array<{
  id: string;
  value: string;
  label: string;
}>;

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  options: CheckboxOptions;
}

const RadioInput = ({ name, options, ...rest }: Props) => {
  const inputRefs = useRef<HTMLInputElement[]>([]);
  const { fieldName, registerField, defaultValue = '' } = useField(name);
  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRefs.current,
      getValue: (refs: HTMLInputElement[]) => {
        return refs.find((ref) => ref.checked)?.value || '';
      },
      setValue: (refs: HTMLInputElement[], id: string) => {
        const inputRef = refs.find((ref) => ref.id === id);
        if (inputRef) inputRef.checked = true;
      },
      clearValue: (refs: HTMLInputElement[]) => {
        const inputRef = refs.find((ref) => ref.checked === true);
        if (inputRef) inputRef.checked = false;
      },
    });
  }, [defaultValue, fieldName, registerField]);
  return (
    <>
      {options.map((option) => (
        <label htmlFor={option.id} key={option.id}>
          <Input
            ref={(ref) => inputRefs.current.push(ref as HTMLInputElement)}
            id={option.id}
            type="radio"
            name={name}
            defaultChecked={defaultValue.includes(option.id)}
            value={option.value}
            {...rest}
          />
          {option.label}
        </label>
      ))}
    </>
  );
};

export default memo(RadioInput);
