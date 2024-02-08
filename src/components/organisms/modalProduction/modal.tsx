import { Button } from "@/app/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/app/components/ui/dialog";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { useState, useRef } from "react";
import { useUpdateOrderItemMutation } from "@/hooks/mutations/updateOrderItemMutation";
import { Alert, AlertDescription, AlertTitle } from "@/app/components/ui/alert";
import { Terminal } from "lucide-react";
import { toast } from 'sonner'

interface Props extends React.HTMLAttributes<HTMLDivElement> {
    itemId: string
    open: boolean
    onClose: () => void
}

export type UpdateOrderItemStatusResponseModel = {
    missingItems: number
    excessItems: number
}

export function ModalUpdateProduct({ itemId, children, open, onClose }: Props) {

    const [quantity, setQuantity] = useState("0")
    const { isLoading, mutateAsync } = useUpdateOrderItemMutation()
    const handleUpdateOrderItem = async () => {
        const res = await mutateAsync({ id: itemId, quantity })
        if (res.excessItems == 0 && res.missingItems == 0)
            return toast.success("Muito Bem!", {
                description: "Itens baixados com sucesso",
            })
        toast.warning("Atenção!", {
            description: `${res.missingItems} item(s) faltaram para completar um pedido.\n ${res.excessItems} item(s) está sobrando`,
        })
    }

    return (
        <>
            <Dialog open={open}>
                {children}
                <DialogContent className="sm:max-w-[425px]" onClose={onClose}>
                    <DialogHeader>
                        <DialogTitle>Baixa de produto</DialogTitle>
                        <DialogDescription>
                            Insira a quantidade de produtos que deseja atualizar como "Feito"
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="quantity" className="text-right">
                                Quantidade
                            </Label>
                            <Input
                                id="quantity"
                                defaultValue="0"
                                className="col-span-3"
                                onChange={(e) => setQuantity(e.target.value)}
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button onClick={handleUpdateOrderItem}>{isLoading ? "..." : "Atualizar"}</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog >
        </>
    )
}