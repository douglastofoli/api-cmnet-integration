import styled, { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Roboto', sans-serif;
    font-weight: 300;
    line-height: 1.42em;
    color:#A7A1AE;
    background-color:#1F2739;
  }
`;

export const Text = styled.p`
  font-family: 'Roboto', sans-serif;
  font-weight: 700;
  font-size: 1em;
  text-align: center;
`;

export const Input = styled.input`
  font-size: 1rem;
  line-height: 1.2;
  padding: 10px 16px;
  border: 3px solid transparent;
  border-radius: 4px;
  text-align: center;
  margin-left: 10px;

  font-family: 'Roboto', sans-serif;
  font-weight: 300;
`;

export const Button = styled.button`
  font-family: 'Roboto', sans-serif;
  -webkit-appearance: none;
  font-size: 1rem;
  text-shadow: none;
  line-height: 1.2;
  display: inline-block;
  padding: 10px 16px;
  margin: 0 10px 0 0;
  position: relative;
  border-radius: 4px;
  border: 3px solid transparent;
  background: #444857;
  color: white;
  cursor: pointer;
  white-space: nowrap;
  text-overflow: ellipsis;
  text-decoration: none !important;
  text-align: center;
  font-weight: normal !important;
  margin: 10px;
  transition: 0.25s;

  &:hover {
    background: #60636d;
  }
`;

export const Table = styled.table`
  text-align: left;
  overflow: hidden;
  width: 90%;
  margin: 0 auto;
  display: table;
  padding: 0 0 8em 0;
`;

export const Caption = styled.caption`
  font-family: 'Roboto', sans-serif;
  font-weight: 700;
  font-size: 1em;
  text-align: center;
`;

export const Tr = styled.tr`
  &:nth-child(odd) {
    background-color: #323c50;
  }

  &:nth-child(even) {
    background-color: #2c3446;
  }

  &:hover {
    background-color: #464a52;
    -webkit-box-shadow: 0 6px 6px -6px #0e1119;
    -moz-box-shadow: 0 6px 6px -6px #0e1119;
    box-shadow: 0 6px 6px -6px #0e1119;
  }
`;

export const Th = styled.th`
  font-weight: bold;
  font-size: 1em;
  text-align: center;
  color: #185875;

  padding-bottom: 2%;
  padding-top: 2%;

  background-color: #1f2739;

  @media (max-width: 800px) {
    &:nth-child(4) {
      display: none;
    }
  }
`;

export const Td = styled.td`
  font-weight: normal;
  font-size: 1em;
  -webkit-box-shadow: 0 2px 2px -2px #0e1119;
  -moz-box-shadow: 0 2px 2px -2px #0e1119;
  box-shadow: 0 2px 2px -2px #0e1119;

  padding-bottom: 2%;
  padding-top: 2%;
  /* padding-left: 2%; */
  text-align: center;
  &:first-child {
    color: #fb667a;
  }

  &:hover {
    background-color: #fff842;
    color: #403e10;
    font-weight: bold;

    box-shadow: #7f7c21 -1px 1px, #7f7c21 -2px 2px, #7f7c21 -3px 3px,
      #7f7c21 -4px 4px, #7f7c21 -5px 5px, #7f7c21 -6px 6px;
    transform: translate3d(6px, -6px, 0);

    transition-delay: 0s;
    transition-duration: 0.4s;
    transition-property: all;
    transition-timing-function: line;
  }

  @media (max-width: 800px) {
    &:nth-child(4) {
      display: none;
    }
  }
`;
