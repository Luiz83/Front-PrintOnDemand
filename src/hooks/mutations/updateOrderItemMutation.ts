import axiosClient from "@/services/AxiosClient"
import { useMutation, useQueryClient } from "react-query"

export function useUpdateOrderItemMutation() {

    const queryClient = useQueryClient()

    return useMutation(
        (params: {itemId: string, quantity: string}) => axiosClient.put('/Events/orderItems/update', null, { params }),
        {
            onSuccess: () => {
                queryClient.invalidateQueries('items')
            }
        })
}