import { ChevronDown, Contact, Download, Trash, BookOpenText } from 'lucide-react';
import GenericDataTable from "./GenericTable";
import { contatos } from "@/data/contatoData";

export default function Contato() {
  const columns = [
    {
      key: 'nome',
      header: (
        <div className="flex items-center">
          NOME
          <ChevronDown className="ml-1 h-3 w-3 text-foreground" />
        </div>
      ),
      cellClassName: 'whitespace-nowrap px-6 py-4 text-sm font-medium text-foreground'
    },
    {
      key: 'telefone',
      header: 'TELEFONE',
      cellClassName: 'whitespace-nowrap px-6 py-4 text-sm text-foreground'
    },
    {
      key: 'criadoEm',
      header: 'CRIADO EM',
      cellClassName: 'whitespace-nowrap px-6 py-4 text-sm text-foreground'
    }
  ];

  const actions = [
    {
      label: 'Limpar filtro',
      icon: <Trash />,
      variant: 'ghost',
    },

    {
      label: 'IMPORTAR CONTATOS',
      icon: <Download />,
      variant: 'ghost',
    },
    {
      label: 'CADASTRAR',
      icon: <BookOpenText />,
    },
  ];

  return (
    <div className="min-h-screen bg-background font-sans text-foreground">
      <div className="mb-6 flex items-center justify-center space-x-2 text-lg font-semibold text-foreground pt-6">
        <Contact />
        <span>Gerenciar contatos</span>
      </div>

      <GenericDataTable
        title="Contatos"
        data={contatos}
        columns={columns}
        filters={[]}
        actions={actions}
        showRowActions={false}
        itemsPerPage={3}
      />
    </div>
  );
}