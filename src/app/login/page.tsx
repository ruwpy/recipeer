"use client";

import { signIn } from "next-auth/react";
import Button from "@/components/ui/Button";
import { useSearchParams } from "next/navigation";

export default function Login() {
  const searchParams = useSearchParams();

  const onSubmit = async () => {
    await signIn("google", {
      redirect: false,
      callbackUrl: searchParams?.get("from") || "/",
    });
  };

  return (
    <div>
      <div className="text-center h-fit bg-white w-80 p-4 mx-auto flex flex-col justify-center items-center rounded-lg">
        <h1 className="font-medium text-3xl">Welcome to Recipeer</h1>
        <p className="mb-4 mt-2 text-sm opacity-80">Choose login option to authenticate</p>
        <Button onClick={() => onSubmit()} className="w-full mt-4">
          Google
        </Button>
      </div>
    </div>
  );
}
