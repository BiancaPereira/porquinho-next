import { TipoGanhos, Responsavel } from '../enums/enum';

export interface Ganho {
  id: number;
  tipo: TipoGanhos;
  dono: Responsavel;
  valor: number;
  data: Date;
  info?: string;
}