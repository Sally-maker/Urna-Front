import 'styled-components';

import schema from './theme';

type Theme = typeof schema;

declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
}
