import { Request, Response } from 'express';
import {
  createGastoFixo,
  getGastosFixos,
  getGastoFixoById,
  updateGastoFixo,
  createGastoAVista,
  getGastosAVista,
} from '../services/gastos_service';

import { GastoFixoSchema, GastoAVistaSchema } from '../schemas/gastos_schema';

export const criarGastoFixo = (req: Request, res: Response) => {
  const parsed = GastoFixoSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json(parsed.error);

  const novo = createGastoFixo(parsed.data);
  res.status(201).json(novo);
};

export const listarGastosFixos = (_req: Request, res: Response) => {
  res.json(getGastosFixos());
};

export const obterGastoFixo = (req: Request, res: Response) => {
  const gasto = getGastoFixoById(Number(req.params.id));
  if (!gasto) return res.status(404).json({ message: 'Gasto fixo não encontrado' });
  res.json(gasto);
};

export const atualizarGastoFixo = (req: Request, res: Response) => {
  const parsed = GastoFixoSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json(parsed.error);

  const atualizado = updateGastoFixo(Number(req.params.id), parsed.data);
  if (!atualizado) return res.status(404).json({ message: 'Gasto fixo não encontrado' });

  res.json(atualizado);
};

export const criarGastoAVista = (req: Request, res: Response) => {
  const parsed = GastoAVistaSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json(parsed.error);

  const novo = createGastoAVista(parsed.data);
  res.status(201).json(novo);
};

export const listarGastosAVista = (_req: Request, res: Response) => {
  res.json(getGastosAVista());
};
