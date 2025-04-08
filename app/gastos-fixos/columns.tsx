"use client";

import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { formatCurrency } from "@/utils/format-currency";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { parseISO } from "date-fns";
import {
  Check,
  X,
  CalendarSync,
  CalendarX2,
  CreditCard,
  Banknote,
  Pencil,
} from "lucide-react";

export type GastosFixos = {
  id: string;
  info?: string;
  data_fim?: string;
  ativo: boolean;
  categoria: "ESSENCIAL" | "OPCIONAL" | "DIVERSAO" | "EXTRAS";
  data_inicio: string;
  valor: number;
  a_vista: boolean;
  descricao: string;
  atualizado_em: string;
};

export const columns: ColumnDef<GastosFixos>[] = [
  {
    accessorKey: "descricao",
    header: "Descrição",
  },
  {
    accessorKey: "valor",
    header: "Valor",
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("valor"));
      const formatted = formatCurrency(amount);

      return <div>{formatted}</div>;
    },
  },

  {
    accessorKey: "a_vista",
    header: "Pagam.",
    cell: ({ row }) =>
      row.getValue("a_vista") ? (
        <Tooltip>
          <TooltipTrigger asChild>
            <Banknote size={16} className="text-green-700" />
          </TooltipTrigger>
          <TooltipContent side="right" align="center">
            Dinheiro
          </TooltipContent>
        </Tooltip>
      ) : (
        <Tooltip>
          <TooltipTrigger asChild>
            <CreditCard size={16} className="text-blue-500" />
          </TooltipTrigger>
          <TooltipContent side="right" align="center">
            Cartão
          </TooltipContent>
        </Tooltip>
      ),
  },
  {
    accessorKey: "info",
    header: "Informações",
    cell: ({ row }) => {
      const info = row.getValue("info") as string;
      return info ? info : "-";
    },
  },
  {
    accessorKey: "categoria",
    header: "Categoria",
    cell: ({ row }) => {
      const categoria = row.getValue("categoria") as string;
      const { label, textColor } = {
        ESSENCIAL: { label: "Essencial", textColor: "text-green-500" },
        OPCIONAL: { label: "Opcional", textColor: "text-blue-500" },
        DIVERSAO: { label: "Diversão", textColor: "text-purple-500" },
        EXTRAS: { label: "Extras", textColor: "text-orange-500" },
      }[categoria] || { label: "-", textColor: "default" };

      return (
        <Badge variant="secondary" className={`font-bold ${textColor}`}>
          {label}
        </Badge>
      );
    },
  },
  {
    accessorKey: "data_inicio",
    header: "Incluído em",
    cell: ({ row }) => {
      const dataInicio = row.getValue("data_inicio") as string;

      const atualizadoEm = row.original.atualizado_em;
      const atualizadoEmDate =
        atualizadoEm && atualizadoEm !== dataInicio
          ? format(parseISO(atualizadoEm), "dd/MM/yyyy")
          : "";

      return dataInicio ? (
        <div className="flex items-center gap-2">
          {format(parseISO(dataInicio), "dd/MM/yyyy")}
          {atualizadoEmDate && (
            <Tooltip>
              <TooltipTrigger asChild>
                <CalendarSync size={16} className="text-gray-600" />
              </TooltipTrigger>
              <TooltipContent side="right" align="center">
                <strong>Atualizado em:</strong>
                <br />
                {atualizadoEmDate}
              </TooltipContent>
            </Tooltip>
          )}
        </div>
      ) : (
        "-"
      );
    },
  },
  {
    accessorKey: "ativo",
    header: "Ativo",
    cell: ({ row }) => {
      const canceladoEm = row.original.atualizado_em;
      const canceladoEmDate =
        canceladoEm && canceladoEm !== row.getValue("ativo")
          ? format(parseISO(canceladoEm), "dd/MM/yyyy")
          : "";

      return row.getValue("ativo") ? (
        <Check size={16} className="text-green-600" />
      ) : (
        <div className="flex items-center gap-2">
          <X size={16} className="text-red-600" />
          <Tooltip>
            <TooltipTrigger asChild>
              <CalendarX2 size={16} className="text-gray-600" />
            </TooltipTrigger>
            <TooltipContent side="right" align="center">
              <strong>Cancelado em:</strong>
              <br />
              {canceladoEmDate}
            </TooltipContent>
          </Tooltip>
        </div>
      );
    },
  },
  {
    accessorKey: "actions",
    header: "",
    cell: ({ row }) => {
      const id = row.original.id;

      return (
        <a href={`/gastos-fixos/adicionar?id=${id}`}>
          <Pencil size={16} className="text-gray-600" />
        </a>
      );
    },
  },
];
