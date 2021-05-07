import dotenv from 'dotenv';

dotenv.config();

module.exports = [
  {
    name: process.env.DB1_NAME,
    type: process.env.DB1_TYPE,
    host: process.env.DB1_HOST,
    port: Number(process.env.DB1_PORT),
    username: process.env.DB1_USERNAME,
    password: process.env.DB1_PASSWORD,
    database: process.env.DB1_DATABASE,
    synchronize: process.env.DB1_SYNCHRONIZE,
    logging: process.env.DB1_LOGGING,
    entities: ['src/entities/postgres/**/*.ts'],
    migrations: ['src/database/migrations/postgres/**/*.ts'],
    cli: {
      entitiesDir: 'src/entities/postgres',
      migrationsDir: 'src/database/migrations/postgres'
    }
  },
  {
    name: process.env.DB2_NAME,
    type: process.env.DB2_TYPE,
    host: process.env.DB2_HOST,
    port: Number(process.env.DB2_PORT),
    username: process.env.DB2_USERNAME,
    password: process.env.DB2_PASSWORD,
    database: process.env.DB2_DATABASE,
    sid: process.env.DB2_SID,
    synchronize: process.env.DB2_SYNCHRONIZE,
    logging: process.env.DB2_LOGGING,
    entities: ['src/entities/cm/**/*.ts'],
    migrations: ['src/database/migrations/cm/**/*.ts'],
    cli: {
      entitiesDir: 'src/entities/cm',
      migrationsDir: 'src/database/migrations/cm'
    }
  },
  {
    name: process.env.DB3_NAME,
    type: process.env.DB3_TYPE,
    host: process.env.DB3_HOST,
    port: Number(process.env.DB3_PORT),
    username: process.env.DB3_USERNAME,
    password: process.env.DB3_PASSWORD,
    database: process.env.DB3_DATABASE,
    sid: process.env.DB3_SID,
    synchronize: process.env.DB3_SYNCHRONIZE,
    logging: process.env.DB3_LOGGING,
    entities: ['src/entities/esolution/**/*.ts'],
    migrations: ['src/database/migrations/esolution/**/*.ts'],
    cli: {
      entitiesDir: 'src/entities/esolution',
      migrationsDir: 'src/database/migrations/esolution'
    }
  },
  {
    name: process.env.DB4_NAME,
    type: process.env.DB4_TYPE,
    host: process.env.DB4_HOST,
    port: Number(process.env.DB4_PORT),
    username: process.env.DB4_USERNAME,
    password: process.env.DB4_PASSWORD,
    database: process.env.DB4_DATABASE,
    synchronize: process.env.DB4_SYNCHRONIZE,
    logging: process.env.DB4_LOGGING,
    entities: ['src/entities/mssql_esolution/**/*.ts'],
    migrations: ['src/database/migrations/mssql_esolution/**/*.ts'],
    cli: {
      entitiesDir: 'src/entities/mssql_esolution',
      migrationsDir: 'src/database/migrations/mssql_esolution'
    }
  }
];
