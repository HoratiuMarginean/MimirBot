import { Model, DataTypes } from "sequelize";

export default (connection) => {
  class bundle extends Model {}

  bundle.init({
    id:
    {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    name:
    {
      type: DataTypes.TEXT,
      allowNull: false
    },
    link:
    {
      type: DataTypes.TEXT,
      allowNull: false
    },
    price:
    {
      type: DataTypes.TEXT,
      allowNull: false
    },
    store:
    {
      type: DataTypes.TEXT,
      allowNull: false
    },
    contents:
    {
      type: DataTypes.TEXT,
      allowNull: false
    },
    expiration_timestamp:
    {
      type: DataTypes.TEXT,
      allowNull: false
    },
    is_removed:
    {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    id_message:
    {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
    sequelize: connection
  });
};