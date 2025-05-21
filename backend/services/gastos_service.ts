import { GastoFixo, HistoricoGastoFixo, GastoAVista } from '../models/gastos_model';

let gastosFixosDB: GastoFixo[] = [];
let historicoFixosDB: HistoricoGastoFixo[] = [];
let gastosAVistaDB: GastoAVista[] = [];

export const createGastoFixo = (data: Omit<GastoFixo, 'id'>): GastoFixo => {
  const newItem = { ...data, id: gastosFixosDB.length + 1 };
  gastosFixosDB.push(newItem);
  return newItem;
};

export const getGastosFixos = (): GastoFixo[] => gastosFixosDB;

export const getGastoFixoById = (id: number): GastoFixo | undefined =>
  gastosFixosDB.find(g => g.id === id);

export const updateGastoFixo = (id: number, data: Omit<GastoFixo, 'id'>): GastoFixo | null => {
  const index = gastosFixosDB.findIndex(g => g.id === id);
  if (index === -1) return null;

  // Histórico
  historicoFixosDB.push({
    id: historicoFixosDB.length + 1,
    gastos_fixos_id: id,
    valor: gastosFixosDB[index].valor,
    atualizado_em: new Date(),
  });

  const updated = {
    ...gastosFixosDB[index],
    ...data,
    atualizado_em: new Date(),
  };

  delete updated.data_inicio; // manter lógica original
  gastosFixosDB[index] = updated;

  return updated;
};

export const createGastoAVista = (data: Omit<GastoAVista, 'id'>): GastoAVista => {
  const newItem = { ...data, id: gastosAVistaDB.length + 1 };
  gastosAVistaDB.push(newItem);
  return newItem;
};

export const getGastosAVista = (): GastoAVista[] => gastosAVistaDB;
