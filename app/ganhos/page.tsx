import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { environment } from "@/environments/environments";
import { formatCurrency } from "@/utils/format-currency";
import { columns } from "./columns";
import { DataTable } from "./data-table";

export default async function Page() {
  const ganhosData = await fetch(`${environment.apiBaseUrl}/ganhos`);
  const ganhos = await ganhosData.json();

  const counterData = await fetch(`${environment.apiBaseUrl}/ganhos/counter/`);
  const counter = await counterData.json();

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt -0">
      <h2 className="text-2xl font-semibold">Listar ganhos</h2>

      <div className="flex gap-4 justify-between">
        <Card className="flex-1">
          <CardContent>
            <CardTitle>Esse mês</CardTitle>
            <div className="text-lg font-semibold text-green-500">
              {formatCurrency(counter.this_month)}
            </div>
          </CardContent>
        </Card>

        <Card className="flex-1">
          <CardContent>
            <CardTitle>Mês passado</CardTitle>
            <div className="text-lg font-semibold text-green-500">
              {formatCurrency(counter.last_month)}
            </div>
          </CardContent>
        </Card>

        <Card className="flex-1">
          <CardContent>
            <CardTitle>Esse ano</CardTitle>
            <div className="text-lg font-semibold text-green-500">
              {formatCurrency(counter.this_year)}
            </div>
          </CardContent>
        </Card>

        <Card className="flex-1">
          <CardContent>
            <CardTitle>Ano passado</CardTitle>
            <div className="text-lg font-semibold text-green-500">
              {formatCurrency(counter.last_year)}
            </div>
          </CardContent>
        </Card>

        <Card className="flex-1">
          <CardContent>
            <CardTitle>Total</CardTitle>
            <div className="text-lg font-semibold text-green-500">
              {formatCurrency(counter.all_time)}
            </div>
          </CardContent>
        </Card>
      </div>

      <DataTable columns={columns} data={ganhos} />
    </div>
  );
}
