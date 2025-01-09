"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { RiBug2Fill } from "react-icons/ri";
import classNames from "classnames";
import { Container } from "@radix-ui/themes";
import AuthStatus from "./components/AuthStatus";

const NavBar = () => {
  const pathName = usePathname();
  const routes = [
    { url: "/", name: "Dashboard" },
    { url: "/issues", name: "Issues" },
  ];
  return (
    <Container className="py-3 px-5 border-b">
      <nav className="flex space-x-6 items-center justify-between">
        <div className="flex items-center space-x-6">
          <Link href="/">
            <RiBug2Fill />
          </Link>
          <ul className="flex space-x-6">
            {routes.map((route) => (
              <li key={route.url}>
                <Link
                  className={classNames({
                    "nav-link": true,
                    "text-zinc-900": route.url === pathName,
                  })}
                  href={route.url}
                >
                  {route.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex space-x-5 items-center">
          <AuthStatus />
        </div>
      </nav>
    </Container>
  );
};

export default NavBar;
