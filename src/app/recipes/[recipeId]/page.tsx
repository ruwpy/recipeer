"use client";

import React, { useState } from "react";
import { redirect, usePathname } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { Recipe } from "@/types";
import Loading from "@/components/Loading";
import { AnimatePresence, motion as m } from "framer-motion";
import { appearVariants } from "@/components/Recipes";
import Button from "@/components/ui/Button";
import { QuestionMarkCircleIcon } from "@heroicons/react/24/solid";
import { getCurrentUser } from "@/lib/session";

const RecipePage = async () => {
  const recipeId = usePathname()!.split("/")[2];
  const [recipe, setRecipe] = useState<Recipe>();
  const [isRecipeLoading, setIsRecipeLoading] = useState(true);
  const [isNotFound, setIsNotFound] = useState(false);
  const user = await getCurrentUser();

  if (!user) redirect("/login");

  useQuery(
    ["singlerecipe"],
    async () => {
      return (await axios.get<Recipe>("/api/recipes/" + recipeId)).data;
    },
    {
      onSuccess: (data) => {
        setRecipe(data);
        setIsRecipeLoading(false);
      },
      onError: (error: AxiosError) => {
        if (error?.response?.status === 404) {
          setIsNotFound(true);
          setIsRecipeLoading(false);
        }
      },
    }
  );

  const addIngredientsToShopList = () => {
    console.log("awdawdasda");
  };

  if (isNotFound)
    return (
      <div className="text-center mx-auto">
        <h1 className="text-7xl font-semibold">404</h1>
        <p className="text-xl mt-2">Recipe was not found</p>
      </div>
    );

  return (
    <AnimatePresence>
      <m.div animate="animate" initial="initial" exit="initial">
        {isRecipeLoading ? (
          <Loading />
        ) : (
          <m.div variants={appearVariants} className="pb-28">
            <h1
              title={recipe?.title}
              className="font-bold text-4xl md:text-5xl w-[300px] md:w-[700px] lg:w-[1000px] overflow-hidden text-ellipsis whitespace-nowrap"
            >
              {recipe?.title ? recipe.title : "Unnamed recipe"}
            </h1>
            <span className="mt-2 inline-block">
              <span className="opacity-60">Recipe by:</span> <span>{recipe?.author?.name}</span>
            </span>
            <div className="flex flex-col md:flex-row md:items-start gap-10 mt-6">
              <div className="w-full md:w-[288px] flex-shrink-0">
                {recipe?.imageUrl ? (
                  <img
                    className="w-72 h-72 object-cover rounded-lg mx-auto"
                    src={recipe?.imageUrl}
                    alt="image of a recipe"
                  />
                ) : (
                  <QuestionMarkCircleIcon className="text-white w-72 h-72 bg-slate-200 rounded-lg mx-auto" />
                )}
                <div className="w-72 mx-auto flex-shrink-0 flex mt-4 flex-col gap-2">
                  <Button
                    onClick={() =>
                      navigator.clipboard.writeText(
                        "https://recipeer.vercel.app/recipes/" + recipe?.id
                      )
                    }
                    buttonStyle="accent"
                    className="w-full py-2"
                  >
                    Share recipe
                  </Button>
                  <Button
                    disabled={!recipe?.ingredients.length}
                    onClick={() => addIngredientsToShopList()}
                    className="w-full py-2 md:hidden"
                  >
                    Add ingredients to shopping list
                  </Button>
                  <Button className="w-full py-2 md:hidden">Add recipe to my list</Button>
                </div>
                <span className="inline-block font-medium mt-4 text-lg">Ingredients</span>
                <div className="mt-2 flex flex-col gap-2">
                  {recipe?.ingredients.length ? (
                    recipe?.ingredients.map((ingredient) => {
                      return (
                        <div
                          className="flex relative bg-gray-100 rounded-lg justify-between before:content-['·'] flex-nowrap before:absolute min-h-[35px] before:left-2 before:text-3xl before:opacity-50 items-center pl-6 flex-shrink-0"
                          key={ingredient.id}
                        >
                          <span className="break-all h-fit">{ingredient.value}</span>
                        </div>
                      );
                    })
                  ) : (
                    <p className="opacity-80">There are no ingredients in this recipe</p>
                  )}
                </div>
              </div>
              <div className="w-full">
                <span className="font-medium text-lg">Directions</span>
                <div className="mt-2 flex flex-col gap-2">
                  {recipe?.directions.length ? (
                    recipe?.directions.map((direction) => {
                      return (
                        <div
                          className="flex relative justify-between flex-nowrap min-h-[35px] items-center pl-6 flex-shrink-0"
                          key={direction.id}
                        >
                          <span className="absolute flex-shrink-0 left-0 text-sm flex w-6 h-6 leading-none justify-center items-center bg-gray-100 rounded-full">
                            <span className="opacity-70">{direction.order}</span>
                          </span>
                          <span className="break-all h-fit ml-2">{direction.value}</span>
                        </div>
                      );
                    })
                  ) : (
                    <p className="opacity-80">There are no directions in this recipe</p>
                  )}
                </div>
              </div>
              <div className="w-48 flex-shrink-0 flex flex-col gap-2 max-md:hidden">
                <Button
                  disabled={!recipe?.ingredients.length}
                  onClick={() => addIngredientsToShopList()}
                  className="w-full py-2"
                >
                  Add ingredients to shopping list
                </Button>
                <Button className="w-full py-2">Add recipe to my recipes</Button>
              </div>
            </div>
          </m.div>
        )}
      </m.div>
    </AnimatePresence>
  );
};

export default RecipePage;
