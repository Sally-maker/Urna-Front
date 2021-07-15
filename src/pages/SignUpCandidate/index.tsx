import { useRef, useState, useCallback } from 'react';

import { FormHandles } from '@unform/core';
import { FaUserTie } from 'react-icons/fa';
import { RiLockPasswordFill } from 'react-icons/ri';
import { useHistory } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';
import * as Yup from 'yup';

import { Button, Input, Dropzone as DropzoneComponent } from '~/components';
import api from '~/services/api';
import getValidationsError from '~/utils/getValidationsError';

import {
  Container,
  RegisterContainer,
  AvatarContainer,
  Dropzone,
  FormContainer,
  TitleRegister,
  CustomForm,
} from './styles';

interface FormData {
  chapa: string;
  codigo: string;
}

const SignUpCandidate = () => {
  const [selectedFile, setSelectedFile] = useState<File>();

  const formRef = useRef<FormHandles>(null);
  const history = useHistory();
  const { addToast } = useToasts();

  const handleSubmit = useCallback(
    async (data: FormData) => {
      try {
        const schema = Yup.object().shape({
          chapa: Yup.string().required(),
          codigo: Yup.string().required(),
        });

        await schema.validate(data, { abortEarly: false });

        const formData = new FormData();
        formData.append('chapa', data.chapa);
        formData.append('codigo', data.codigo);
        formData.append('avatar', selectedFile as File);

        await api.post('candidatos/cadastrar', formData, {
          headers: {
            'content-type': 'multipart/form-data',
          },
        });

        addToast('Cadastro de candidato efetuado com sucesso.', {
          appearance: 'success',
          autoDismiss: true,
        });

        history.push('/candidatos');
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          const erros = getValidationsError(error);

          formRef.current?.setErrors(erros);

          addToast('Cadastro de candidato efetuado com sucesso.', {
            appearance: 'error',
            autoDismiss: true,
          });
        }
      }
    },
    [addToast, history, selectedFile],
  );

  return (
    <Container>
      <RegisterContainer>
        <AvatarContainer>
          <Dropzone>
            <DropzoneComponent fileUpload={setSelectedFile} />
          </Dropzone>
        </AvatarContainer>

        <FormContainer>
          <CustomForm ref={formRef} onSubmit={handleSubmit}>
            <TitleRegister>Cadastro de Candidato</TitleRegister>
            <Input
              icon={() => <FaUserTie size={24} />}
              name="chapa"
              placeholder="Nome da chapa"
              uppercase
            />
            <Input
              extraStyles={{ marginTop: 17 }}
              name="codigo"
              placeholder="Código"
              icon={() => <RiLockPasswordFill size={24} />}
              onChange={() => {
                const candidateCode = String(
                  formRef.current?.getFieldValue('codigo'),
                );
                const replacedValue = candidateCode.replace(/\D/gi, '');
                formRef.current?.setFieldValue('codigo', replacedValue);
              }}
            />
            <Button
              extraStyles={{
                marginTop: 32,
              }}
              maxWidth="242px"
              maxHeight="59px"
              type="submit"
              textContent="Cadastrar candidato"
            />
          </CustomForm>
        </FormContainer>
      </RegisterContainer>
    </Container>
  );
};

export default SignUpCandidate;
