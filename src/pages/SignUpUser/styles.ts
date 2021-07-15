import { Form } from '@unform/web';
import styled from 'styled-components';

export const Container = styled.section`
  width: 100%;
  height: 100%;
  margin: auto;

  display: flex;
  justify-content: center;
  align-items: center;
`;

export const FieldUserRegister = styled.fieldset`
  width: 100%;
  padding: 56px;
  border: none;

  max-width: 775px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  background: #f0f0f0;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 8px;
`;

export const GenerateCodeField = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 55px;

  > div {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  @media (max-width: 760px) {
    flex-direction: column;
  }
`;

export const TypeUserField = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;

  @media (max-width: 760px) {
    flex-direction: column;
    justify-content: center;
  }
`;

export const Label = styled.span`
  font-size: 1.2rem;
  font-family: 'Roboto', sans-serif;
  color: #000;

  &:nth-child(1) {
    margin-bottom: 10px;
  }
`;

export const CheckBoxContainer = styled.div`
  width: 100%;
  max-width: 300px;
  height: 58px;
  padding: 17px;

  display: flex;
  justify-content: space-around;
  align-items: center;

  background: #ffffff;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 5px;
  margin-top: 10px;

  @media (max-width: 760px) {
    margin-bottom: 20px;
  }
`;

export const CustonForm = styled(Form)`
  width: 100%;
`;
