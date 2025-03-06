"use client";

import classNames from "classnames";
import { NavLink } from "../../Sidebar/Sidebar"
import { Stack } from "@ui/layouts/Stack/Stack";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { VisibilityToggle } from "@/ui/molecules/VisibilityToggle/VisibilityToggle";


interface BottomNavProps extends React.ComponentProps<"section"> {
    links: NavLink[],
}

export function BottomNav(props: BottomNavProps) {
    const {className, links, ...rest} = props;
    const cn = classNames(className, "bottom__nav fixed bottom-0 left-0 right-0 z-[1000000000000000000000] border-solid border-t-[1px] border-gray-200 bg-white");
    const pathname = usePathname();

    return <section className={cn} {...rest}>
        <Stack direction="row" className="px-6" align="center" justify={"space-between"}>
            {links.map((link) => {
                console.log(link, pathname);
                return <Link href={link.href} className="relative flex items-center justify-center w-full py-4" key={link.name}>
                    {link.icon}
                    <VisibilityToggle visible={link.href == pathname}>
                        <span className="absolute h-1 w-1 bg-black bottom-2 rounded-full"></span>
                    </VisibilityToggle>
                </Link>
            })}
        </Stack>
    </section>
}