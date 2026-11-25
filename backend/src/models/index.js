// Contrato provisório de entidades: validar com Rafael antes de substituir/mesclar modelos.
import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

export const Usuario = sequelize.define('Usuario', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  nome: { type: DataTypes.STRING(150), allowNull: false },
  email: { type: DataTypes.STRING(200), allowNull: false, unique: true },
  senhaHash: { type: DataTypes.STRING(255), allowNull: false, field: 'senha_hash' },
  perfil: { type: DataTypes.ENUM('admin', 'membro'), allowNull: false, defaultValue: 'membro' },
  ativo: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
}, { tableName: 'usuarios' });

export const Categoria = sequelize.define('Categoria', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  nome: { type: DataTypes.STRING(100), allowNull: false, unique: true },
  descricao: { type: DataTypes.TEXT },
}, { tableName: 'categorias' });

export const Ideia = sequelize.define('Ideia', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  titulo: { type: DataTypes.STRING(200), allowNull: false },
  descricao: { type: DataTypes.TEXT, allowNull: false },
  publicoAlvo: { type: DataTypes.STRING(120), allowNull: false, field: 'publico_alvo' },
  status: { type: DataTypes.ENUM('Em análise', 'Aprovada', 'Em execução', 'Concluída'), allowNull: false, defaultValue: 'Em análise' },
  excluida: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
}, { tableName: 'ideias' });

export const Voto = sequelize.define('Voto', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
}, { tableName: 'votos', indexes: [{ unique: true, fields: ['usuario_id', 'ideia_id'] }] });

export const Comentario = sequelize.define('Comentario', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  texto: { type: DataTypes.TEXT, allowNull: false },
}, { tableName: 'comentarios' });

Usuario.hasMany(Ideia, { foreignKey: { name: 'autoraId', field: 'autora_id', allowNull: false }, as: 'ideias' });
Ideia.belongsTo(Usuario, { foreignKey: { name: 'autoraId', field: 'autora_id', allowNull: false }, as: 'autora' });
Categoria.hasMany(Ideia, { foreignKey: { name: 'categoriaId', field: 'categoria_id', allowNull: false }, as: 'ideias' });
Ideia.belongsTo(Categoria, { foreignKey: { name: 'categoriaId', field: 'categoria_id', allowNull: false }, as: 'categoria' });
Usuario.hasMany(Voto, { foreignKey: { name: 'usuarioId', field: 'usuario_id', allowNull: false } });
Voto.belongsTo(Usuario, { foreignKey: { name: 'usuarioId', field: 'usuario_id', allowNull: false }, as: 'usuario' });
Ideia.hasMany(Voto, { foreignKey: { name: 'ideiaId', field: 'ideia_id', allowNull: false }, as: 'votos' });
Voto.belongsTo(Ideia, { foreignKey: { name: 'ideiaId', field: 'ideia_id', allowNull: false }, as: 'ideia' });
Usuario.hasMany(Comentario, { foreignKey: { name: 'usuarioId', field: 'usuario_id', allowNull: false } });
Comentario.belongsTo(Usuario, { foreignKey: { name: 'usuarioId', field: 'usuario_id', allowNull: false }, as: 'usuario' });
Ideia.hasMany(Comentario, { foreignKey: { name: 'ideiaId', field: 'ideia_id', allowNull: false }, as: 'comentarios' });
Comentario.belongsTo(Ideia, { foreignKey: { name: 'ideiaId', field: 'ideia_id', allowNull: false }, as: 'ideia' });
