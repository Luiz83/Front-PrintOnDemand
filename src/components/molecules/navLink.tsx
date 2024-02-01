import { Button } from "@/app/components/ui/button";
import { cn } from "@/app/lib/utils";
import { Link, useLocation } from "react-router-dom";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode,
    Icon: React.ElementType,
    path: string
}

export function NavLink({ children, Icon, path, className }: Props) {
    const { pathname } = useLocation()
    return (
        <>
            <Link to={path} >
                <Button variant={pathname == path ? "secondary" : "ghost"} className={cn("w-full justify-start", className)}>
                    {Icon && <Icon className="xs:mr-2 h-4 w-4" />}
                    <span className="hidden xs:block">{children}</span>
                </Button>
            </Link>
        </>
    )
}