import { Ganho } from '../models/ganhos_model';

// Simulando o banco de dados com um array por enquanto
const ganhosDB: Ganho[] = [];

export const createGanho = (ganho: Omit<Ganho, 'id'>): Ganho => {
  const newGanho = { ...ganho, id: ganhosDB.length + 1 };
  ganhosDB.push(newGanho);
  return newGanho;
};

export const getGanhos = (skip = 0, limit = 10): Ganho[] => {
  return ganhosDB.slice(skip, skip + limit);
};

export const calcularTotalGanhos = (start: Date, end: Date): number => {
  return ganhosDB
    .filter(g => g.data >= start && g.data <= end)
    .reduce((acc, cur) => acc + cur.valor, 0);
};

export const calcularGanhosCounter = () => {
  const hoje = new Date();
  const primeiroDiaMes = new Date(hoje.getFullYear(), hoje.getMonth(), 1);
  const primeiroDiaMesPassado = new Date(hoje.getFullYear(), hoje.getMonth() - 1, 1);
  const ultimoDiaMesPassado = new Date(primeiroDiaMes.getTime() - 1);

  const primeiroDiaAno = new Date(hoje.getFullYear(), 0, 1);
  const primeiroDiaAnoPassado = new Date(hoje.getFullYear() - 1, 0, 1);
  const ultimoDiaAnoPassado = new Date(primeiroDiaAno.getTime() - 1);

  return {
    this_month: calcularTotalGanhos(primeiroDiaMes, hoje),
    last_month: calcularTotalGanhos(primeiroDiaMesPassado, ultimoDiaMesPassado),
    this_year: calcularTotalGanhos(primeiroDiaAno, hoje),
    last_year: calcularTotalGanhos(primeiroDiaAnoPassado, ultimoDiaAnoPassado),
    all_time: calcularTotalGanhos(new Date(0), hoje),
  };
};