export interface IData {
  MES: number;
  ANO: number;
  DATADOC: string;
  CODUNIDADE: number;
  CODCENTROCUSTO: string;
  NOME: string;
  NATUREZA: string;
  VALOR: number;
  HISTORICO: string;
  PLANOCONTA: string;
  PLANONOME: string;
}

const formatString = (data: IData[]): IData[] => {
  return data.map((item: IData) => {
    return {
      MES: item.MES,
      ANO: item.ANO,
      DATADOC: item.DATADOC.trim(),
      CODUNIDADE: item.CODUNIDADE,
      CODCENTROCUSTO: item.CODCENTROCUSTO.trim(),
      NOME: item.NOME.trim(),
      NATUREZA: item.NATUREZA.trim(),
      VALOR: item.VALOR,
      HISTORICO: item.HISTORICO.trim(),
      PLANOCONTA: item.PLANOCONTA.trim(),
      PLANONOME: item.PLANONOME.trim()
    };
  });
};

export default formatString;
