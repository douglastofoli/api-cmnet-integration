import React, { ReactElement } from 'react';

import GlobalStyles from './styles/global';

import Routes from './routes';

const App: React.FC = (): ReactElement => {
  return (
    <>
      <GlobalStyles />
      <Routes />
    </>
  );
};

export default App;
