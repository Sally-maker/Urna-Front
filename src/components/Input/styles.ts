import styled, { css } from 'styled-components';

interface ContainerProps {
  isErrored: boolean;
  isFocused: boolean;
  isFilled: boolean;
}

interface InputProps {
  uppercase?: boolean;
}

export const Container = styled.div<ContainerProps>`
  width: 100%;
  height: 100%;
  max-height: 2.6rem;

  display: flex;
  justify-content: center;
  align-items: center;

  background: #fff;
  border: 0.1rem solid;
  border-radius: 1rem;
  padding: 1.5rem;

  ${(props) => {
    switch (true) {
      case props.isErrored:
        return css`
          border-color: ${props.theme.colors.error};
        `;
      case props.isFocused:
        return css`
          border-color: ${props.theme.colors.orange};
        `;

      case props.isFilled:
        return css`
          border-color: ${props.theme.colors.orange};
        `;

      default:
        return css`
          border-color: ${props.theme.colors.border_input};
        `;
    }
  }}

  > svg {
    ${(props) => {
      switch (true) {
        case props.isErrored:
          return css`
            color: ${props.theme.colors.error};
          `;
        case props.isFocused:
          return css`
            color: ${props.theme.colors.orange};
          `;

        case props.isFilled:
          return css`
            color: ${props.theme.colors.orange};
          `;

        default:
          return css`
            color: ${props.theme.colors.border_input};
          `;
      }
    }}
    margin-right: 1rem;
  }
`;

export const StyledInput = styled.input<InputProps>`
  border: none;
  font-family: 'Roboto', sans-serif;
  background: #fff;
  width: 100%;
  ${({ uppercase }) =>
    uppercase
      ? css`
          text-transform: uppercase;
        `
      : null}
`;
