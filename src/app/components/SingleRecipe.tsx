import { Recipe } from "@/types";
import React from "react";
import { useRouter } from "next/navigation";
import { QuestionMarkCircleIcon } from "@heroicons/react/24/solid";

const SingleRecipe = ({ recipe }: { recipe: Recipe }) => {
  const router = useRouter();

  return (
    <div
      title={recipe.title}
      onClick={() => router.push("/recipes/" + recipe.id!)}
      className="w-60 h-40 shadow-lg rounded-lg flex-grow max-w-[400px] min-w-[320px] cursor-pointer p-2 flex gap-4 overflow-hidden"
    >
      {recipe.imageUrl ? (
        <img
          className="w-36 h-36 object-cover rounded-lg bg-gray-100"
          src={recipe.imageUrl}
          alt="recipe image"
        />
      ) : (
        <div className="object-cover rounded-lg bg-slate-200">
          <QuestionMarkCircleIcon className="text-white w-36 h-36" />
        </div>
      )}
      <div className="flex flex-col justify-center gap-2">
        <span className="text-lg whitespace-nowrap overflow-hidden text-ellipsis">
          {recipe.title === "" ? "Unnamed recipe" : recipe.title}
        </span>
        <span className="text-sm opacity-80 text-ellipsis overflow-hidden whitespace-nowrap">
          Cooking time: {recipe.cookingTime ?? recipe.cookingTime + recipe.preparationTime} min
        </span>
        <span className="text-xs opacity-70 w-[124px] whitespace-nowrap overflow-hidden text-ellipsis">
          By: {recipe.author?.name}
        </span>
      </div>
    </div>
  );
};

export default SingleRecipe;
