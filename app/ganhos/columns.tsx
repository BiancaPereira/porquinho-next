"use client";

import { formatCurrency } from "@/utils/format-currency";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { parseISO } from "date-fns";

export type Ganhos = {
  id: string;
  tipo: 'SALARIO' | 'ADIANTAMENTO' | 'EXTRA';
  dono: 'BIA' | 'GIL';
  info?: string;
  valor: number;
  data: string;
};

export const columns: ColumnDef<Ganhos>[] = [
  {
    accessorKey: "tipo",
    header: "Tipo",
    cell: ({ row }) => {
      const tipoLabel = {
        SALARIO: "Salário",
        ADIANTAMENTO: "Adiantamento",
        EXTRA: "Extra",
      }
      return <div>{tipoLabel[row.getValue("tipo") as 'SALARIO' | 'ADIANTAMENTO' | 'EXTRA']}</div>
    }
  },
  {
    accessorKey: "info",
    header: "Informações",
    cell: ({ row }) => {
      const info = row.getValue("info") as string;
      return info ? info : "-"
    }

  },
  {
    accessorKey: "dono",
    header: "Responsável",
    cell: ({ row }) => {
      const donoLabel = {
        BIA: "Bia",
        GIL: "Gil",
      }
      return <div>{donoLabel[row.getValue("dono") as 'BIA' | 'GIL']}</div>
    }
  },
  {
    accessorKey: "valor",
    header: "Valor",
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("valor"))
      const formatted = formatCurrency(amount)
 
      return <div>{formatted}</div>
    },
  },
  {
    accessorKey: "data",
    header: "Data",
    cell: ({ row }) => {
      const date = parseISO(row.getValue("data"));
      const formatted = format(date, "dd/MM/yyyy");
 
      return <div>{formatted}</div>
    },
  },
];
