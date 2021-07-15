import { useRef } from 'react';

import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { FiLock } from 'react-icons/fi';
import { useHistory } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';
import * as Yup from 'yup';

import { Input } from '~/components';
import { useAuth } from '~/hooks/auth';
import { getValidationsError } from '~/utils';

import {
  Container,
  LoginContainer,
  LoginContainer_Title,
  LoginContainer_Label,
  LoginContainer_ButtonSugmitContainer,
  ButtonSubmitContainer_ButtonSignIn,
} from './styles';

interface SignInFormData {
  codigo: string;
}

const SignIn = () => {
  const formRef = useRef<FormHandles>(null);

  const { signIn } = useAuth();
  const { addToast } = useToasts();
  const history = useHistory();

  const handleSubmit = async (data: SignInFormData) => {
    try {
      const schema = Yup.object().shape({
        codigo: Yup.string().required(),
      });

      await schema.validate(data);

      await signIn(data.codigo, addToast, history.push);
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const errors = getValidationsError(error);

        formRef.current?.setErrors(errors);
      }

      addToast('Não foi possível efetuar login, tente novamente', {
        autoDismiss: true,
        appearance: 'error',
      });
    }
  };

  return (
    <Container>
      <LoginContainer>
        <LoginContainer_Title>Login</LoginContainer_Title>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <LoginContainer_Label>Digite seu ID:</LoginContainer_Label>
          <Input
            icon={FiLock}
            extraStyles={{
              marginTop: '1.9rem',
            }}
            name="codigo"
          />
          <LoginContainer_ButtonSugmitContainer>
            <ButtonSubmitContainer_ButtonSignIn type="submit">
              Entrar
            </ButtonSubmitContainer_ButtonSignIn>
          </LoginContainer_ButtonSugmitContainer>
        </Form>
      </LoginContainer>
    </Container>
  );
};

export default SignIn;
