import { DataTable } from "./data-table";
import { columns } from "./columns";

export default async function Page() {
  let gastos = [];
  try {
    const gastosData = await fetch(`${process.env.API_BASE_URL}/gastos/fixos`);
    gastos = await gastosData.json();
  } catch (error) {
    console.error("Failed to fetch gastos fixos:", error);
  }

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt -0">
      <h2 className="text-2xl font-semibold">Listar gastos fixos</h2>

      <DataTable columns={columns} data={gastos} />
    </div>
  );
}
