import { Sidebar } from "@/components/organisms/sidebar";
import { ProductionTable } from "../organisms/productionTable/data-table";
import { columns } from "../organisms/productionTable/columns";
import axiosClient from "@/services/AxiosClient";
import { useQuery } from "react-query";


export function DashboardPage() {
    const { data, isError, isLoading } = useQuery(['items'], () => axiosClient.get('/Events/report?date=17%2F01%2F2024').then((res) => res.data))

    return (
        <>
                <div className="">
                    <div className="bg-background">
                        <div className="flex flex-col md:grid md:grid-cols-4 lg:grid-cols-5 h-screen">
                            <Sidebar className="bg-zinc-300 drop-shadow-md sticky md:col-span-1 h-auto md:h-full"></Sidebar>
                            <div className="min-h-svh md:col-span-3  lg:col-span-4 lg:border-l bg-zinc-200 overflow-auto">
                                <div className="w-4/5 mx-auto">
                                    <div className="container pt-10 mx-auto ">
                                        {isLoading ? <p>Carregando</p> : <ProductionTable columns={columns} data={data} />}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        </>
    )
}