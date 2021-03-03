import { createGlobalStyle } from 'styled-components';

import '@fortawesome/react-fontawesome';

const GlobalStyles = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Rokkitt');
  @import url('https://fonts.googleapis.com/css?family=Open+Sans:400italic,400,700');
  @import url('https://fonts.googleapis.com/css?family=Roboto+Slab:700,400');
  @import url('https://fonts.googleapis.com/css?family=Lobster');

  * {
    margin: 0;
    padding: 0;
    --moz-box-sizing: border-box;
    box-sizing: border-box;
  }
`;

export default GlobalStyles;
