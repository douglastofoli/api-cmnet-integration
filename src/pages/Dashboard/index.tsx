import React, { ReactElement, useState } from 'react';
import { useHistory } from 'react-router-dom';
import download from 'js-file-download';

import api from '../../services/api';
import { getToken, logout } from '../../services/auth';

import Loader from '../../components/Loader';

import { GlobalStyle, Table, Tr, Th, Td } from './styles';

interface IData {
  MES: number;
  ANO: number;
  DATA: string;
  CODUNIDADE: number;
  CODCENTROCUSTO: string;
  DESCCODCENTROCUSTO: string;
  CODCONTACONTABIL: string;
  DESCCONTACONTABIL: string;
  NATUREZA: string;
  VALOR: number;
  HISTORICO: string;
}

const Dashboard: React.FC = (): ReactElement => {
  const history = useHistory();

  const [data, setData] = useState<IData[]>([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const token = getToken();

  async function handleGetDRE() {
    try {
      const date1 = startDate.split('-');
      const date2 = endDate.split('-');

      setIsLoading(true);

      const response = await api.get('/api/mabuthermas/dre/get', {
        params: {
          diaInicial: date1[2],
          mesInicial: date1[1],
          anoInicial: date1[0],
          diaFinal: date2[2],
          mesFinal: date2[1],
          anoFinal: date2[0],
          mes: date1[1],
          ano: date1[0]
        },
        headers: { 'x-access-token': token }
      });

      setData(response.data.data);

      await api
        .get('/api/mabuthermas/dre/get/download', {
          headers: { 'x-access-token': token }
        })
        .then((response) => {
          download(
            response.data,
            `DRE_${date1[2]}_${date1[1]}_${date1[0]}-${date2[2]}_${date2[1]}_${date2[0]}.csv`
          );
        });
      setIsLoading(false);
    } catch (error) {
      setError('Sessão expirada!');
      console.log(error);
      logout();
      history.push('/');
    }
  }

  return (
    <>
      <GlobalStyle />
      <div>
        {error && <p>{error}</p>}
        <p>Gerar DRE MTR</p>
        <input
          type="date"
          required={true}
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <input
          type="date"
          required={true}
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
        <button onClick={handleGetDRE}>Gerar</button>
        {isLoading ? <Loader /> : ''}

        <br></br>

        <Table>
          {/* <caption>DRE</caption> */}
          <thead>
            <Tr>
              <Th>Nº</Th>
              <Th>MES</Th>
              <Th>ANO</Th>
              <Th>DATA</Th>
              <Th>COD UNIDADE</Th>
              <Th>COD CENTRO CUSTO</Th>
              <Th>DESC CENTRO CUSTO</Th>
              <Th>COD CONTA CONTAB</Th>
              <Th>DESC CONTA CONTAB</Th>
              <Th>NATUREZA</Th>
              <Th>VALOR</Th>
              <Th>HISTORICO</Th>
            </Tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <Tr key={index}>
                <Td>{index + 1}</Td>
                <Td>{item.MES}</Td>
                <Td>{item.ANO}</Td>
                <Td>{item.DATA}</Td>
                <Td>{item.CODUNIDADE}</Td>
                <Td>{item.CODCENTROCUSTO}</Td>
                <Td>{item.DESCCODCENTROCUSTO}</Td>
                <Td>{item.CODCONTACONTABIL}</Td>
                <Td>{item.DESCCONTACONTABIL}</Td>
                <Td>{item.NATUREZA}</Td>
                <Td>{item.VALOR}</Td>
                <Td>{item.HISTORICO}</Td>
              </Tr>
            ))}
          </tbody>
        </Table>
      </div>
    </>
  );
};

export default Dashboard;
