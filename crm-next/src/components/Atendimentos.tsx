import GenericDataTable from "./GenericTable";
import { atendimentos } from "@/data/atendimentoData";

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
      getBadgeVariant: (status) => {
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
      label: 'Aplicar filtro',
      variant: 'ghost',
      onClick: () => console.log('Clear filter clicked')
    },
    {
      label: 'Limpar filtro',
      variant: 'ghost',
      className: 'text-foreground hover:text-primary',
      onClick: () => console.log('Clear filter clicked')
    },
    {
      label: 'EXPORTAR DADOS',
      variant: 'default',
      onClick: () => console.log('Export data clicked')
    }
  ];

  const handleRowAction = (action, item) => {
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