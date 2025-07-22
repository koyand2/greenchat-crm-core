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
  itemsPerPage = 8,
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
      return <Badge variant={variant} className="text-xs px-1.5 py-0.5">{value}</Badge>;
    }

    return value;
  };

  return (
    <div className="p-2">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-bold">{title} ({totalItems})</h2>
        <div className="flex items-center space-x-1">
          <DatePicker text="Data de início" />
          <DatePicker text="Data final" />
          {filters.map((filter, index) => (
            <Badge key={index} variant="outline" className="flex items-center space-x-1 text-xs px-2 py-1">
              <span>{filter.label}</span>
              {filter.showMoreIcon && (
                <button
                  className="ml-1 text-gray-500 hover:text-gray-700"
                  onClick={() => filter.onMoreClick && filter.onMoreClick()}
                >
                  <MoreHorizontal className="h-3 w-3" />
                </button>
              )}
            </Badge>
          ))}
          {actions.map((action, index) => (
            <Button
              key={index}
              variant={action.variant || "ghost"}
              className="flex items-center justify-center text-xs"
              onClick={action.onClick}
            >
              {action.icon && <span className="w-3 h-3">{action.icon}</span>}
              {action.label}
            </Button>
          ))}
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow className="h-8">
              {columns.map((column, index) => (
                <TableHead
                  key={index}
                  className={`text-xs py-2 ${column.headerClassName}`}
                >
                  {column.header}
                </TableHead>
              ))}
              {showRowActions && (
                <TableHead className="text-right text-xs py-2">Dados</TableHead>
              )}
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedData.map((item, index) => (
              <TableRow key={item.id || index} className="h-10">
                {columns.map((column, colIndex) => (
                  <TableCell
                    key={colIndex}
                    className={`text-sm py-2 ${column.cellClassName}`}
                  >
                    {renderCellContent(item, column)}
                  </TableCell>
                ))}
                {showRowActions && (
                  <TableCell className="text-right py-2">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-6 w-6 p-0">
                          <span className="sr-only">Abrir menu</span>
                          <Eye className="h-3 w-3" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel className="text-xs">{rowActionsLabel}</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        {rowActionsItems.map((actionItem, actionIndex) => (
                          <DropdownMenuItem
                            key={actionIndex}
                            className="text-xs"
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
          <div className="flex items-center justify-end p-2">
            <div className="flex items-center space-x-1">
              <Button
                variant="ghost"
                size="sm"
                className="h-6 w-6 p-0"
                onClick={handlePreviousPage}
                disabled={currentPage <= 1}
              >
                <ArrowLeft className="h-3 w-3" />
              </Button>
              <span className="text-xs font-medium text-foreground px-2">
                {currentPage}/{totalPages}
              </span>
              <Button
                variant="ghost"
                size="sm"
                className="h-6 w-6 p-0"
                onClick={handleNextPage}
                disabled={currentPage >= totalPages}
              >
                <ArrowRight className="h-3 w-3" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}