import React from "react";
import Recipes from "../components/Recipes";

const RecipesPage = () => {
  return (
    <div>
      <h1 className="font-bold text-4xl md:text-5xl">My recipes</h1>
      <Recipes />
    </div>
  );
};

export default RecipesPage;
