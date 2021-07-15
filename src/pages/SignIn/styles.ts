import styled from 'styled-components';

export const Container = styled.section``;

export const LoginContainer = styled.fieldset`
  width: 100%;
  max-width: 34.3rem;
  height: 100%;
  max-height: 46rem;

  margin: 9.6rem auto;
  display: flex;
  flex-direction: column;

  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  border: 0;
  padding: 3.3rem;
`;

export const LoginContainer_Title = styled.h1`
  font-family: 'Ubuntu', sans-serif;
  font-size: 3.6rem;
  font-weight: 700;
  line-height: 4.1rem;
  text-transform: uppercase;
  margin-top: 0.5rem;
  text-align: center;
  color: ${({ theme }) => theme.colors.blue};
  margin-bottom: 5.4rem;
`;

export const LoginContainer_Label = styled.label`
  font-size: 1.3rem;
  font-family: 'Roboto';
  line-height: 1.9rem;
`;

export const LoginContainer_ButtonSugmitContainer = styled.div`
  width: 100%;

  display: flex;
  justify-content: center;
  align-items: center;

  margin-top: 2.5rem;
`;

export const ButtonSubmitContainer_ButtonSignIn = styled.button`
  width: 100%;
  max-width: 22.3rem;
  height: 100%;
  max-height: 6.3rem;

  background: ${({ theme }) => theme.colors.orange_dark};
  color: ${({ theme }) => theme.colors.white};
  padding: 1rem 2.5rem;
  border-radius: 1rem;
  border: none;
  font-size: 1.4rem;
  transition: opacity 0.2s;

  &:hover {
    opacity: 85%;
  }
`;
