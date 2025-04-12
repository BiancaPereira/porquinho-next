import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Info } from "lucide-react";

export function CategoriasModal() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary"><Info /> Ver categorias</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Categorias</DialogTitle>
          <DialogDescription>
            Categorias
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
