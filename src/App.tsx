import React, { ReactElement } from 'react';
import { Helmet } from 'react-helmet';

import GlobalStyles from './styles/global';

import Routes from './routes';

const App: React.FC = (): ReactElement => {
  return (
    <>
      <Helmet>
        <title>Dashboard</title>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;500;700&display=swap"
          rel="stylesheet"
        />
      </Helmet>
      <GlobalStyles />
      <Routes />
    </>
  );
};

export default App;
