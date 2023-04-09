"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import useRecipeStore from "@/stores/useRecipesStore";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/solid";
import Button from "./common/Button";
import { AnimatePresence, Variants, motion as m } from "framer-motion";
import { RecipeApiResponse } from "@/pages/api/recipes";
import SingleRecipe from "./SingleRecipe";
import Loading from "./Loading";

export const appearVariants: Variants = {
  animate: {
    opacity: 1,
  },
  initial: {
    opacity: 0,
  },
};

const Recipes = () => {
  const [page, setPage] = useState(1);
  const { isLoading, recipes, setRecipes } = useRecipeStore();
  const [maxPage, setMaxPage] = useState(1);
  const [isQueryLoading, setIsQueryLoading] = useState(false);

  useQuery(
    ["recipes", page],
    async () => {
      return (await axios.get(`api/recipes?page=${page}`)).data;
    },
    {
      onSuccess: (data: RecipeApiResponse) => {
        setIsQueryLoading(false);
        setRecipes(data.recipes);
        setMaxPage(Math.ceil(data.recipesLength / 6));
      },
    }
  );

  const pageIncrement = () => {
    setIsQueryLoading(true);
    setRecipes([]);
    setPage((prev) => (page === maxPage ? maxPage : prev + 1));
  };
  const pageDecrement = () => {
    setIsQueryLoading(true);
    setRecipes([]);
    setPage((prev) => (page === 1 ? 1 : prev - 1));
  };

  return (
    <AnimatePresence mode="wait">
      <m.div animate="animate" initial="initial" exit="initial">
        {isLoading ? (
          <Loading />
        ) : (
          <m.div variants={appearVariants}>
            <div className="flex items-start justify-center md:justify-start flex-wrap gap-4 mt-10 lg:h-[350px]">
              {isQueryLoading ? (
                <Loading />
              ) : (
                recipes.map((recipe) => {
                  return <SingleRecipe recipe={recipe} />;
                })
              )}
            </div>
            <div className="flex gap-2 w-full justify-center mt-10 mb-10 items-center fixed bottom-0 left-1/2 -translate-x-1/2 md:static md:translate-x-0 md:left-auto md:bottom-auto">
              <Button disabled={page === 1} buttonStyle="accent" onClick={() => pageDecrement()}>
                <ArrowLeftIcon color="white" width={20} height={20} />
              </Button>
              <span>
                {page} / {maxPage}
              </span>
              <Button
                disabled={page === maxPage}
                buttonStyle="accent"
                onClick={() => pageIncrement()}
              >
                <ArrowRightIcon color="white" width={20} height={20} />
              </Button>
            </div>
          </m.div>
        )}
      </m.div>
    </AnimatePresence>
  );
};

export default Recipes;
