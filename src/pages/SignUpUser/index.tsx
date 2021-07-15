import { useRef, useCallback } from 'react';

import { FormHandles } from '@unform/core';
import { FaCopy } from 'react-icons/fa';
import { useHistory } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';
import * as Yup from 'yup';

import { Input, Button, RadioInput } from '~/components';
import api from '~/services/api';
import { generateID, getValidationsError } from '~/utils';

import {
  Container,
  FieldUserRegister,
  GenerateCodeField,
  Label,
  TypeUserField,
  CheckBoxContainer,
  CustonForm,
} from './styles';

interface FormData {
  codigo: string;
  tipo: string;
}

const SignUpUser = () => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToasts();
  const history = useHistory();

  const checkBoxConstants = [
    {
      id: '1',
      label: 'Admin',
      value: 'admin',
    },
    {
      id: '2',
      label: 'Standard',
      value: 'standard',
    },
  ];

  const handleCopyToClipBoard = useCallback(() => {
    const input = document.querySelector<HTMLInputElement>('#clipboard');
    input?.select();

    document.execCommand('copy');
    addToast('Copiado', {
      appearance: 'success',
      autoDismiss: true,
    });
  }, [addToast]);

  const handlegenerateCodeUser = useCallback(() => {
    const code = generateID();

    formRef.current?.setFieldValue('codigo', code);
  }, []);

  const handleSubmit = useCallback(
    async (data: FormData) => {
      try {
        const schema = Yup.object().shape({
          codigo: Yup.string().required(),
          tipo: Yup.string().required(),
        });

        await schema.validate(data, { abortEarly: false });

        await api.post('usuarios/cadastrar', data);

        addToast('Usuário cadastrado com sucesso!', {
          appearance: 'success',
          autoDismiss: true,
        });

        history.push('/dashboard');
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          const erros = getValidationsError(error);

          formRef.current?.setErrors(erros);
          addToast('Não foi possível cadastrar novo usuário', {
            appearance: 'error',
            autoDismiss: true,
          });
        }
      }
    },
    [addToast, history],
  );

  return (
    <Container>
      <FieldUserRegister>
        <CustonForm ref={formRef} onSubmit={handleSubmit}>
          <GenerateCodeField>
            <div>
              <Label>Identificador do usuário:</Label>
              <Input
                id="clipboard"
                readonly
                name="codigo"
                extraStyles={{ maxWidth: 348 }}
              />
            </div>
            <Button
              type="button"
              maxWidth={50}
              maxHeight={50}
              backgroundColor="transparent"
              icon={FaCopy}
              iconColor="#E4572E"
              extraStyles={{
                marginRight: 250,
                marginTop: 30,
              }}
              onClick={handleCopyToClipBoard}
            />
            <Button
              type="button"
              maxWidth={183}
              maxHeight={59}
              extraStyles={{
                position: 'absolute',
                bottom: 0,
                right: 0,
              }}
              textContent="Gerar código"
              onClick={handlegenerateCodeUser}
            />
          </GenerateCodeField>
          <TypeUserField>
            <div>
              <Label>Selecione o tipo do usuário:</Label>
              <CheckBoxContainer>
                <RadioInput name="tipo" options={checkBoxConstants} />
              </CheckBoxContainer>
            </div>
            <Button
              type="submit"
              maxWidth={183}
              maxHeight={59}
              textContent="Cadastrar"
            />
          </TypeUserField>
        </CustonForm>
      </FieldUserRegister>
    </Container>
  );
};

export default SignUpUser;
