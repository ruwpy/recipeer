import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import Logout from "./auth/Logout";
import UserMenu from "./UserMenu";

export default async function Navbar() {
  const session = await getServerSession(authOptions);

  return (
    <nav className="z-50 fixed items-center max-w-7xl mx-auto top-0 left-0 right-0 px-4 pt-4 flex justify-between">
      {session && (
        <>
          <UserMenu session={session} />
          <Logout />
        </>
      )}
    </nav>
  );
}
