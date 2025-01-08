"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { RiBug2Fill } from "react-icons/ri";
import classNames from "classnames";

const NavBar = () => {
  const pathName = usePathname();
  const routes = [
    { url: "/", name: "Dashboard" },
    { url: "/issues", name: "Issues" },
  ];
  return (
    <nav className="flex space-x-6 border-b mb-5 px-5 h-14 items-center">
      <Link href="/">
        <RiBug2Fill />
      </Link>
      <ul className="flex space-x-6">
        {routes.map((route) => (
          <Link
            key={route.url}
            className={classNames({
              "text-zinc-900": route.url === pathName,
              "text-zinc-500": route.url !== pathName,
              "hover:text-zinc-800 transition-colors": true,
            })}
            href={route.url}
          >
            {route.name}
          </Link>
        ))}
      </ul>
    </nav>
  );
};

export default NavBar;
