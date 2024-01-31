import { Sidebar } from "@/components/organisms/sidebar";

export function HomePage() {
    return (
        <>
            <div className="">
                <div className="bg-background">
                    <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 h-screen">
                        <Sidebar className="bg-zinc-300 sticky md:col-span-1 md:h-full"></Sidebar>
                        <div className="col-span-3  lg:col-span-4 lg:border-l bg-zinc-700 overflow-auto">
                            <div className="w-32 h-96 bg-cyan-950 mx-auto"></div>
                            <div className="w-32 h-96 bg-cyan-950 mx-auto"></div>
                            <div className="w-32 h-96 bg-cyan-950 mx-auto"></div>
                            <div className="w-32 h-96 bg-cyan-950 mx-auto"></div>
                            <div className="w-32 h-96 bg-cyan-950 mx-auto"></div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}