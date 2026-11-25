// Inicialização controlada da primeira conta administrativa.
// No terminal, defina ADMIN_NOME, ADMIN_EMAIL e ADMIN_PASSWORD antes de executar.
import 'dotenv/config';
import bcrypt from 'bcryptjs';
import { sequelize } from '../src/config/database.js';
import { Usuario } from '../src/models/index.js';

const nome = String(process.env.ADMIN_NOME || '').trim();
const email = String(process.env.ADMIN_EMAIL || '').trim().toLowerCase();
const senha = process.env.ADMIN_PASSWORD || '';

if (!nome || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || senha.length < 8 || senha.length > 72) {
  console.error('Configure ADMIN_NOME, ADMIN_EMAIL e ADMIN_PASSWORD (8 a 72 caracteres).');
  process.exit(1);
}

try {
  await sequelize.authenticate();
  const senhaHash = await bcrypt.hash(senha, 12);
  const existente = await Usuario.findOne({ where: { email } });
  if (existente) {
    await existente.update({ nome, perfil: 'admin', ativo: true, senhaHash });
    console.log(`Conta administrativa atualizada: ${email}`);
  } else {
    await Usuario.create({ nome, email, perfil: 'admin', ativo: true, senhaHash });
    console.log(`Conta administrativa criada: ${email}`);
  }
} catch (erro) {
  console.error('Não foi possível criar o administrador:', erro.message);
  process.exitCode = 1;
} finally {
  await sequelize.close();
}
