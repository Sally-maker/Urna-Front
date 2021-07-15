import { useRef, useState, useCallback, useEffect } from 'react';

import { FormHandles } from '@unform/core';
import { FaUserTie } from 'react-icons/fa';
import { RiLockPasswordFill } from 'react-icons/ri';
import { useHistory, useParams } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';
import * as Yup from 'yup';

import {
  Button,
  Input,
  Dropzone as DropzoneComponent,
  Loader,
} from '~/components';
import { CandidateProps } from '~/models';
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

interface Params {
  _id: string;
}

const SignUpCandidate = () => {
  const [selectedFile, setSelectedFile] = useState<File>();
  const [candidate, setCandidate] = useState<CandidateProps>(
    {} as CandidateProps,
  );
  const [loading, setLoading] = useState(true);
  console.log('arquivo de imagem', selectedFile);

  const formRef = useRef<FormHandles>(null);
  const history = useHistory();
  const { addToast } = useToasts();
  const { _id } = useParams<Params>();

  const handleEditCandidate = useCallback(
    async (data: FormData) => {
      try {
        const schema = Yup.object().shape({
          chapa: Yup.string().required(),
          codigo: Yup.string().required(),
        });

        await schema.validate(data, { abortEarly: false });

        await api.put(`candidatos/edit/${_id}`, data);

        addToast('Cadastro de candidato efetuado com sucesso.', {
          appearance: 'success',
          autoDismiss: true,
        });

        history.push('/candidatos');
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          const erros = getValidationsError(error);

          formRef.current?.setErrors(erros);

          addToast('Não foi possível atualizar dados do candidato.', {
            appearance: 'error',
            autoDismiss: true,
          });
        }
      }
    },
    [_id, addToast, history],
  );

  const handleUpdateAvatar = useCallback(async () => {
    try {
      setLoading(true);

      const formData = new FormData();
      formData.append('avatar', selectedFile as File);

      await api.patch(`candidatos/${_id}/avatar`, formData, {
        headers: {
          'content-type': 'multipart/form-data',
        },
      });

      addToast('Foto do candidato atualizada com sucesso!', {
        appearance: 'success',
        autoDismiss: true,
      });
      history.push('/candidatos');
    } catch (error) {
      addToast('Não foi possível atualizar foto do candidato.', {
        appearance: 'error',
        autoDismiss: true,
      });
      history.push('/candidatos');
    } finally {
      setLoading(false);
    }
  }, [_id, addToast, history, selectedFile]);

  useEffect(() => {
    const loadingCandidate = async () => {
      try {
        const response = await api.get(`candidatos/${_id}/show`);

        setCandidate(response.data);

        formRef.current?.setData({
          chapa: candidate.chapa,
          codigo: candidate.codigo,
        });
      } catch (error) {
        addToast('Não foi possível carregar dados do candidato', {
          appearance: 'error',
          autoDismiss: true,
        });
        history.push('/candidatos');
      } finally {
        setLoading(false);
      }
    };

    loadingCandidate();
  }, [_id, addToast, candidate.chapa, candidate.codigo, history]);

  return (
    <Container>
      {loading ? (
        <Loader size={30} isLoading={loading} />
      ) : (
        <RegisterContainer>
          <AvatarContainer>
            <Dropzone>
              <DropzoneComponent
                fileURL={candidate.avatar}
                fileUpload={setSelectedFile}
              />
            </Dropzone>
            <Button
              maxWidth="242px"
              maxHeight="59px"
              type="submit"
              textContent="Atualizar avatar"
              onClick={handleUpdateAvatar}
            />
          </AvatarContainer>

          <FormContainer>
            <CustomForm ref={formRef} onSubmit={handleEditCandidate}>
              <TitleRegister>Cadastro de Candidato</TitleRegister>
              <Input
                icon={() => <FaUserTie size={24} />}
                name="chapa"
                placeholder="Nome da chapa"
                defaultValue={candidate.chapa}
              />
              <Input
                extraStyles={{ marginTop: 17 }}
                name="codigo"
                placeholder="Código"
                icon={() => <RiLockPasswordFill size={24} />}
                defaultValue={candidate.codigo}
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
      )}
    </Container>
  );
};

export default SignUpCandidate;
