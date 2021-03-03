import styled, { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  @import url(https://fonts.googleapis.com/css?family=Open+Sans:300,400,700);
  
  body {
    font-family: 'Open Sans', sans-serif;
    font-weight: 300;
    line-height: 1.42em;
    color:#A7A1AE;
    background-color:#1F2739;
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
  text-align: left;
  color: #185875;

  padding-bottom: 2%;
  padding-top: 2%;
  padding-left: 2%;

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
  padding-left: 2%;

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
// export const Table = styled.table`
//   font-family: Arial, Helvetica, sans-serif;
//   border-collapse: collapse;
//   font-size: 14px;
//   width: 100%;

//   & text-decoration,
//   & th {
//     border: 1px solid #ddd;
//     padding: 8px;
//   }

//   & tr:nth-child(even) {
//     background-color: #f2f2f2;
//   }

//   & tr:hover {
//     background-color: #ddd;
//   }

//   & th {
//     padding-top: 12px;
//     padding-bottom: 12px;
//     text-align: left;
//     background-color: #4caf50;
//     color: white;
//   }
// `;
