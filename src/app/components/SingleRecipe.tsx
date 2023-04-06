import { Recipe } from "@/types";
import React from "react";

const SingleRecipe = ({ recipe }: { recipe: Recipe }) => {
  return (
    <div className="w-60 h-40 shadow-lg rounded-lg flex-grow max-w-[300px]">{recipe.title}</div>
  );
};

export default SingleRecipe;
