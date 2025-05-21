import { CategoriaGastos } from "../enums/enum";

export interface GastoFixo {
  id: number;
  descricao: string;
  valor: number;
  a_vista: boolean;
  data_inicio?: Date;
  data_fim?: Date;
  ativo: boolean;
  categoria: CategoriaGastos;
  info?: string;
  atualizado_em?: Date;
}

export interface HistoricoGastoFixo {
  id: number;
  gastos_fixos_id: number;
  valor: number;
  atualizado_em: Date;
}

export interface GastoAVista {
  id: number;
  descricao: string;
  valor: number;
  data: Date;
  categoria: CategoriaGastos;
  info?: string;
}
