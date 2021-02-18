export interface IData {
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

const formatString = (data: IData[]): IData[] => {
  return data.map((item: IData) => {
    return {
      MES: item.MES,
      ANO: item.ANO,
      DATA: item.DATA.trim(),
      CODUNIDADE: item.CODUNIDADE,
      CODCENTROCUSTO: item.CODCENTROCUSTO.trim(),
      DESCCODCENTROCUSTO: item.DESCCODCENTROCUSTO.trim(),
      CODCONTACONTABIL: item.CODCONTACONTABIL.trim(),
      DESCCONTACONTABIL: item.DESCCONTACONTABIL.trim(),
      NATUREZA: item.NATUREZA.trim(),
      VALOR: item.VALOR,
      HISTORICO: item.HISTORICO.trim()
    };
  });
};

export default formatString;
