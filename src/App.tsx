import { ToastProvider } from 'react-toast-notifications';
import { ThemeProvider } from 'styled-components';

import { AuthProvider } from './hooks/auth';
import Routes from './routes';

import GlobalStyles from './styles/global';
import theme from './styles/theme';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <AuthProvider>
        <ToastProvider placement="bottom-right">
          <Routes />
        </ToastProvider>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
