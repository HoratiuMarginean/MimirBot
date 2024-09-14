import "dotenv/config";

const config = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_HOST_PORT,
    dialect: process.env.DB_DIALECT,
    timezone: process.env.DB_TIMEZONE,
    define: {
      freezeTableName: true,
      timestamps: false
    }
  }
};

export default config;