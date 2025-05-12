import { Router, Request, Response } from 'express';
import {
  criarGanho,
  listarGanhos,
  ganhosCounter,
} from '../controllers/ganhos_controller';

const router = Router();

router.post('/ganhos', criarGanho as (req: Request, res: Response) => void);
router.get('/ganhos', listarGanhos as (req: Request, res: Response) => void);
router.get('/ganhos/counter', ganhosCounter as (req: Request, res: Response) => void);

export default router;