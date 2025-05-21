"use client";

import { CategoriasModal } from "@/components/CategoriasModal";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { environment } from "@/environments/environments";

const FormSchema = z.object({
  valor: z.preprocess(
    (val) => (typeof val === "string" ? parseFloat(val) : val),
    z.number().positive()
  ),
  info: z.string().optional(),
  ativo: z.boolean(),
  categoria: z.string(),
  a_vista: z.boolean(),
  descricao: z.string(),
});

export default function Page() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const form = useForm({
    resolver: zodResolver(FormSchema),
    mode: "onBlur",
    defaultValues: {
      valor: 1,
      info: "",
      ativo: false,
      categoria: "",
      a_vista: false,
      descricao: "",
    },
  });

  useEffect(() => {
    if (id) {
      getGastoFixoById(id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  function getGastoFixoById(id: string) {
    try {
      fetch(`${environment.apiBaseUrl}/gastos/fixos/${id}`)
        .then((res) => res.json())
        .then((data) => {
          form.reset(data);
        });
    } catch (error) {
      toast.error("Não foi possível buscar o gasto fixo.", {
        description: String(error),
      });
    }
  }

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const formattedData = {
      ...data,
      data_inicio: format(new Date(), "yyyy-MM-dd"),
      ativo: true,
    };

    try {
      if (id) {
        // Update existing record
        await fetch(`${environment.apiBaseUrl}/gastos/fixos/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formattedData),
        });
        toast.success("Gasto fixo atualizado com sucesso!");
      } else {
        // Create new record
        await fetch(`${environment.apiBaseUrl}/gastos/fixos`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formattedData),
        });
        toast.success("Gasto fixo adicionado com sucesso!");
      }
      form.reset();
      router.push("/gastos-fixos");
    } catch (error) {
      toast.error("Erro ao adicionar gasto fixo.", {
        description: String(error),
      });
    }
  }

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt -0">
      <h2 className="text-2xl font-semibold">
        {id ? "Editar gasto fixo" : "Adicionar gasto fixo"}
      </h2>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-3/4 space-y-9"
        >
          <FormField
            control={form.control}
            name="a_vista"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center gap-4">
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-0.5">
                  <FormLabel className="text-base">Pagamento via pix</FormLabel>
                  <FormDescription>
                    Ative se o pagamento será feito via pix, caso contrário será
                    feito via cartão de crédito.
                  </FormDescription>
                </div>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="descricao"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Descrição</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="text"
                    className="input"
                    placeholder="Digite a descrição"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex gap-4 items-end">
            <FormField
              control={form.control}
              name="categoria"
              render={({ field }) => (
                <FormItem className="w-1/3">
                  <FormLabel>Categoria</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Selecione uma categoria" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="ESSENCIAL">Essencial</SelectItem>
                      <SelectItem value="OPCIONAL">Opcional</SelectItem>
                      <SelectItem value="DIVERSAO">Diversão</SelectItem>
                      <SelectItem value="EXTRAS">Extras</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <CategoriasModal />
          </div>

          <FormField
            control={form.control}
            name="valor"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Valor</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    value={field.value as string | number}
                    type="number"
                    className="input"
                    placeholder="Digite o valor"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="info"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Informação <span className="text-gray-500">(opcional)</span>
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="text"
                    className="input"
                    placeholder="Digite uma info extra"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit">{id ? "Atualizar" : "Adicionar"}</Button>
        </form>
      </Form>
    </div>
  );
}
