import { createGlobalStyle } from 'styled-components';

import '@fortawesome/react-fontawesome';

const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    --moz-box-sizing: border-box;
    box-sizing: border-box;
  }
`;

export default GlobalStyles;
