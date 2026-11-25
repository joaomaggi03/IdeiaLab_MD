import jwt from 'jsonwebtoken';
import { Usuario } from '../models/index.js';
import { httpError } from '../utils/errors.js';

export async function autenticar(req, res, next) {
  try {
    const [tipo, token] = (req.headers.authorization || '').split(' ');
    if (tipo !== 'Bearer' || !token) throw httpError(401, 'Token de acesso necessário.');
    const dados = jwt.verify(token, process.env.JWT_SECRET, { algorithms: ['HS256'] });
    const usuario = await Usuario.findByPk(dados.sub);
    if (!usuario || !usuario.ativo) throw httpError(401, 'Usuária inválida ou inativa.');
    req.usuario = usuario;
    next();
  } catch (erro) { next(erro.name === 'JsonWebTokenError' || erro.name === 'TokenExpiredError' ? httpError(401, 'Token inválido ou expirado.') : erro); }
}
export function somenteAdmin(req, res, next) {
  if (req.usuario.perfil !== 'admin') return next(httpError(403, 'Acesso permitido apenas à administração.'));
  next();
}
