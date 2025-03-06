"use client";

import classNames from "classnames";
import { NavLink } from "../../Sidebar/Sidebar";
import { Stack } from "@ui/layouts/Stack/Stack";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { VisibilityToggle } from "@/ui/molecules/VisibilityToggle/VisibilityToggle";
import { Avatar } from "@/ui/atoms/Avatar/Avatar";
import Logo from "@/ui/atoms/Logo/Logo";

interface TopNavProps extends React.ComponentProps<"section"> {}

export function TopNav(props: TopNavProps) {
  const { className, ...rest } = props;
  const cn = classNames(
    className,
    "fixed top-0 left-0 right-0 z-50 border-solid border-b-[1px] border-gray-200"
  );
  const pathname = usePathname();

  return (
    <section className={cn} {...rest}>
      <Stack
        direction="row"
        className="py-1 px-4 border-b-[1px] border-solid border-gray-200"
        align="center"
        justify="space-between"
      >
        <Avatar />
        <Logo size="sm" />
        <div></div>
      </Stack>
    </section>
  );
}
