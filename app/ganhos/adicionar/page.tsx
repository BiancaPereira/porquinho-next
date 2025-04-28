"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { environment } from "@/environments/environments";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { toast } from "sonner";

const FormSchema = z.object({
  tipo: z.enum(["SALARIO", "ADIANTAMENTO", "EXTRA"]),
  dono: z.enum(["BIA", "GIL"]),
  valor: z.preprocess(
    (val) => parseFloat(val as string),
    z.number().positive()
  ),
  data: z.preprocess((val) => new Date(val as string), z.date()),
  info: z.string().optional(),
});

export default function Page() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema) as any,
    defaultValues: {
      tipo: "SALARIO",
      dono: "BIA",
      valor: undefined,
      data: undefined,
      info: undefined,
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const formattedData = {
      ...data,
      data: format(data.data, "yyyy-MM-dd"),
    };

    try {
      await fetch(`${environment.apiBaseUrl}/ganhos`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formattedData),
      });

      toast.success("Ganho adicionado com sucesso!");
      form.reset();
    } catch (error) {
      toast.error("Erro ao adicionar ganho.", { description: String(error) });
    }
  }

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt -0">
      <h2 className="text-2xl font-semibold">Adicionar ganho</h2>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-1/2 space-y-9"
        >
          <FormField
            control={form.control}
            name="data"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Data</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-[240px] pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Selecione uma data</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(data) =>
                        data > new Date() || data < new Date("1900-01-01")
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="tipo"
            render={({ field }) => (
              <FormItem className="space-y-1">
                <FormLabel>Tipo</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-row gap-9"
                  >
                    <FormItem className="flex items-center space-x-1 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="SALARIO" />
                      </FormControl>
                      <FormLabel className="font-normal">Salário</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-1 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="ADIANTAMENTO" />
                      </FormControl>
                      <FormLabel className="font-normal">
                        Adiantamento
                      </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-1 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="EXTRA" />
                      </FormControl>
                      <FormLabel className="font-normal">Extra</FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="dono"
            render={({ field }) => (
              <FormItem className="space-y-1">
                <FormLabel>Dono</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-row gap-9"
                  >
                    <FormItem className="flex items-center space-x-1 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="BIA" />
                      </FormControl>
                      <FormLabel className="font-normal">Bia</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-1 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="GIL" />
                      </FormControl>
                      <FormLabel className="font-normal">Gil</FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="valor"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Valor</FormLabel>
                <FormControl>
                  <Input
                    {...field}
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

          <Button type="submit">Salvar</Button>
        </form>
      </Form>
    </div>
  );
}
