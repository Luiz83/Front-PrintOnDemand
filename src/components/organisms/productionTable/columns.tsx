import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/app/components/ui/button"
import { Badge } from "@/app/components/ui/badge"
import { MoreHorizontal, ArrowUpDown, Copy } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/app/components/ui/dropdown-menu"
import { ModalUpdateProduct } from "../modalProduction/modal"
import { DialogTrigger } from "@/app/components/ui/dialog"

export type Items = {
    customerProductId: string
    customerProductName: string,
    totalQuantity: number,
    status: string
    referenceFileUrl: string
}

export const columns: ColumnDef<Items>[] = [
    {
        accessorKey: "customerProductId",
        header: "Produto",
    },
    {
        accessorKey: "customerProductName",
        header: "Variante",
    },
    {
        accessorKey: "totalQuantity",
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
    },
    {
        accessorKey: "status",
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
        
    },
    {
        accessorKey: "actions",
        header: () => <div className="text-center">Ações</div>,
        cell: ({ row }) => {
            const item = row.original

            return (
                <div className="flex justify-center">
                    <ModalUpdateProduct itemId={item.customerProductId}>
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
                                <DropdownMenuItem>Marcar em produção</DropdownMenuItem>
                                <DialogTrigger asChild>
                                    <DropdownMenuItem>
                                        Dar Baixa
                                    </DropdownMenuItem>
                                </DialogTrigger>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </ModalUpdateProduct>

                </div>
            )
        },
    },

]