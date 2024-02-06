import axiosClient from "@/services/AxiosClient"
import { useMutation, useQueryClient } from "react-query"

export function useUpdateOrderItemStatusMutation() {

    const queryClient = useQueryClient()

    return useMutation(
        (params: {id: string}) => axiosClient.put('/Events/orderItems/status', null, { params }),
        {
            onSuccess: () => {
                queryClient.invalidateQueries('items')
            }
        })
}