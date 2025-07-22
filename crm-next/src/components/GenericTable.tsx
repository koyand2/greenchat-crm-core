'use client';
import { Eye, MoreHorizontal, ArrowLeft, ArrowRight } from "lucide-react";
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
import { DatePicker } from "./DatePicker";

import { useState, useMemo } from "react";

export default function GenericDataTable({
  title = '',
  data = [],
  columns = [],
  filters = [],
  actions = [],
  onRowAction = () => { },
  showRowActions = true,
  rowActionsLabel = "Ações",
  rowActionsItems = [{ label: "Ver detalhes", action: "view" }],
  showPagination = true,
  itemsPerPage = 5,
}) {
  const [currentPage, setCurrentPage] = useState(1);

  // Calcular paginação
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return data.slice(startIndex, endIndex);
  }, [data, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(data.length / itemsPerPage);
  const totalItems = data.length;

  const handlePreviousPage = () => {
    setCurrentPage(prev => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage(prev => Math.min(prev + 1, totalPages));
  };

  const renderCellContent = (item, column) => {
    const value = item[column.key];

    if (column.render) {
      return column.render(value, item);
    }

    if (column.type === 'badge') {
      const variant = column.getBadgeVariant ? column.getBadgeVariant(value, item) : "default";
      return <Badge variant={variant}>{value}</Badge>;
    }

    return value;
  };

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">{title} ({totalItems})</h2>
        <div className="flex items-center space-x-2">
          <DatePicker text="Data de início" />
          <DatePicker text="Data final" />
          {filters.map((filter, index) => (
            <Badge key={index} variant="outline" className="flex items-center space-x-1">
              <span>{filter.label}</span>
              {filter.showMoreIcon && (
                <button
                  className="ml-1 text-gray-500 hover:text-gray-700"
                  onClick={() => filter.onMoreClick && filter.onMoreClick()}
                >
                  <MoreHorizontal className="h-4 w-4" />
                </button>
              )}
            </Badge>
          ))}
          {actions.map((action, index) => (
            <Button
              key={index}
              variant={action.variant || "ghost"}
              className={action.className}
              onClick={action.onClick}
            >
              {action.label}
            </Button>
          ))}
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((column, index) => (
                <TableHead
                  key={index}
                  className={column.headerClassName}
                >
                  {column.header}
                </TableHead>
              ))}
              {showRowActions && (
                <TableHead className="text-right">Dados</TableHead>
              )}
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedData.map((item, index) => (
              <TableRow key={item.id || index}>
                {columns.map((column, colIndex) => (
                  <TableCell
                    key={colIndex}
                    className={column.cellClassName}
                  >
                    {renderCellContent(item, column)}
                  </TableCell>
                ))}
                {showRowActions && (
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Abrir menu</span>
                          <Eye className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>{rowActionsLabel}</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        {rowActionsItems.map((actionItem, actionIndex) => (
                          <DropdownMenuItem
                            key={actionIndex}
                            onClick={() => onRowAction(actionItem.action, item)}
                          >
                            {actionItem.label}
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {showPagination && (
          <div className="flex items-center justify-end p-4">
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={handlePreviousPage}
                disabled={currentPage <= 1}
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <span className="text-sm font-medium text-foreground">
                {currentPage}/{totalPages}
              </span>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={handleNextPage}
                disabled={currentPage >= totalPages}
              >
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}