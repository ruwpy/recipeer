import React from "react";
import RecipeForm from "@/components/RecipeForm";
import { getCurrentUser } from "@/lib/session";
import { redirect } from "next/navigation";

const CreateRecipe = async () => {
  const user = await getCurrentUser();

  if (!user) redirect("/login");

  return (
    <div>
      <h1 className="font-bold text-4xl md:text-5xl">Create a new recipe</h1>
      <RecipeForm />
    </div>
  );
};

export default CreateRecipe;
