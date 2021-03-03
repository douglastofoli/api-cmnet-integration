import React, { FormEvent, ReactElement, useState } from 'react';
import { withRouter, useHistory } from 'react-router-dom';
import api from '../../../services/api';

import { login } from '../../../services/auth';

import {
  GlobalStyle,
  Form,
  Text,
  Input,
  Button,
  RegisterLink,
  Error
} from './styles';

const SignIn: React.FC = (): ReactElement => {
  const history = useHistory();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  async function handleSignIn(e: FormEvent) {
    e.preventDefault();

    if (!email || !password) {
      setError('Preencha e-mail e senha para continuar!');
    } else {
      try {
        const response = await api.post('/api/auth/login', { email, password });
        login(response.data.token);
        history.push('/dashboard');
      } catch (error) {
        console.log(error);
        setError('Houve um problema com o login. Verifique suas credenciais.');
      }
    }
  }

  return (
    <>
      <GlobalStyle />
      <Form onSubmit={handleSignIn}>
        <Text>Login</Text>
        {error && <Error>{error}</Error>}
        <Input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="submit">Login</Button>
        <RegisterLink to="/signup">Criar conta</RegisterLink>
      </Form>
    </>
  );
};

export default withRouter(SignIn);
