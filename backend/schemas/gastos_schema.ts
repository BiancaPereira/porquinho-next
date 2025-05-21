import { z } from 'zod';

export const GastoFixoSchema = z.object({
  descricao: z.string(),
  valor: z.number(),
  a_vista: z.boolean(),
  data_inicio: z.coerce.date(),
  data_fim: z.coerce.date().optional(),
  ativo: z.boolean(),
  categoria: z.enum(['ESSENCIAL', 'OPCIONAL', 'DIVERSAO', 'EXTRAS']),
  info: z.string().optional(),
  atualizado_em: z.coerce.date().optional(),
});

export type GastoFixoInput = z.infer<typeof GastoFixoSchema>;

export const GastoAVistaSchema = z.object({
  descricao: z.string(),
  valor: z.number(),
  data: z.coerce.date(),
  categoria: z.enum(['ESSENCIAL', 'OPCIONAL', 'DIVERSAO', 'EXTRAS']),
  info: z.string().optional(),
});

export type GastoAVistaInput = z.infer<typeof GastoAVistaSchema>;
