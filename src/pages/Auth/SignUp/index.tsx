import React, { FormEvent, ReactElement, useState } from 'react';
import { useHistory } from 'react-router-dom';

import api from '../../../services/api';

import {
  GlobalStyle,
  Form,
  Text,
  Input,
  Button,
  RegisterLink,
  Error
} from './styles';

const SignUp: React.FC = (): ReactElement => {
  const history = useHistory();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [error, setError] = useState('');

  async function handleSignUp(e: FormEvent) {
    e.preventDefault();

    if (!email || !password || !passwordConfirmation) {
      setError('Preencha todos os dados para se cadastrar');
    } else {
      try {
        await api.post('/api/user/create', {
          email,
          password,
          passwordConfirmation
        });
        history.push('/');
      } catch (error) {
        console.log(error);
        setError('Ocorreu um erro ao registrar sua conta');
      }
    }
  }

  return (
    <>
      <GlobalStyle />
      <Form onSubmit={handleSignUp}>
        <Text>Criar conta</Text>
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
        <Input
          type="password"
          placeholder="Repita a senha"
          value={passwordConfirmation}
          onChange={(e) => setPasswordConfirmation(e.target.value)}
        />
        <Button type="submit">Login</Button>
        <RegisterLink to="/">Fazer login</RegisterLink>
      </Form>
    </>
    // <Container>
    //   <PSignIn>Sign up</PSignIn>
    //   <Form onSubmit={handleSignUp}>
    //     {error && <p>{error}</p>}
    //     <Input
    //       type="email"
    //       placeholder="E-mail"
    //       value={email}
    //       onChange={(e) => setEmail(e.target.value)}
    //     />
    //     <Input
    //       type="password"
    //       placeholder="Senha"
    //       value={password}
    //       onChange={(e) => setPassword(e.target.value)}
    //     />
    //     <Input
    //       type="password"
    //       placeholder="Repita a senha"
    //       value={passwordConfirmation}
    //       onChange={(e) => setPasswordConfirmation(e.target.value)}
    //     />
    //     <Button type="submit">Registrar</Button>
    //     <PForgotPassword>
    //       <Link to="/">Fazer login</Link>
    //     </PForgotPassword>
    //   </Form>
    // </Container>
  );
};

export default SignUp;
