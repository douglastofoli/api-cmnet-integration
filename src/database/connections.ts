import 'reflect-metadata';
import { createConnection } from 'typeorm';

createConnection(String(process.env.DB1_NAME)) // conecta na base oracle
  .then(() => {
    console.log('Database OracleDB connected with success!');
  })
  .catch((error) => {
    console.error(error);
  });

createConnection(String(process.env.DB2_NAME)) // conecta na base postgres
  .then(() => {
    console.log('Database PostgreSQL connected with success!');
  })
  .catch((error) => {
    console.error(error);
  });
