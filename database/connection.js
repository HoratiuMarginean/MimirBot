import Sequelize from "sequelize";
import config from "./config.js";
import { applyAssociations } from "./associations.js";

let connection = new Sequelize(config.development);

(async () => {
  const resolvedModules = await Promise.all([
    import ("./models/bundle.js")
  ]);
  for (const resolvedModule of resolvedModules)
  {
    resolvedModule.default(connection);
  }

  applyAssociations(connection);

  await connection.sync({ alter: true });

})().catch(err => {
  console.error("Error initializing the database: ", err);
});

export default connection;