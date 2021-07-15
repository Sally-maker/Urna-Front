import { useCallback, useState, useEffect, useMemo } from 'react';

import { FaTrashAlt, FaRegEdit } from 'react-icons/fa';
import { useHistory } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';
import Swal from 'sweetalert2';

import { Button, Loader } from '~/components';
import { CandidateProps } from '~/models';
import api from '~/services/api';

import {
  Container,
  EmptyCandidateContent,
  TextDescription,
  TableContainer,
  Tableheader,
  TableBody,
} from './styles';

const CandidateList = () => {
  const [candidates, setCandidates] = useState<CandidateProps[]>([]);
  const [loading, setLoading] = useState(true);

  const history = useHistory();
  const { addToast } = useToasts();

  const handleNavigateToSignUpCandidate = useCallback(() => {
    history.push('/cadastrar/candidato');
  }, [history]);

  const handleEditCandidate = useCallback(
    async (_id: string) => {
      history.push(`/editar/${_id}/candidato`);
    },
    [history],
  );

  const handleDeleteCandidate = useCallback(
    async (_id: string) => {
      try {
        const result = await Swal.fire({
          title: 'Deseja excluir candidato?',
          text: 'Esta ação é irreversível',
          icon: 'question',
          showCancelButton: true,
          showConfirmButton: true,
          confirmButtonText: 'Confirmar',
          cancelButtonText: 'Cancelar',
          confirmButtonColor: '#FD5C5C',
        });

        if (result.isConfirmed) {
          setLoading(true);

          await api.delete(`candidatos/delete/${_id}`);

          const response = await api.get('candidatos');

          setCandidates(response.data);

          return addToast('Candidato deletado com sucesso', {
            appearance: 'success',
            autoDismiss: true,
          });
        }

        return null;
      } catch {
        addToast('Não foi possível deletar candidato!', {
          appearance: 'error',
          autoDismiss: true,
        });
      } finally {
        setLoading(false);
      }
    },
    [addToast],
  );

  const candidatesList = useMemo(() => {
    return (
      <TableContainer>
        <table>
          <Tableheader>
            <tr>
              <th rowSpan={3}>
                <th>Chapa</th>
                <th>Editar</th>
                <th>Excluir</th>
              </th>
            </tr>
          </Tableheader>
          <TableBody>
            {candidates.map((candidate) => (
              <>
                <tr key={candidate._id}>
                  <td>
                    {candidate.chapa}
                    <Button
                      maxWidth={40}
                      maxHeight={40}
                      type="button"
                      backgroundColor="#F7941E"
                      icon={FaRegEdit}
                      iconColor="#fff"
                      onClick={() => handleEditCandidate(candidate._id)}
                    />
                    <Button
                      maxWidth={40}
                      maxHeight={40}
                      type="button"
                      backgroundColor="#FD5C5C"
                      icon={FaTrashAlt}
                      iconColor="#fff"
                      onClick={() => handleDeleteCandidate(candidate._id)}
                    />
                  </td>
                </tr>
              </>
            ))}
          </TableBody>
        </table>
        <Button
          onClick={handleNavigateToSignUpCandidate}
          maxWidth="346px"
          type="button"
          textContent="Cadastrar novo candidato"
        />
      </TableContainer>
    );
  }, [
    candidates,
    handleDeleteCandidate,
    handleEditCandidate,
    handleNavigateToSignUpCandidate,
  ]);

  useEffect(() => {
    const loadCandidates = async () => {
      try {
        const response = await api.get('candidatos');

        setCandidates(response.data);
      } catch (error) {
        addToast('Não foi possível carregar lista de candidatos', {
          appearance: 'error',
          autoDismiss: true,
        });
      } finally {
        setLoading(false);
      }
    };

    loadCandidates();
  }, [addToast]);

  return (
    <Container>
      {loading ? (
        <Loader size={30} isLoading={loading} />
      ) : candidates.length === 0 ? (
        <EmptyCandidateContent>
          <TextDescription>Nenhum candidato cadastrado :(</TextDescription>

          <Button
            onClick={handleNavigateToSignUpCandidate}
            maxWidth="346px"
            type="button"
            textContent="Cadastrar novo candidato"
          />
        </EmptyCandidateContent>
      ) : (
        candidatesList
      )}
    </Container>
  );
};

export default CandidateList;
