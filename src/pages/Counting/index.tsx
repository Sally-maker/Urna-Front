import { useMemo, useEffect, useState } from 'react';

import { useToasts } from 'react-toast-notifications';

import { Loader } from '~/components';
import { CandidateProps } from '~/models';
import api from '~/services/api';

import {
  Container,
  TableBody,
  TableContainer,
  Tableheader,
  EmptyCandidateContent,
  TextDescription,
} from './styles';

const Counting = () => {
  const [loading, setLoading] = useState(true);
  const [candidates, setCandidates] = useState<CandidateProps[]>([]);

  const { addToast } = useToasts();

  const candidatesMapping = useMemo(() => {
    if (!loading && candidates.length > 0) {
      return (
        <TableContainer>
          <table>
            <Tableheader>
              <tr>
                <th rowSpan={3}>
                  <th>Chapa</th>
                  <th>Votos</th>
                </th>
              </tr>
            </Tableheader>
            <TableBody>
              {candidates.map((candidate) => (
                <>
                  <tr key={candidate._id}>
                    <td>
                      <span>{candidate.chapa}</span>
                      <span>{candidate.votos}</span>
                    </td>
                  </tr>
                </>
              ))}
            </TableBody>
          </table>
        </TableContainer>
      );
    }

    if (candidates.length === 0) {
      return (
        <EmptyCandidateContent>
          <TextDescription>Nenhum candidato cadastrado :(</TextDescription>
        </EmptyCandidateContent>
      );
    }

    return <Loader isLoading={loading} size={25} />;
  }, [candidates, loading]);

  useEffect(() => {
    const loadCandidates = async () => {
      try {
        const response = await api.get('candidatos');

        setCandidates(response.data);
      } catch {
        addToast('Não foi possível carregar a lista de candidatos', {
          appearance: 'error',
          autoDismiss: true,
        });
      } finally {
        setLoading(false);
      }
    };

    loadCandidates();
  }, [addToast]);

  return <Container>{candidatesMapping}</Container>;
};

export default Counting;
