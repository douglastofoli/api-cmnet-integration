import 'reflect-metadata';
import { createConnection } from 'typeorm';
import dotenv from 'dotenv';

dotenv.config();

createConnection(String(process.env.DB1_NAME)) // conecta na base postgres api
  .then(() => {
    console.log(`Database ${process.env.DB1_NAME} connected with success!`);
  })
  .catch((error) => {
    console.error(error);
  });

createConnection(String(process.env.DB2_NAME)) // conecta na base cm
  .then(() => {
    console.log(`Database ${process.env.DB2_NAME} connected with success!`);
  })
  .catch((error) => {
    console.error(error);
  });

createConnection(String(process.env.DB3_NAME)) // conecta na base esolution
  .then(() => {
    console.log(`Database ${process.env.DB3_NAME} connected with success!`);
  })
  .catch((error) => {
    console.error(error);
  });
