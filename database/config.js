import 'dotenv/config';
import mariadb from 'mariadb';

const development = {
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  port: process.env.DB_HOST_PORT,
  dialect: 'mariadb',
  dialectModule: mariadb,
  define: {
    freezeTableName: true
  },
  timezone: '+03:00'
}

export default { development };