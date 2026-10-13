import 'dotenv/config';
import { app } from './app.js';
import { sequelize } from './config/database.js';
import './models/index.js';

const porta = Number(process.env.PORT || 3001);
if (!process.env.JWT_SECRET || process.env.JWT_SECRET.length < 32) {
  console.error('Defina JWT_SECRET com pelo menos 32 caracteres no .env.');
  process.exit(1);
}
try {
  await sequelize.authenticate();
  // Nunca usar alter/force automaticamente: evita modificar tabelas existentes de Rafael.
  if (process.env.DB_SYNC === 'true' && process.env.NODE_ENV !== 'production') {
    await sequelize.sync();
    console.warn('DB_SYNC ativado: tabelas ausentes foram criadas para testes locais.');
  }
  app.listen(porta,()=>console.log(`IdeiaLab MD API em http://localhost:${porta}/api/health`));
} catch (erro) { console.error('Falha ao conectar com o PostgreSQL:',erro.message);process.exit(1); }
