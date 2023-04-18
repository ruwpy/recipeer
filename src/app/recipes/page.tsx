import React from "react";
import Recipes from "@/components/Recipes";
import { getCurrentUser } from "@/lib/session";
import { redirect } from "next/navigation";

const RecipesPage = async () => {
  const user = await getCurrentUser();

  if (!user) redirect("/login");

  return (
    <div>
      <h1 className="font-bold text-4xl md:text-5xl">My recipes</h1>
      <Recipes />
    </div>
  );
};

export default RecipesPage;
