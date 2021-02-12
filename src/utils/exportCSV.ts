import { ExportToCsv } from 'export-to-csv';
import fs from 'fs';

const exportCSV = (
  headerName: string,
  headerMonth: string,
  headerYear: string,
  data: string[]
): void => {
  const options = {
    fieldSeparator: ';',
    quoteStrings: '"',
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
    date.getDate() + ' ' + months[date.getMonth()] + ' ' + date.getFullYear();
  // ' ' +
  // date.getHours() +
  // '-' +
  // date.getMinutes() +
  // '-' +
  // date.getSeconds();

  const csvData = csvExporter.generateCsv(data, true);
  fs.writeFileSync(`data/${dateFormated}.csv`, csvData);
};

export default exportCSV;
