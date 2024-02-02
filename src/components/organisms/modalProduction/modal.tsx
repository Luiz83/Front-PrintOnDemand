import { Button } from "@/app/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/app/components/ui/dialog";
import { DropdownMenu } from "@/app/components/ui/dropdown-menu";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import axiosClient from "@/services/AxiosClient";
import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { Items } from "../productionTable/columns";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
    itemId: string
}

export function ModalUpdateProduct({ itemId, children }: Props) {

    const [quantity, setQuantity] = useState("0")

    const queryClient = useQueryClient()

    const { isLoading, mutate } = useMutation(
        () => axiosClient.put('/Events/orderItems/update', null, { params: { id: itemId, quantity: quantity } }),
        {
            onSuccess: () =>{
                queryClient.invalidateQueries('items')
            }
        })

    return (
        <>
            <Dialog >
                {children}
                <DialogContent className="sm:max-w-[425px]">
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
                        <Button onClick={() => mutate()}>Atualizar</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog >
        </>
    )
}