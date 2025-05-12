import { z } from 'zod';
import { TipoGanhos, Responsavel } from '../enums/ganhos_enum';

// Criação de ganho
export const GanhoCreateSchema = z.object({
  tipo: z.nativeEnum(TipoGanhos),
  dono: z.nativeEnum(Responsavel),
  valor: z.number(),
  data: z.coerce.date(),
  info: z.string().optional(),
});

export type GanhoCreate = z.infer<typeof GanhoCreateSchema>;

// Resposta de um ganho (com id)
export const GanhoResponseSchema = GanhoCreateSchema.extend({
  id: z.number(),
});

export type GanhoResponse = z.infer<typeof GanhoResponseSchema>;

// Contador de ganhos
export const GanhosCounterSchema = z.object({
  this_month: z.number(),
  last_month: z.number(),
  this_year: z.number(),
  last_year: z.number(),
  all_time: z.number(),
});

export type GanhosCounter = z.infer<typeof GanhosCounterSchema>;
