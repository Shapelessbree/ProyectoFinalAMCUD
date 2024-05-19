"use client";

import { ReactElement, useMemo } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface Props {
  path: string;
  title: string;
}

export const HeaderItem: React.FC<Props> = ({
  title,
  path,
}: Props): ReactElement => {
  const pathName = usePathname() ?? "";
  const isActiveItem = useMemo(
    () =>
      (path: string): boolean => {
        return path != "/"
          ? pathName.includes(path.replace("/", ""))
          : pathName == path;
      },
    [pathName]
  );

  return (
    <Link
      className={`flex items-center h-8 px-12 ${isActiveItem(path)
        ? "bg-gray bg-red-400"
        : "bg-transparent bg-red-400"
      }`}
      href={path}
      style={{ borderRadius: "0.5rem" }} // Ajusta el radio de borde según tu preferencia
    >
      <div className="flex items-center gap-2">
        <span className="text-m font-medium">
          {title}
        </span>
      </div>
    </Link>
  );
  
};
