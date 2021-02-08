import 'reflect-metadata';
import { createConnection } from 'typeorm';
import dotenv from 'dotenv';

dotenv.config();

createConnection(String(process.env.DB1_NAME));
createConnection(String(process.env.DB2_NAME));
