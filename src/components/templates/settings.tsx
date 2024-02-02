import { Sidebar } from "@/components/organisms/sidebar";

export function SettingsPage() {
    return (
        <>
            <div className="">
                <div className="bg-background">
                    <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 h-screen">
                        <Sidebar className=" sticky md:col-span-1 md:h-full "></Sidebar>
                        <div className="min-h-svh md:col-span-3 lg:col-span-4 lg:border-l bg-zinc-700 overflow-auto">
                            <h1 className="text-4xl px-4 md:mb-2 text-center">Settings</h1>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}