import 'dotenv/config';
import { sequelize } from './src/config/database.js';

console.log('Banco:', process.env.DB_NAME);
console.log('Usuário:', process.env.DB_USER);
console.log('Senha carregada:', Boolean(process.env.DB_PASSWORD));
console.log('Tipo da senha:', typeof process.env.DB_PASSWORD);

try {
  await sequelize.authenticate();
  console.log('Conexão com PostgreSQL estabelecida!');

  const [resultados] = await sequelize.query(
    'SELECT * FROM categorias'
  );

  console.table(resultados);
} catch (erro) {
  console.error('Erro:', erro.message);
} finally {
  await sequelize.close();
}