
import {
    flexRender,
    getCoreRowModel,
    useReactTable,
    SortingState,
    getSortedRowModel,
    createColumnHelper,
} from "@tanstack/react-table"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/app/components/ui/table"

import { Button } from "@/app/components/ui/button"
import { Badge } from "@/app/components/ui/badge"
import { MoreHorizontal, ArrowUpDown, Copy } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/app/components/ui/dropdown-menu"
import { ModalUpdateProduct } from "../modalProduction/modal"
import { useState } from "react"
import { useUpdateOrderItemStatusMutation } from "@/hooks/mutations/updateOrderItemStatusMutation"

interface DataTableProps {
    data: Items[]
}

export interface Items {
    customerProductId: string
    customerProductName: string,
    totalQuantity: number,
    status: string
    referenceFileUrl: string
}

export function ProductionTable({
    data,
}: DataTableProps) {

    const {  mutate } = useUpdateOrderItemStatusMutation()

    const [sorting, setSorting] = useState<SortingState>([])

    const [openedCustomerProductId, setOpenedCustomerProductId] = useState<string | null>(null)

    const columnHelper = createColumnHelper<Items>();

    const columns = [
        columnHelper.accessor("customerProductId", {
            header: "Produto"
        }),
        columnHelper.accessor("customerProductName", {
            header: "Variante"
        }),
        columnHelper.accessor("totalQuantity", {
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        className="hover:bg-inherit hover:text-inherit p-0"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "desc")}

                    >
                        Quantidade
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                )
            },
            cell: ({ row }) => {
                const item = row.original

                return (
                    <p className="text-center">{item.totalQuantity}</p>
                )
            }
        }),
        columnHelper.accessor("status", {
            header: () => <div className="text-center">Status</div>,
            cell: ({ row }) => {
                const item = row.original
                const color = item.status == "Production" ? "bg-sky-600" : "bg-amber-600"
                return (
                    <div className="flex justify-center">
                        <Badge className={color}>{item.status}</Badge>
                    </div>
                )
            },
        }),
        columnHelper.display({
            id: "actions",
            header: () => <div className="text-center">Ações</div>,
            cell: ({ row }) => {
                const item = row.original

                return (
                    <div className="flex justify-center">

                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="h-8 w-8 p-0">
                                    <span className="sr-only">Open menu</span>
                                    <MoreHorizontal className="h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => navigator.clipboard.writeText(item.referenceFileUrl)}>
                                    Link do Gabarito
                                    <Copy className="ml-2 h-4 w-4" />
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={() => mutate({ id: item.customerProductId })}>Marcar em produção</DropdownMenuItem>
                                <DropdownMenuItem onClick={() => setOpenedCustomerProductId(item.customerProductId)}>
                                    Dar Baixa
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>


                    </div >
                )
            },
        }),
    ]

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        state: {
            sorting,
        },
    })

    return (
        <div className="pt-10">
            {openedCustomerProductId && (
                <ModalUpdateProduct itemId={openedCustomerProductId} open={!!openedCustomerProductId} onClose={() => setOpenedCustomerProductId(null)} />
            )}
            <Table className="bg-background ">
                <TableHeader>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map((header) => {
                                return (
                                    <TableHead key={header.id}>
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )}
                                    </TableHead>
                                )
                            })}
                        </TableRow>
                    ))}
                </TableHeader>
                <TableBody>
                    {table.getRowModel().rows?.length ? (
                        table.getRowModel().rows.map((row) => (
                            <TableRow
                                key={row.id}
                                data-state={row.getIsSelected() && "selected"}
                            >
                                {row.getVisibleCells().map((cell) => (
                                    <TableCell key={cell.id}>
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={columns.length} className="h-24 text-center">
                                No results.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    )
}