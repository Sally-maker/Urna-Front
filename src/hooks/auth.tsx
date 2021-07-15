import { createContext, useContext, FC, useState, useCallback } from 'react';

import { AddToast } from 'react-toast-notifications';
import Swal from 'sweetalert2';

import { UserProps } from '~/models';
import api from '~/services/api';

interface AuthContextProps {
  user: UserProps | null;
  signIn(
    codigo: string,
    toast: AddToast,
    push: (path: string, state?: unknown) => void,
  ): Promise<void>;
  signOut(): void;
  updateUserVoteState(): void;
}

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

export const AuthProvider: FC = ({ children }) => {
  const [user, setUser] = useState<UserProps | null>(() => {
    const userIsStorage = JSON.parse(
      String(localStorage.getItem('@urna')),
    ) as UserProps;

    if (userIsStorage) {
      return userIsStorage;
    }

    return null;
  });

  const signIn = useCallback(
    async (
      codigo: string,
      toast: AddToast,
      push: (path: string, state?: unknown) => void,
    ) => {
      const { data } = await api.post<UserProps>('/auth', { codigo });

      switch (true) {
        case data.tipo === 'admin' && !data.votou:
          localStorage.setItem('@urna', JSON.stringify(data));
          setUser(data);

          toast('Logado com sucesso!', {
            autoDismiss: true,
            appearance: 'success',
          });
          push('/dashboard');
          break;

        case data.tipo === 'admin' && data.votou:
          localStorage.setItem('@urna', JSON.stringify(data));
          setUser(data);

          toast('Logado com sucesso!', {
            autoDismiss: true,
            appearance: 'success',
          });
          push('/dashboard');
          break;

        case data.tipo === 'standard' && !data.votou:
          localStorage.setItem('@urna', JSON.stringify(data));
          setUser(data);

          toast('Logado com sucesso!', {
            autoDismiss: true,
            appearance: 'success',
          });
          push('/dashboard');
          break;

        default:
          Swal.fire({
            title: 'Desculpe, você já efetuou seu voto',
            text: 'Aguarda a finalização da apuração para mais detalhes',
            icon: 'error',
          });
          break;
      }
    },
    [],
  );

  const signOut = useCallback(async () => {
    localStorage.removeItem('@urna');
    setUser(null);
  }, []);

  const updateUserVoteState = useCallback(() => {
    if (user) {
      const updatedUser = {
        _id: user._id,
        codigo: user.codigo,
        tipo: user.tipo,
        votou: true,
      };

      setUser(updatedUser);

      localStorage.removeItem('@urna');
      localStorage.setItem('@urna', JSON.stringify(updatedUser));
    }
  }, [user]);

  return (
    <AuthContext.Provider
      value={{ user, signIn, signOut, updateUserVoteState }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const { ...context } = useContext(AuthContext);

  return context;
};
