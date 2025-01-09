/* eslint-disable @next/next/no-img-element */
"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";
import { routes } from "../routes/routes";

const AuthStatus = () => {
  const { data: session, status } = useSession();
  return (
    <>
      {status === "authenticated" && (
        <Link className="nav-link" href={routes.signOut.href}>
          {routes.signOut.label}
        </Link>
      )}
      {status === "unauthenticated" && (
        <Link className="nav-link" href={routes.signIn.href}>
          {routes.signIn.label}
        </Link>
      )}
      {session?.user && <p>{session.user.email}</p>}
      {session?.user && session.user.image && (
        <img
          className="rounded-full w-10 h-10"
          src={session.user.image}
          alt="profile-photo"
        />
      )}
    </>
  );
};

export default AuthStatus;
