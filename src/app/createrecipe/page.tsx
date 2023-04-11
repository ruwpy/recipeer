import React from "react";
import RecipeForm from "@/components/RecipeForm";

const CreateRecipe = () => {
  return (
    <div>
      <h1 className="font-bold text-4xl md:text-5xl">Create a new recipe</h1>
      <RecipeForm />
    </div>
  );
};

export default CreateRecipe;
