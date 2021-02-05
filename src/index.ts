import express from 'express';
import cors from 'cors';

import './database/connections'; // connect databases oracle and postgres

import routes from './routes';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use('/api', routes); // set endpoint /api

app.listen(process.env.HTTP_PORT, () => {
  console.log(`Server started on port ${process.env.HTTP_PORT}`);
});
