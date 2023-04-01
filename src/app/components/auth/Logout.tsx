"use client";

import { signOut } from "next-auth/react";
import Button from "../common/Button";

export default function Login() {
  return <Button onClick={() => signOut()}>Sign out</Button>;
}
