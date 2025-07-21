import { Eye, MoreHorizontal } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { atendimentos } from "@/data/atendimentoData";

export default function Atendimentos() {
  const totalAtendimentos = atendimentos.length;

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">Atendimentos ({totalAtendimentos})</h2>
        <div className="flex items-center space-x-2">
          <Badge variant="outline" className="flex items-center space-x-1">
            <span>Concluído</span>
            <button className="ml-1 text-gray-500 hover:text-gray-700">
              <MoreHorizontal className="h-4 w-4" />
            </button>
          </Badge>
          <Badge variant="outline" className="flex items-center space-x-1">
            <span>13/07/2025 - 19/07/2025</span>
            <button className="ml-1 text-gray-500 hover:text-gray-700">
              <MoreHorizontal className="h-4 w-4" />
            </button>
          </Badge>
          <Button variant="ghost" className="text-primary hover:text-blue-700">
            Editar filtro
          </Button>
          <Button variant="ghost" className="text-primary hover:text-blue-700">
            Limpar filtro
          </Button>
          <Button variant='default'>EXPORTAR DADOS</Button>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Cliente</TableHead>
              <TableHead>Contato</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Atendido Por</TableHead>
              <TableHead>Data</TableHead>
              <TableHead className="text-right">Dados</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {atendimentos.map((atendimento) => (
              <TableRow key={atendimento.id}>
                <TableCell className="font-medium">{atendimento.cliente}</TableCell>
                <TableCell>{atendimento.contato}</TableCell>
                <TableCell>
                  <Badge variant={atendimento.status === "Concluído" ? "success" : atendimento.status === "Pendente" ? "destructive" : atendimento.status === "Cancelado" ? "destructive" : "default"}>
                    {atendimento.status}
                  </Badge>
                </TableCell>
                <TableCell>{atendimento.atendidoPor}</TableCell>
                <TableCell>{atendimento.data}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Abrir menu</span>
                        <Eye className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Ações</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>Ver detalhes</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}