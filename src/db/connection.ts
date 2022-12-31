import 'dotenv/config';
import mysql, { Connection, ConnectionOptions } from 'mysql2';

const connection = (): Connection => {
  const config: ConnectionOptions = {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT) || 3306,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
  };
  return mysql.createConnection(config);
};

export default connection;
