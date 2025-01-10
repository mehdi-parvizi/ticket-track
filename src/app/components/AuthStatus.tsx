/* eslint-disable @next/next/no-img-element */
"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";
import { routes } from "../routes/routes";
import Skeleton from "./Skeleton";
import { DropdownMenu } from "@radix-ui/themes";

const AuthStatus = () => {
  const { data: session, status } = useSession();
  return (
    <>
      {status === "loading" && <Skeleton width="3rem" />}
      {status === "authenticated" && (
        <Link className="nav-link md:block hidden" href={routes.signOut.href}>
          {routes.signOut.label}
        </Link>
      )}
      {status === "unauthenticated" && (
        <Link className="nav-link" href={routes.signIn.href}>
          {routes.signIn.label}
        </Link>
      )}
      {status === "authenticated" && (
        <DropdownMenu.Root>
          <DropdownMenu.Trigger className="block md:hidden">
            <img
              className="rounded-full w-10 h-10"
              src={session.user!.image!}
              alt="profile-photo"
            />
          </DropdownMenu.Trigger>
          <DropdownMenu.Content>
            <DropdownMenu.Item>
              {session.user && <p>{session.user.email}</p>}
            </DropdownMenu.Item>
            <DropdownMenu.Item>
              <Link className="nav-link" href={routes.signOut.href}>
                {routes.signOut.label}
              </Link>
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      )}
      {session?.user && <p className="md:block hidden">{session.user.email}</p>}
      {session?.user && session.user.image && (
        <img
          className="rounded-full w-10 h-10 md:block hidden"
          src={session.user.image}
          alt="profile-photo"
        />
      )}
    </>
  );
};

export default AuthStatus;
