import * as path from 'path';
import dotenv from 'dotenv';

dotenv.config();

const baseDir = path.join(__dirname, '../');
const entitiesPath = `${baseDir}${process.env.TYPEORM_ENTITIES}`;
const migrationsPath = `${baseDir}${process.env.TYPEORM_MIGRATIONS}`;

export const db1 = {
  name: process.env.DB1_NAME,
  type: process.env.DB1_CONNECTION,
  host: process.env.DB1_HOST,
  username: process.env.DB1_USERNAME,
  password: process.env.DB1_PASSWORD,
  database: process.env.DB1_DATABASE,
  sid: process.env.DB1_SID,
  // port: Number.parseInt(process.env.DB1_PORT, 10),
  synchronize: process.env.DB1_SYNCHRONIZE,
  entities: [entitiesPath],
  migrations: [migrationsPath],
  migrationsRun: process.env.DB1_MIGRATIONS_RUN === 'true',
  seeds: [`src/database/seeds/*.ts`],
  cli: {
    migrationsDir: 'src/database/migrations',
    entitiesDir: 'src/entities'
  }
};

export const db2 = {
  name: process.env.DB2_NAME,
  type: process.env.DB2_CONNECTION,
  host: process.env.DB2_HOST,
  username: process.env.DB2_USERNAME,
  password: process.env.DB2_PASSWORD,
  database: process.env.DB2_DATABASE,
  // port: Number.parseInt(process.env.DB2_PORT, 10),
  synchronize: process.env.DB2_SYNCHRONIZE,
  entities: [entitiesPath],
  migrations: [migrationsPath],
  migrationsRun: process.env.DB2_MIGRATIONS_RUN === 'true',
  seeds: [`src/database/seeds/*.ts`],
  cli: {
    migrationsDir: 'src/database/migrations',
    entitiesDir: 'src/entities'
  }
};
