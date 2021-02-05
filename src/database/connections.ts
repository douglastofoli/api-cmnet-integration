import 'reflect-metadata';
import { createConnection } from 'typeorm';

createConnection('oracledb');
createConnection('postgresdb');
