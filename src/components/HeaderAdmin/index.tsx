import { ReactNode, useCallback } from 'react';

import { ImageLogo } from '~/assets/images';
import { useAuth } from '~/hooks/auth';

import { Container, Link, LinkContainer } from './styles';

interface HeaderAdminProps {
  children: ReactNode;
}

const HeaderAdmin = ({ children }: HeaderAdminProps) => {
  const { signOut } = useAuth();

  const handleSignOut = useCallback(() => {
    signOut();
  }, [signOut]);

  return (
    <>
      <Container>
        <div>
          <img src={ImageLogo} alt="Logo" />
        </div>

        <LinkContainer>
          <Link to="/dashboard">Início</Link>
          <Link to="/apuracao">Apuração</Link>
          <Link to="/usuarios/cadastrar">Cadastrar usuário</Link>
          <Link to="/candidatos">Candidatos</Link>
          <Link to="/" onClick={handleSignOut}>
            Sair
          </Link>
        </LinkContainer>
      </Container>
      {children}
    </>
  );
};

export default HeaderAdmin;
