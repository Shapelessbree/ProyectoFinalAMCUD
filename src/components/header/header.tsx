"use client";

import React from "react";
import { headerData } from "./headerData";
import { HeaderItem } from "./headerItem";

export const Header = () => {
  return (
    // Componente header modificado para el encabezado
      <div className={`bg-grey rounded-2xl my-4 mx-4 flex-row justify-between items-center 
        text-center shadow relative h-12 w-full flex`}>
        <section className="flex flex-row gap-4 w-full">
          {headerData.map((item, index) => (
            <HeaderItem
              key={index}
              title={item.title}
              path={item.path}
            />
          ))}
        </section>
      </div>


  );
};
