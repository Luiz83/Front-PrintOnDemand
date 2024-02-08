import { UpdateOrderItemStatusResponseModel } from "@/components/organisms/modalProduction/modal"
import axiosClient from "@/services/AxiosClient"
import { useMutation, useQueryClient } from "react-query"

export function useUpdateOrderItemMutation() {

    const queryClient = useQueryClient()

    return useMutation(
        (params: {id: string, quantity: string}) => axiosClient.put<UpdateOrderItemStatusResponseModel, null>('/Events/orderItems/update', null, { params }),
        {
            onSuccess: () => {
                queryClient.invalidateQueries('items')
            }
        })
}