import {
  ChevronDown,
  Search,
  ArrowLeft,
  ArrowRight,
  Contact
} from 'lucide-react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table'
import { contatos } from '@/data/contatoData'

export default function Contato() {
 return (
    <div className="min-h-screen bg-background p-6 font-sans text-foreground">
      <div className="mb-6 flex items-center justify-center space-x-2 text-lg font-semibold text-foreground">
        <Contact />
        <span>Gerenciar contatos</span>
      </div>

      <div className="mb-6 flex items-center justify-between rounded-lg bg-background p-4 shadow-sm">
        <div className="flex items-center space-x-6">
          <div className="text-md font-medium text-foreground">
            Contatos: <span className="text-primary">1972</span>
          </div>
          <div className="relative flex items-center">
            <Search className="absolute left-3 h-4 w-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Buscar contatos cadastrados pelo nome"
              className="w-80 rounded-md py-2 pl-9 pr-3 text-sm"
            />
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline">
            IMPORTAR CONTATOS DO WHATSAPP
          </Button>
          <Button variant={'default'}>
            CADASTRAR
          </Button>
        </div>
      </div>

      <div className="rounded-lg border bg-background shadow-sm">
        <Table>
          <TableHeader>
            <TableRow className="bg-background">
              <TableHead className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-foreground">
                <div className="flex items-center">
                  NOME
                  <ChevronDown className="ml-1 h-3 w-3 text-foreground" />
                </div>
              </TableHead>
              <TableHead className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-foreground">
                TELEFONE
              </TableHead>
              <TableHead className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-foreground">
                CRIADO EM
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {contatos.map((contact, index) => (
              <TableRow key={index} className="border-b last:border-0 hover:bg-background">
                <TableCell className="whitespace-nowrap px-6 py-4 text-sm font-medium text-foreground">
                  {contact.nome}
                </TableCell>
                <TableCell className="whitespace-nowrap px-6 py-4 text-sm text-foreground">
                  {contact.telefone}
                </TableCell>
                <TableCell className="whitespace-nowrap px-6 py-4 text-sm text-foreground">
                  {contact.criadoEm}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <div className="flex items-center justify-end space-x-2 p-4">
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <span className="text-sm font-medium text-foreground">1/...</span>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}