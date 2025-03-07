import React from "react";
import classNames from "classnames";
import { NavLink, Sidebar } from "@ui/organisms/Sidebar/Sidebar";
import { ScrollView } from "@ui/layouts/ScrollView/ScrollView";
import { BottomNav } from "@/ui/organisms/Nav/BottomNav/BottomNav";
import { TopNav } from "@/ui/organisms/Nav/TopNav/TopNav";

interface AppLayoutProps extends React.ComponentProps<"div"> {
  links: NavLink[];
}

export function AppLayout(props: AppLayoutProps) {
  const { children, className, links, ...rest } = props;
  const cn = classNames("w-full h-full flex flex-row bg-white pt-[61px] md:pt-0", className);

  return (
    <section className={cn} {...rest}>
      <Sidebar links={links} className="hidden md:flex"/>
      <BottomNav links={links} className="md:hidden"/>
      <TopNav className="md:hidden"/>

      <section className={"w-full h-full"}>
        <section
          className={
            "w-full h-full  border-solid border-l-[1px] border-r-[1px] border-gray-200"
          }
        >
          <ScrollView>{children}</ScrollView>
        </section>
      </section>

      <section className={"hidden lg:inline-block w-full max-w-60 h-full"}>
        {/* <section
          className={
            "w-full h-full"
          }
        >
          <ScrollView><div className="bg-white h-10">Post favoris</div></ScrollView>
        </section> */}
      </section>
    </section>
  );
}
