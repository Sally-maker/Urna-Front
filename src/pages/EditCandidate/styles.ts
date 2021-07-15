import { Form } from '@unform/web';
import styled from 'styled-components';

export const Container = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 100%;

  margin: auto;
`;

export const RegisterContainer = styled.fieldset`
  display: flex;
  justify-content: space-between;

  width: 100%;
  height: 100%;

  max-width: 957px;
  max-height: 404px;

  border: none;
  background: #f0f0f0;
  border-radius: 8px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;

export const AvatarContainer = styled.div`
  padding: 60px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Dropzone = styled.div`
  background: #fff;
  width: 100%;
  height: 100%;

  max-width: 300px;
  max-height: 300px;

  margin-bottom: 46px;

  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-end;
`;

export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;

  padding: 40px;
`;

export const TitleRegister = styled.h2`
  color: #000;
  font-family: 'Roboto', sans-serif;
  font-size: 2.2rem;
  margin-bottom: 40px;
`;

export const CustomForm = styled(Form)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
