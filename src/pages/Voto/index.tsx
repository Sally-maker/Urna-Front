import { useRef, useCallback, useState } from 'react';

import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { useToasts } from 'react-toast-notifications';
import Swal from 'sweetalert2';
import * as Yup from 'yup';

import { Button, Loader } from '~/components';
import { useAuth } from '~/hooks/auth';
import { CandidateProps } from '~/models';
import api from '~/services/api';
import getValidationsError from '~/utils/getValidationsError';

import {
  Container,
  ActionContainer,
  Display,
  Display_Label,
  Display_InfoCandidateLabel,
  Display_CandidateInformations,
  Display_ConfirmButtonVote,
  ButtonNumber,
  NumberButtonsContainer,
  CancelAction,
  ClearFieldAction,
  ConfirmAction,
  FireButtonActions,
  CandidateAvatar,
  AvatarContent,
  ContentContainer,
  CandidateInfoContent,
  InfoLabel,
  InfoSpan,
  ContentCentered,
  InputCodeCandidate,
} from './styles';

interface DataForm {
  codigo: string;
}

const Voto = () => {
  const [loading, setLoading] = useState(false);
  const [candidate, setCandidate] = useState<CandidateProps>(
    {} as CandidateProps,
  );

  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToasts();
  const { user, signOut, updateUserVoteState } = useAuth();

  const handleInsertInputValue = useCallback((input: string) => {
    formRef.current?.setData({
      codigo: formRef.current?.getFieldValue('codigo') + input,
    });
  }, []);

  const handleClearFieldValue = useCallback(() => {
    formRef.current?.clearField('codigo');
  }, []);

  const handleCancelOperation = useCallback(() => {
    formRef.current?.clearField('codigo');
    setCandidate({} as CandidateProps);
  }, []);

  const handleSearchCandidate = useCallback(async () => {
    try {
      setLoading(true);

      const candidateInput = formRef.current?.getFieldValue('codigo');

      if (!candidateInput) {
        await Swal.fire({
          title: 'Atenção!',
          text: 'É necessário inserir o código do candidato para continuar',
          icon: 'info',
        });
      }

      const response = await api.get(`candidatos/${candidateInput}/show`);

      setCandidate(response.data);
    } catch {
      await Swal.fire({
        title: 'Erro!',
        text: 'Candidato não cadastrado',
        icon: 'error',
      });
    } finally {
      setLoading(false);
    }
  }, []);

  const handleSubmit = useCallback(
    async (data: DataForm) => {
      try {
        const parseCodeForNumber = {
          codigo: Number(data.codigo),
        };

        const schema = Yup.object().shape({
          codigo: Yup.number().required(),
        });

        await schema.validate(parseCodeForNumber);
        console.log('votou o danado', user?.votou);

        if (user?.votou) {
          const resultError = await Swal.fire({
            title: 'Desculpe',
            text: 'Você já realizou seu voto.',
            icon: 'error',
          });

          if (resultError.isConfirmed) {
            handleCancelOperation();
            return;
          }
        }

        await api.put(`candidatos/${user?._id}/voto`, parseCodeForNumber);

        const result = await Swal.fire({
          title: 'Voto registrado com sucesso!',
          text:
            'Obrigato por contribuir com o seu voto, você será deslogado da plataforma, fique atento aos resultados da apuração.',
          icon: 'success',
        });

        updateUserVoteState();

        if (result.isConfirmed && user?.tipo === 'standard') {
          signOut();
        }
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          const errors = getValidationsError(error);

          formRef.current?.setErrors(errors);

          addToast('Não foi possível votar neste candidato, tente novamente.', {
            appearance: 'error',
            autoDismiss: true,
          });
        }
      }
    },
    [
      addToast,
      handleCancelOperation,
      signOut,
      updateUserVoteState,
      user?._id,
      user?.tipo,
      user?.votou,
    ],
  );

  return (
    <Container>
      <Display>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <Display_Label>Código do candidato:</Display_Label>
          <InputCodeCandidate name="codigo" disabled />
          <Display_InfoCandidateLabel>
            Dados do candidato:
          </Display_InfoCandidateLabel>

          <Display_CandidateInformations candidate={candidate}>
            {Object.keys(candidate).length === 0 ? null : loading ? (
              <ContentCentered>
                <Loader isLoading={loading} size={16} />
              </ContentCentered>
            ) : (
              <ContentContainer>
                <AvatarContent>
                  <CandidateAvatar src={candidate.avatar} />
                </AvatarContent>

                <CandidateInfoContent>
                  <InfoLabel>
                    Chapa: <InfoSpan>{candidate.chapa}</InfoSpan>
                  </InfoLabel>
                  <InfoLabel>
                    Código: <InfoSpan>{candidate.codigo}</InfoSpan>
                  </InfoLabel>
                </CandidateInfoContent>
              </ContentContainer>
            )}
          </Display_CandidateInformations>

          <Display_ConfirmButtonVote>
            <Button
              type="submit"
              textContent="Confirmar"
              maxWidth="223px"
              maxHeight="63px"
            />
          </Display_ConfirmButtonVote>
        </Form>
      </Display>

      <ActionContainer>
        <NumberButtonsContainer>
          <ButtonNumber onClick={() => handleInsertInputValue('1')}>
            1
          </ButtonNumber>
          <ButtonNumber onClick={() => handleInsertInputValue('2')}>
            2
          </ButtonNumber>
          <ButtonNumber onClick={() => handleInsertInputValue('3')}>
            3
          </ButtonNumber>
          <ButtonNumber onClick={() => handleInsertInputValue('4')}>
            4
          </ButtonNumber>
          <ButtonNumber onClick={() => handleInsertInputValue('5')}>
            5
          </ButtonNumber>
          <ButtonNumber onClick={() => handleInsertInputValue('6')}>
            6
          </ButtonNumber>
          <ButtonNumber onClick={() => handleInsertInputValue('7')}>
            7
          </ButtonNumber>
          <ButtonNumber onClick={() => handleInsertInputValue('8')}>
            8
          </ButtonNumber>
          <ButtonNumber onClick={() => handleInsertInputValue('9')}>
            9
          </ButtonNumber>
          <ButtonNumber onClick={() => handleInsertInputValue('0')}>
            0
          </ButtonNumber>
        </NumberButtonsContainer>

        <FireButtonActions>
          <CancelAction onClick={handleCancelOperation}>cancelar</CancelAction>
          <ClearFieldAction onClick={handleClearFieldValue}>
            limpar
          </ClearFieldAction>
          <ConfirmAction onClick={handleSearchCandidate}>
            confirmar
          </ConfirmAction>
        </FireButtonActions>
      </ActionContainer>
    </Container>
  );
};

export default Voto;
