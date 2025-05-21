import { Router, Request, Response } from 'express';
import {
  criarGastoFixo,
  listarGastosFixos,
  obterGastoFixo,
  atualizarGastoFixo,
  criarGastoAVista,
  listarGastosAVista,
} from '../controllers/gastos_controller';

const router = Router();

router.post('/fixos', criarGastoFixo as (req: Request, res: Response) => void);
router.get('/fixos', listarGastosFixos as (req: Request, res: Response) => void);
router.get('/fixos/:id', obterGastoFixo as (req: Request, res: Response) => void);
router.put('/fixos/:id', atualizarGastoFixo as (req: Request, res: Response) => void);

router.post('/a_vista', criarGastoAVista as (req: Request, res: Response) => void);
router.get('/a_vista', listarGastosAVista);

export default router;
