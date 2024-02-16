import { Sidebar } from "@/components/organisms/sidebar";
import buildingImg from "../../assets/img/building.png"

export function SettingsPage() {
    return (
        <>
        <div className="">
            <div className="bg-background">
                <div className="flex flex-col md:grid md:grid-cols-4 lg:grid-cols-5 h-screen">
                    <Sidebar className="bg-zinc-300 drop-shadow-md sticky md:col-span-1 h-auto md:h-full"></Sidebar>
                    <div className="min-h-svh md:col-span-3  lg:col-span-4 lg:border-l bg-zinc-200 overflow-auto">
                        <div className="container px-0 md:px-8 md:w-4/5 flex items-start h-full ">
                            <div className="w-full pt-8 md:pt-0 md:self-center px-2">
                                <h2 className="text-2xl text-center sm:text-4xl">Nada por aqui ainda!</h2>
                                <img className="h-auto mx-auto md:max-w-md dark:shadow-gray-800" src={buildingImg} alt="" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
    )
}