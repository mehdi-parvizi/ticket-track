import Link from "next/link";
import React from "react";
import { RiBug2Fill } from "react-icons/ri";

const NavBar = () => {
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
            className="text-zinc-500 hover:text-zinc-800 transition-colors"
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
