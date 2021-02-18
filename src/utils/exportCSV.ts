import { ExportToCsv } from 'export-to-csv';
import fs from 'fs';

import formatString from '../utils/formatString';

import { IData } from './formatString';

const exportCSV = (
  headerName: string,
  headerMonth: string,
  headerYear: string,
  data: IData[]
): IData[] => {
  const options = {
    fieldSeparator: ';',
    quoteStrings: '',
    decimalSeparator: '.',
    showLabels: true,
    showTitle: false,
    title: String(Date.now()),
    useTextFile: false,
    useBom: true,
    useKeysAsHeaders: false,
    headers: [`${headerName}|${headerMonth}|${headerYear}`]
  };

  const csvExporter = new ExportToCsv(options);

  const months = [
    'Jan',
    'Fev',
    'Mar',
    'Abr',
    'Mai',
    'Jun',
    'Jul',
    'Ago',
    'Set',
    'Out',
    'Nov',
    'Dez'
  ];
  const date = new Date();
  const dateFormated =
    date.getDate() +
    '_' +
    months[date.getMonth()] +
    '_' +
    date.getFullYear() +
    '_' +
    date.getHours() +
    '-' +
    date.getMinutes() +
    '-' +
    date.getSeconds();

  const formatedString = formatString(data);

  const csvData = csvExporter.generateCsv(formatedString, true);
  fs.writeFileSync(`data/${headerName}_${dateFormated}.csv`, csvData);

  return formatedString;
};

export default exportCSV;
