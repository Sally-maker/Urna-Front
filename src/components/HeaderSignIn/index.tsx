/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import { ReactNode, useCallback } from 'react';

import { useHistory } from 'react-router-dom';

import { ImageLogo } from '~/assets/images';
import { useAuth } from '~/hooks/auth';

import { Container, ButtonSignOut } from './styles';

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
        {user && <ButtonSignOut onClick={handleSignOut}>Sair</ButtonSignOut>}
      </Container>
      {children}
    </>
  );
};

export default HeaderSignIn;
