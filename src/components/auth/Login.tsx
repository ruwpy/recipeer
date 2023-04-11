"use client";

import { signIn } from "next-auth/react";
import Button from "../common/Button";

export default function Login() {
  return (
    <div className="inset-0 fixed">
      <div className="text-center border bg-white border-gray-300 w-60 p-4 absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 flex flex-col justify-center items-center rounded-lg shadow-md">
        <h1 className="font-bold text-xl mb-4">Welcome to RecipeKeeper!</h1>
        <p className="mb-4 w-40">store all your recipes in one place!</p>
        <Button onClick={() => signIn()}>Sign in with Google</Button>
      </div>
    </div>
  );
}
