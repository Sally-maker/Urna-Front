import { ReactNode, useCallback } from 'react';

import { useHistory } from 'react-router-dom';

import { ImageLogo } from '~/assets/images';
import { useAuth } from '~/hooks/auth';

import { Container, Title, ButtonSignOut } from './styles';

interface HeaderSignInProps {
  children: ReactNode;
}

const HeaderSignIn = ({ children }: HeaderSignInProps) => {
  const { user, signOut } = useAuth();
  const history = useHistory();

  const handleSignOut = useCallback(() => {
    signOut();
    history.push('/');
  }, [history, signOut]);

  return (
    <>
      <Container>
        <img src={ImageLogo} alt="logo" />
        <Title>Senac</Title>
        {user && <ButtonSignOut onClick={handleSignOut}>Sair</ButtonSignOut>}
      </Container>
      {children}
    </>
  );
};

export default HeaderSignIn;
