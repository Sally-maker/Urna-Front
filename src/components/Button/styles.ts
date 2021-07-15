import styled, { css } from 'styled-components';

interface ButtonProps {
  textColor?: string;
  backgroundColor?: string;
  isTextBold?: boolean;
  textContent?: string;
}

export const CustonButton = styled.button<ButtonProps>`
  display: flex;
  justify-content: center;
  align-items: center;

  padding: 10px;
  ${({ textColor }) =>
    textColor
      ? css`
          color: ${textColor};
        `
      : css`
          color: #fff;
        `}
  ${({ backgroundColor, theme }) =>
    backgroundColor
      ? css`
          background: ${backgroundColor};
        `
      : css`
          background: ${theme.colors.orange_dark};
        `}
  font-size: 1.2rem;
  font-family: 'Ubuntu';
  ${({ isTextBold }) =>
    isTextBold
      ? css`
          font-weight: 700;
        `
      : css`
          font-weight: 400;
        `}

  width: 100%;
  height: 73px;
  border-radius: 10px;
  border: none;
  transition: opacity 0.2s;

  &:hover {
    opacity: 85%;
  }

  ${({ textContent }) =>
    textContent
      ? css`
          > svg {
            margin-right: 10px;
          }
        `
      : null}
`;
