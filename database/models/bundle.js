import { Model, DataTypes } from 'sequelize';

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
    expiration_timestamp:
    {
      type: DataTypes.TEXT,
      allowNull: false
    },
    store_name:
    {
      type: DataTypes.TEXT,
      allowNull: false
    },
    id_message:
    {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
    sequelize: connection,
    timestamps: false
  });
};