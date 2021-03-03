import styled, { createGlobalStyle } from 'styled-components';
import { Link } from 'react-router-dom';

export const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-family: sans-serif;
    background: #455a64;
  }
`;

export const Form = styled.form`
  width: 380px;
  padding: 40px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #37474f;
  text-align: center;
  opacity: 0.6;
`;

export const Text = styled.h1`
  color: white;
  text-transform: uppercase;
  font-weight: 500;
`;

export const Input = styled.input`
  border: 0;
  background: none;
  display: block;
  margin: 20px auto;
  text-align: center;
  border: 2px solid #03a9f4;
  padding: 14px 10px;
  width: 200px;
  outline: none;
  color: white;
  border-radius: 24px;
  transition: 0.25s;

  &:focus {
    width: 280px;
    border-color: #8bc34a;
  }
`;

export const Button = styled.button`
  border: 0;
  background: none;
  display: block;
  margin: 20px auto;
  text-align: center;
  border: 2px solid #8bc34a;
  padding: 14px 40px;
  outline: none;
  color: white;
  border-radius: 24px;
  transition: 0.25s;
  cursor: pointer;

  &:hover {
    background: #8bc34a;
  }
`;

export const RegisterLink = styled(Link)`
  color: white;
  text-transform: uppercase;
  font-weight: 300;
  font-size: 14px;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

export const Error = styled.p`
  color: white;
  padding-top: 10px;
  text-transform: uppercase;
  font-weight: 300;
  font-style: italic;
  font-size: 14px;
  text-decoration: none;
`;
