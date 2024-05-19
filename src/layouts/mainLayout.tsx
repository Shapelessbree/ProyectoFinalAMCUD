"use client";

import { ReactNode } from "react";
import { Header } from "@/components/header/header"; // Asegúrate de que la importación sea correcta

interface MainLayoutProps {
  paddingTop?: string;
  children: ReactNode;
}

export const MainLayout = ({
  children,
  paddingTop,
}: MainLayoutProps) => {
  return (
    <main className="flex flex-col h-screen overflow-hidden bg-background-blue rounded-2xl">
      <Header />
      <div className={`flex flex-col w-full h-full ${paddingTop ? paddingTop : "pt-10"}`}>
        <div className="overflow-auto w-full h-full px-10 pb-8">
          {children}
        </div>
      </div>
    </main>
  );
};
