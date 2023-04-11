"use client";

import { signOut } from "next-auth/react";
import Button from "../common/Button";

export default function Login() {
  return (
    <Button className="bg-white" onClick={() => signOut()}>
      Sign out
    </Button>
  );
}
