import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { UniqueConstraintError, ValidationError, ForeignKeyConstraintError } from 'sequelize';
import routes from './routes/index.js';

export const app = express();
app.disable('x-powered-by');
app.use(helmet());
const origens = (process.env.FRONTEND_URL || 'http://localhost:5173').split(',').map(x=>x.trim());
app.use(cors({ origin: origens }));
app.use(express.json({ limit: '100kb' }));
app.get('/api/health', (_req,res) => res.json({ ok:true, servico:'IdeiaLab MD API' }));
app.use('/api', routes);
app.use((_req,res)=>res.status(404).json({ erro:'Rota não encontrada.' }));
app.use((erro,_req,res,_next)=>{
  if (erro instanceof UniqueConstraintError) return res.status(409).json({erro:'Registro duplicado.'});
  if (erro instanceof ForeignKeyConstraintError) return res.status(409).json({erro:'Registro referenciado por outros dados.'});
  if (erro instanceof ValidationError || erro.name === 'SequelizeDatabaseError') return res.status(400).json({erro:'Dados inválidos para o banco.'});
  const status=erro.status || (erro.type==='entity.parse.failed' ? 400 : 500);
  if (status >= 500) console.error(erro);
  res.status(status).json({erro:status>=500 ? 'Erro interno do servidor.' : erro.message});
});
