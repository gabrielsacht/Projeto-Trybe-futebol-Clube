import { STRING, INTEGER, Model } from 'sequelize';
import db from './index';

class User extends Model {
  declare id: number;
  declare userName: string;
  declare role: string;
  declare email: string;
  declare password: string;
}

User.init({
  id: {
    type: INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  userName: {
    type: STRING,
    allowNull: false,
    field: 'username',
  },
  role: {
    type: STRING,
    allowNull: false,
  },
  email: {
    type: STRING,
    allowNull: false,
  },
  password: {
    type: STRING,
    allowNull: false,
  },

}, {
  sequelize: db,
  modelName: 'user',
  underscored: true,
  timestamps: false,
});

export default User;
