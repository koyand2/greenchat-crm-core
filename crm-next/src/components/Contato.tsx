import { ChevronDown, Contact } from 'lucide-react';
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
      label: 'Aplicar filtro',
      variant: 'ghost',
      onClick: () => console.log('Edit filter clicked')
    },
    {
      label: 'Limpar filtro',
      variant: 'ghost',
      onClick: () => console.log('Clear filter clicked')
    },

    {
      label: 'IMPORTAR CONTATOS DO WHATSAPP',
      variant: 'ghost',
      onClick: () => console.log('Import WhatsApp contacts clicked')
    },
    {
      label: 'CADASTRAR',
      variant: 'default',
      onClick: () => console.log('Register clicked')
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
        itemsPerPage={2}
      />
    </div>
  );
}