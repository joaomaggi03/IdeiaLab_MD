import 'dotenv/config';
import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize(process.env.DB_NAME || 'ideialab_md', process.env.DB_USER || 'postgres', process.env.DB_PASSWORD || '', {
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT || 5432),
  dialect: 'postgres',
  logging: false,
  define: { underscored: true },
});
