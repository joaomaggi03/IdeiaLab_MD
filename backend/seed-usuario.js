
import 'dotenv/config';
import bcrypt from 'bcryptjs';
import { sequelize } from './src/config/database.js';

try {
  await sequelize.authenticate();

  const senhaHash = await bcrypt.hash('Teste123!', 12);

  await sequelize.query(`
    INSERT INTO usuarios (nome, email, senha_hash, perfil, ativo)
    VALUES (
      'Usuário de Teste',
      'teste@ideialab.local',
      :senhaHash,
      'membro',
      true
    )
    ON CONFLICT (email)
    DO UPDATE SET
      senha_hash = EXCLUDED.senha_hash,
      ativo = true,
      updated_at = NOW()
  `, {
    replacements: { senhaHash }
  });

  console.log('Usuário de teste criado/atualizado!');
  console.log('E-mail: teste@ideialab.local');
  console.log('Senha: Teste123!');
} catch (erro) {
  console.error('Erro:', erro.message);
} finally {
  await sequelize.close();
}
