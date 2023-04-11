import React, { ReactNode } from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import Login from "./Login";

const AuthWrapper = async ({ children }: { children: ReactNode }) => {
  const session = await getServerSession(authOptions);

  return session?.user ? children : <Login />;
};

export default AuthWrapper;
