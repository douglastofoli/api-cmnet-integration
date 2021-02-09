import dotenv from 'dotenv';

dotenv.config();

module.exports = [
  {
    name: process.env.DB1_NAME,
    type: process.env.DB1_TYPE,
    host: process.env.DB1_HOST,
    port: process.env.DB1_PORT,
    username: process.env.DB1_USERNAME,
    password: process.env.DB1_PASSWORD,
    database: process.env.DB1_DATABASE,
    sid: process.env.DB1_SID,
    synchronize: process.env.DB1_SYNCHRONIZE,
    logging: process.env.DB1_LOGGING,
    entities: ['src/entities/oracle/**/*.ts'],
    migrations: ['src/database/migrations/oracle/**/*.ts'],
    cli: {
      entitiesDir: 'src/entities/oracle',
      migrationsDir: 'src/database/migrations/oracle'
    }
  },
  {
    name: process.env.DB2_NAME,
    type: process.env.DB2_TYPE,
    host: process.env.DB2_HOST,
    port: process.env.DB2_PORT,
    username: process.env.DB2_USERNAME,
    password: process.env.DB2_PASSWORD,
    database: process.env.DB2_DATABASE,
    synchronize: process.env.DB2_SYNCHRONIZE,
    logging: process.env.DB2_LOGGING,
    entities: ['src/entities/postgres/**/*.ts'],
    migrations: ['src/database/migrations/postgres/**/*.ts'],
    cli: {
      entitiesDir: 'src/entities/postgres',
      migrationsDir: 'src/database/migrations/postgres'
    }
  }
];
