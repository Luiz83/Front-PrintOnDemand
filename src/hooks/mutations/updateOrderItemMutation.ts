import { UpdateOrderItemStatusResponseModel } from "@/components/organisms/modalProduction/modal"
import axiosClient from "@/services/AxiosClient"
import { useMutation, useQueryClient } from "react-query"

export function useUpdateOrderItemMutation() {

    const queryClient = useQueryClient()

    return useMutation(
        async (params: {id: string, quantity: string}) => {
            const {data} = await axiosClient.put<UpdateOrderItemStatusResponseModel>('/Events/orderItems/update', null, { params })
            return data
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries('items')
            }
        })
}