import { Router } from 'express';
import { Op, fn, col, literal } from 'sequelize';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import rateLimit from 'express-rate-limit';
import { Usuario, Categoria, Ideia, Voto, Comentario } from '../models/index.js';
import { autenticar, somenteAdmin } from '../middleware/auth.js';
import { httpError, textoObrigatorio, idValido, assertCampos } from '../utils/errors.js';
import { asyncHandler as ah } from '../utils/asyncHandler.js';

const router = Router();
const statuses = ['Em análise', 'Aprovada', 'Em execução', 'Concluída'];
const usuarioPublico = usuario => ({ id: usuario.id, nome: usuario.nome, email: usuario.email, perfil: usuario.perfil });
const ideiaInclusoes = [
  { model: Usuario, as: 'autora', attributes: ['id', 'nome'] },
  { model: Categoria, as: 'categoria', attributes: ['id', 'nome'] },
];
const buscarIdeia = async id => {
  const ideia = await Ideia.findOne({ where: { id: idValido(id), excluida: false } });
  if (!ideia) throw httpError(404, 'Ideia não encontrada.');
  return ideia;
};
const buscarCategoria = async id => {
  const categoria = await Categoria.findByPk(idValido(id));
  if (!categoria) throw httpError(404, 'Categoria não encontrada.');
  return categoria;
};
const apresentarIdeia = async ideia => {
  const i = await Ideia.findByPk(ideia.id, { include: ideiaInclusoes });
  const votos = await Voto.count({ where: { ideiaId: i.id } });
  return { ...i.toJSON(), codigo: `IDL-${String(i.id).padStart(4, '0')}`, votos };
};

// Cadastro cria SEMPRE perfil membro: elevação a admin somente por administrador existente.
router.post('/auth/cadastro', ah(async (req, res) => {
  assertCampos(req.body, ['nome','email','senha']);
  const nome = textoObrigatorio(req.body.nome, 'nome', 150);
  const email = textoObrigatorio(req.body.email, 'email', 200).toLowerCase();
  const senha = req.body.senha;
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) throw httpError(400, 'E-mail inválido.');
  if (typeof senha !== 'string' || senha.length < 8 || senha.length > 72) throw httpError(400, 'A senha deve ter entre 8 e 72 caracteres.');
  if (await Usuario.findOne({ where: { email } })) throw httpError(409, 'E-mail já cadastrado.');
  const usuario = await Usuario.create({ nome, email, senhaHash: await bcrypt.hash(senha, 12), perfil: 'membro' });
  res.status(201).json(usuarioPublico(usuario));
}));
const loginLimiter = rateLimit({ windowMs: 15 * 60 * 1000, limit: 20, standardHeaders: 'draft-7', legacyHeaders: false });
router.post('/auth/login', loginLimiter, ah(async (req, res) => {
  assertCampos(req.body, ['email','senha']);
  const email = textoObrigatorio(req.body.email, 'email', 200).toLowerCase();
  const senha = typeof req.body.senha === 'string' ? req.body.senha : '';
  const usuario = await Usuario.findOne({ where: { email, ativo: true } });
  if (!usuario || !(await bcrypt.compare(senha, usuario.senhaHash))) throw httpError(401, 'E-mail ou senha incorretos.');
  res.json({ token: jwt.sign({}, process.env.JWT_SECRET, { algorithm: 'HS256', subject: String(usuario.id), expiresIn: '8h' }), usuario: usuarioPublico(usuario) });
}));
router.get('/usuarios/me', autenticar, (req, res) => res.json(usuarioPublico(req.usuario)));
router.put('/usuarios/me', autenticar, ah(async (req, res) => {
  assertCampos(req.body, ['nome','email','senhaAtual','novaSenha']);
  const dados = {};
  if (req.body.nome !== undefined) dados.nome = textoObrigatorio(req.body.nome, 'nome', 150);
  if (req.body.email !== undefined) {
    dados.email = textoObrigatorio(req.body.email, 'email', 200).toLowerCase();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(dados.email)) throw httpError(400,'E-mail inválido.');
  }
  if (req.body.novaSenha !== undefined) {
    if (!req.body.senhaAtual || !(await bcrypt.compare(req.body.senhaAtual, req.usuario.senhaHash))) throw httpError(403, 'Senha atual incorreta.');
    if (typeof req.body.novaSenha !== 'string' || req.body.novaSenha.length < 8 || req.body.novaSenha.length > 72) throw httpError(400, 'Nova senha inválida.');
    dados.senhaHash = await bcrypt.hash(req.body.novaSenha, 12);
  }
  await req.usuario.update(dados);
  res.json(usuarioPublico(req.usuario));
}));
router.get('/usuarios', autenticar, somenteAdmin, ah(async (req, res) => res.json((await Usuario.findAll({ attributes: ['id','nome','email','perfil','ativo'], order: [['id','ASC']] })))));
router.put('/usuarios/:id', autenticar, somenteAdmin, ah(async (req, res) => {
  assertCampos(req.body, ['perfil','ativo']);
  const u = await Usuario.findByPk(idValido(req.params.id));
  if (!u) throw httpError(404, 'Usuária não encontrada.');
  if (req.body.perfil !== undefined && !['admin', 'membro'].includes(req.body.perfil)) throw httpError(400, 'Perfil inválido.');
  if (req.body.ativo !== undefined && typeof req.body.ativo !== 'boolean') throw httpError(400,'Ativo precisa ser booleano.');
  if (u.id === req.usuario.id && ((req.body.perfil && req.body.perfil !== 'admin') || req.body.ativo === false)) throw httpError(400, 'Você não pode retirar seu próprio acesso administrativo.');
  await u.update({ ...(req.body.perfil !== undefined ? { perfil: req.body.perfil } : {}), ...(req.body.ativo !== undefined ? { ativo: req.body.ativo } : {}) });
  res.json({ ...usuarioPublico(u), ativo: u.ativo });
}));

router.get('/categorias', autenticar, ah(async (req,res) => res.json(await Categoria.findAll({ order: [['nome','ASC']] }))));
router.get('/categorias/:id', autenticar, ah(async (req,res) => res.json(await buscarCategoria(req.params.id))));
router.post('/categorias', autenticar, somenteAdmin, ah(async (req,res) => {
  assertCampos(req.body, ['nome','descricao']);
  const c = await Categoria.create({ nome: textoObrigatorio(req.body.nome,'nome',100), descricao: req.body.descricao == null ? null : textoObrigatorio(req.body.descricao,'descricao') });
  res.status(201).json(c);
}));
router.put('/categorias/:id', autenticar, somenteAdmin, ah(async (req,res) => {
  assertCampos(req.body,['nome','descricao']);
  const c = await buscarCategoria(req.params.id);
  const dados = {};
  if (req.body.nome !== undefined) dados.nome = textoObrigatorio(req.body.nome,'nome',100);
  if (req.body.descricao !== undefined) dados.descricao = req.body.descricao === null ? null : textoObrigatorio(req.body.descricao,'descricao');
  await c.update(dados); res.json(c);
}));
router.delete('/categorias/:id', autenticar, somenteAdmin, ah(async (req,res) => {
  const c = await buscarCategoria(req.params.id);
  if (await Ideia.count({ where: { categoriaId:c.id, excluida:false } })) throw httpError(409,'Categoria vinculada a ideias ativas.');
  await c.destroy(); res.status(204).end();
}));

router.get('/ideias', autenticar, ah(async (req,res) => {
  const { categoriaId, status, busca, ordenar } = req.query;
  const where = { excluida: false };
  if (categoriaId !== undefined) where.categoriaId = idValido(categoriaId);
  if (status !== undefined) { if (!statuses.includes(status)) throw httpError(400,'Status inválido.'); where.status = status; }
  if (busca !== undefined) where.titulo = { [Op.iLike]: `%${String(busca).slice(0,100)}%` };
  const ideias = await Ideia.findAll({ where, include: ideiaInclusoes, order: [['createdAt','DESC']], limit: 100 });
  const resultado = await Promise.all(ideias.map(apresentarIdeia));
  if (ordenar === 'votos') resultado.sort((a,b)=>b.votos-a.votos || b.id-a.id);
  res.json(resultado);
}));
router.get('/ideias/ranking', autenticar, ah(async (req,res) => {
  const ideias = await Ideia.findAll({ where: { excluida: false }, include: ideiaInclusoes });
  const lista = await Promise.all(ideias.map(apresentarIdeia));
  res.json(lista.sort((a,b)=>b.votos-a.votos || b.id-a.id).slice(0,100));
}));
router.get('/ideias/:id', autenticar, ah(async (req,res) => res.json(await apresentarIdeia(await buscarIdeia(req.params.id)))));
router.post('/ideias', autenticar, ah(async (req,res) => {
  assertCampos(req.body, ['titulo','descricao','publicoAlvo','categoriaId']);
  const categoria = await buscarCategoria(req.body.categoriaId);
  const i = await Ideia.create({ titulo: textoObrigatorio(req.body.titulo,'titulo',200), descricao: textoObrigatorio(req.body.descricao,'descricao'), publicoAlvo: textoObrigatorio(req.body.publicoAlvo,'publicoAlvo',120), categoriaId: categoria.id, autoraId: req.usuario.id });
  res.status(201).json(await apresentarIdeia(i));
}));
router.put('/ideias/:id', autenticar, ah(async (req,res) => {
  assertCampos(req.body, ['titulo','descricao','publicoAlvo','categoriaId','status']);
  const i = await buscarIdeia(req.params.id);
  if (i.autoraId !== req.usuario.id && req.usuario.perfil !== 'admin') throw httpError(403,'Somente a autora ou a administração pode alterar esta ideia.');
  if (req.body.status !== undefined && req.usuario.perfil !== 'admin') throw httpError(403,'Somente administradores podem alterar o status.');
  const dados={};
  for (const [k,max] of [['titulo',200],['descricao',10000],['publicoAlvo',120]]) if (req.body[k]!==undefined) dados[k]=textoObrigatorio(req.body[k],k,max);
  if (req.body.categoriaId !== undefined) dados.categoriaId = (await buscarCategoria(req.body.categoriaId)).id;
  if (req.body.status !== undefined) { if (!statuses.includes(req.body.status)) throw httpError(400,'Status inválido.'); dados.status=req.body.status; }
  await i.update(dados); res.json(await apresentarIdeia(i));
}));
router.delete('/ideias/:id', autenticar, ah(async (req,res) => {
  const i = await buscarIdeia(req.params.id);
  if (i.autoraId !== req.usuario.id && req.usuario.perfil !== 'admin') throw httpError(403,'Sem permissão para excluir esta ideia.');
  await i.update({ excluida: true }); res.status(204).end();
}));

router.get('/ideias/:id/votos', autenticar, ah(async (req,res) => {
  const i=await buscarIdeia(req.params.id);
  const votos=await Voto.count({where:{ideiaId:i.id}});
  const meuVoto=!!(await Voto.findOne({where:{ideiaId:i.id,usuarioId:req.usuario.id}}));
  res.json({ ideiaId:i.id, votos, meuVoto });
}));
router.post('/ideias/:id/votos', autenticar, ah(async (req,res) => {
  const i=await buscarIdeia(req.params.id);
  if (await Voto.findOne({where:{ideiaId:i.id,usuarioId:req.usuario.id}})) throw httpError(409,'Você já votou nesta ideia.');
  await Voto.create({ideiaId:i.id,usuarioId:req.usuario.id});
  res.status(201).json({ ideiaId:i.id, votos:await Voto.count({where:{ideiaId:i.id}}), meuVoto:true });
}));
router.delete('/ideias/:id/votos', autenticar, ah(async (req,res) => {
  const i=await buscarIdeia(req.params.id);
  const excluidos=await Voto.destroy({where:{ideiaId:i.id,usuarioId:req.usuario.id}});
  if (!excluidos) throw httpError(404,'Você não votou nesta ideia.');
  res.json({ideiaId:i.id,votos:await Voto.count({where:{ideiaId:i.id}}),meuVoto:false});
}));
router.get('/ideias/:id/comentarios', autenticar, ah(async (req,res) => {
  const i=await buscarIdeia(req.params.id);
  res.json(await Comentario.findAll({where:{ideiaId:i.id},include:[{model:Usuario,as:'usuario',attributes:['id','nome']}],order:[['createdAt','ASC']]}));
}));
router.post('/ideias/:id/comentarios', autenticar, ah(async (req,res) => {
  assertCampos(req.body,['texto']);
  const i=await buscarIdeia(req.params.id);
  const c=await Comentario.create({texto:textoObrigatorio(req.body.texto,'texto',5000),ideiaId:i.id,usuarioId:req.usuario.id});
  res.status(201).json(c);
}));
router.get('/comentarios/:id', autenticar, ah(async (req,res) => {
  const c=await Comentario.findByPk(idValido(req.params.id));
  if(!c || !(await Ideia.findOne({where:{id:c.ideiaId,excluida:false}}))) throw httpError(404,'Comentário não encontrado.');
  res.json(c);
}));
router.put('/comentarios/:id', autenticar, ah(async (req,res) => {
  assertCampos(req.body,['texto']);
  const c=await Comentario.findByPk(idValido(req.params.id));
  if(!c || !(await Ideia.findOne({where:{id:c.ideiaId,excluida:false}}))) throw httpError(404,'Comentário não encontrado.');
  if(c.usuarioId !== req.usuario.id && req.usuario.perfil !== 'admin') throw httpError(403,'Sem permissão para editar este comentário.');
  await c.update({texto:textoObrigatorio(req.body.texto,'texto',5000)});res.json(c);
}));
router.delete('/comentarios/:id', autenticar, ah(async (req,res) => {
  const c=await Comentario.findByPk(idValido(req.params.id));
  if(!c || !(await Ideia.findOne({where:{id:c.ideiaId,excluida:false}}))) throw httpError(404,'Comentário não encontrado.');
  if(c.usuarioId!==req.usuario.id && req.usuario.perfil!=='admin') throw httpError(403,'Sem permissão para excluir este comentário.');
  await c.destroy(); res.status(204).end();
}));
export default router;
