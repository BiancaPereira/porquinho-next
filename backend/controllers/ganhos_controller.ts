import { Request, Response } from 'express';
import { GanhoCreateSchema } from '../schemas/ganhos_schema';
import {
  createGanho,
  getGanhos,
  calcularGanhosCounter,
} from '../services/ganhos_service';

export const criarGanho = (req: Request, res: Response) => {
  const parse = GanhoCreateSchema.safeParse(req.body);
  if (!parse.success) return res.status(400).json(parse.error);

  const ganho = createGanho(parse.data);
  return res.status(201).json(ganho);
};

export const listarGanhos = (req: Request, res: Response) => {
  const skip = parseInt(req.query.skip as string) || 0;
  const limit = parseInt(req.query.limit as string) || 10;
  const lista = getGanhos(skip, limit);
  return res.json(lista);
};

export const ganhosCounter = (req: Request, res: Response) => {
  const data = calcularGanhosCounter();
  return res.json(data);
};