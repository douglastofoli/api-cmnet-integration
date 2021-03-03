import React, { ReactElement } from 'react';

import { ClassLoader, Container } from './styles';

const Loader: React.FC = (): ReactElement => {
  return (
    <Container>
      <ClassLoader />
    </Container>
  );
};

export default Loader;
