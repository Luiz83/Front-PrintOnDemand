import { cn } from "@/app/lib/utils";
import { NavLink } from "@/components/molecules/navLink";
import { Separator } from "@/app/components/ui/separator";
import { LayoutDashboard, Factory, Settings2 } from "lucide-react"

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {

}

export function Sidebar({ className }: SidebarProps) {
    return (
        <div className={cn("md:pb-12", className)}>
            <div className="md:space-y-4 md:py-1 h-auto ">
                <div className="px-3 py-2 my-auto flex item-center md:block">
                    <div className="flex flex-col justify-center md:block">
                        <p className="text-2xl px-4 md:mb-2 text-center">
                            Print<span className="font-bold italic">Ink</span>
                        </p>
                    </div>
                    <Separator className="hidden md:block w-11/12 mx-auto mb-3 bg-muted-foreground"></Separator>
                    <div className="md:space-y-1 flex md:block">
                        <NavLink path="/dashboard" Icon={LayoutDashboard}>Dashboard</NavLink>
                        <NavLink path="/production" Icon={Factory}>Produção</NavLink>
                        <NavLink path="/settings" Icon={Settings2}>Configurações</NavLink>
                    </div>
                </div>
            </div>
        </div >
    )
}