/* eslint-disable @next/next/no-img-element */
"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { RiBug2Fill } from "react-icons/ri";
import classNames from "classnames";
import { useSession } from "next-auth/react";
import { routes as loginRoutes } from "./routes/routes";

const NavBar = () => {
  const { data: session, status } = useSession();
  const pathName = usePathname();
  const routes = [
    { url: "/", name: "Dashboard" },
    { url: "/issues", name: "Issues" },
  ];
  return (
    <nav className="flex space-x-6 border-b mb-5 px-5 h-14 items-center justify-between">
      <div className="flex items-center space-x-6">
        <Link href="/">
          <RiBug2Fill />
        </Link>
        <ul className="flex space-x-6">
          {routes.map((route) => (
            <li key={route.url}>
              <Link
                className={classNames({
                  "text-zinc-900": route.url === pathName,
                  "text-zinc-500": route.url !== pathName,
                  "hover:text-zinc-800 transition-colors": true,
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
        {status === "authenticated" && (
          <Link href={loginRoutes.signOut.href}>
            {loginRoutes.signOut.label}
          </Link>
        )}
        {status === "unauthenticated" && (
          <Link href={loginRoutes.signIn.href}>{loginRoutes.signIn.label}</Link>
        )}
        {session?.user && <p>{session.user.name}</p>}
        {session?.user && session.user.image && (
          <img
            className="rounded-full w-10 h-10"
            src={session.user.image}
            alt="profile-photo"
          />
        )}
      </div>
    </nav>
  );
};

export default NavBar;
