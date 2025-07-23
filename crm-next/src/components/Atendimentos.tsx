import GenericDataTable from "./GenericTable";
import { atendimentos } from "@/data/atendimentoData";
import { Trash, Upload } from 'lucide-react';

export default function Atendimentos() {
  const columns = [
    {
      key: 'cliente',
      header: 'Cliente',
      cellClassName: 'font-medium'
    },
    {
      key: 'contato',
      header: 'Contato'
    },
    {
      key: 'status',
      header: 'Status',
      type: 'badge',
      getBadgeVariant: (status: any) => {
        if (status === "Concluído") return "success";
        if (status === "Pendente") return "destructive";
        if (status === "Cancelado") return "destructive";
        return "default";
      }
    },
    {
      key: 'atendidoPor',
      header: 'Atendido Por'
    },
    {
      key: 'data',
      header: 'Data'
    }
  ];


  const actions = [
    {
      label: 'Limpar filtro',
      icon: <Trash />,
      variant: 'ghost',
    },
    {
      label: 'EXPORTAR DADOS',
      icon: <Upload />,
      variant: 'default',
    },
  ];


  const handleRowAction = (action: any, item: any) => {
    if (action === 'view') {
      console.log('Ver detalhes do item:', item);
    }
  };

  return (
    <GenericDataTable
      title="Atendimentos"
      data={atendimentos}
      columns={columns}
      actions={actions}
      onRowAction={handleRowAction}
      showRowActions={true}
      rowActionsLabel="Ações"
      rowActionsItems={[{ label: "Ver detalhes", action: "view" }]}
      itemsPerPage={5} // Mostra 5 itens por página
    />
  );
}