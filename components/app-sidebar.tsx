"use client";

import { CircleDollarSign, CreditCard, HandCoins } from "lucide-react";
import * as React from "react";

import { NavMain } from "@/components/nav-main";
import { Sidebar, SidebarContent, SidebarRail } from "@/components/ui/sidebar";

const data = {
  navMain: [
    {
      title: "Ganhos",
      url: "/ganhos",
      icon: HandCoins,
    },
    {
      title: "Gastos",
      url: "",
      icon: CircleDollarSign,
      items: [
        {
          title: "Listar gastos fixos",
          url: "/gastos-fixos",
        },
        {
          title: "Adicionar gasto fixo",
          url: "/gastos-fixos/adicionar",
        },
      ],
    },
    {
      title: "Cartões de crédito",
      url: "",
      icon: CreditCard,
      items: [
        {
          title: "Listar cartões de crédito",
          url: "/cartoes-credito",
        },
        {
          title: "Adicionar cartão de crédito",
          url: "/cartoes-credito/adicionar",
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarContent>
        <NavMain menuItems={data.navMain} />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
