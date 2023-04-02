"use client";

import { Category, Direction, Ingredient } from "@/types";
import { KeyboardEvent, useState } from "react";
import { motion as m } from "framer-motion";
import Button from "./common/Button";
import Input from "./common/Input";
import CategoriesModal from "./layout/Modal/CategoriesModal";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { Reorder } from "framer-motion";

const RecipeForm = () => {
  const [recipeName, setRecipeName] = useState("");
  const [description, setDesctiption] = useState("");
  const [preparationTime, setPreparationTime] = useState("");
  const [cookingTime, setCookingTime] = useState("");
  const [amountOfServings, setAmountOfServings] = useState("");
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [directions, setDirections] = useState<Direction[]>([]);
  const [ingredientsValue, setIngredientsValue] = useState("");
  const [directionsValue, setDirectionsValue] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [isCategoriesModalOpen, setIsCategoriesModalOpen] = useState<boolean>(false);
  const [isIngredientFocus, setIsIngredientFocus] = useState(false);
  const [isDirectionsFocus, setIsDirectionsFocus] = useState(false);

  const createRecipe = () => {
    return null;
  };

  const addInstOrDirection = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key == "Enter") {
      if (isIngredientFocus) {
        if (!ingredientsValue) return;
        setIngredients([
          ...ingredients,
          {
            id: String(ingredients.length + 1),
            value: ingredientsValue,
          },
        ]);
        setIngredientsValue("");
      } else if (isDirectionsFocus) {
        if (!directionsValue) return;
        setDirections([
          ...directions,
          {
            id: String(directions.length + 1),
            value: directionsValue,
            order: directions.length + 1,
          },
        ]);
        setDirectionsValue("");
      }
    }
  };

  const changeOrder = () => {
    console.log("a");

    const changedOrder = directions.map((direction) => {
      return {
        ...direction,
        order: directions.indexOf(direction) + 1,
      };
    });

    setDirections(changedOrder);
  };

  const deleteIngredient = (id: string) => {
    setIngredients(ingredients.filter((ingredient) => ingredient.id !== id));
  };
  const deleteDirection = (id: string) => {
    setDirections(directions.filter((direction) => direction.id !== id));
  };

  return (
    <>
      <div className="flex flex-col gap-6 md:flex-row md:gap-12">
        <div className="flex flex-col gap-4 mt-8 flex-1">
          <Input
            inputValue={recipeName}
            setInputValue={setRecipeName}
            placeholder="Enter recipe name"
          >
            Recipe name
          </Input>
          <Input
            inputValue={description}
            setInputValue={setDesctiption}
            placeholder="Enter recipe description"
          >
            Description
          </Input>
          <div className="flex gap-2">
            <Button className="flex gap-2 items-center">Add image</Button>
            <Button
              className="flex gap-2 items-center"
              onClick={() => setIsCategoriesModalOpen(true)}
            >
              Categories
            </Button>
          </div>
          <Input
            inputValue={preparationTime}
            setInputValue={setPreparationTime}
            placeholder="Enter preparation time (in minutes)"
          >
            Preparation time
          </Input>
          <Input
            inputValue={cookingTime}
            setInputValue={setCookingTime}
            placeholder="Enter cooking time (in minutes)"
          >
            Cooking time
          </Input>
          <Input
            inputValue={amountOfServings}
            setInputValue={setAmountOfServings}
            placeholder="Enter amount of servings"
          >
            Amount of servings
          </Input>
        </div>
        <div className="flex flex-col gap-4 mt-8 flex-1">
          <Input
            inputValue={ingredientsValue}
            onFocus={() => setIsIngredientFocus(true)}
            onBlur={() => setIsIngredientFocus(false)}
            onKeyDown={(e) => addInstOrDirection(e)}
            setInputValue={setIngredientsValue}
            placeholder="Enter ingredients for recipe"
          >
            Ingredients
          </Input>
          <m.div className="bg-zinc-100 max-h-[150px] overflow-y-scroll flex flex-col gap-1 rounded-lg py-2 px-4 mb-4">
            {ingredients.length ? (
              ingredients.map((ingredient) => {
                return (
                  <m.div
                    layout
                    className="flex relative justify-between before:content-['·'] before:absolute before:-left-4 before:text-3xl before:opacity-50 items-center ml-4 flex-wrap h-8 flex-shrink-0"
                    key={ingredient.id}
                  >
                    {ingredient.value}
                    <XMarkIcon
                      onClick={() => deleteIngredient(ingredient.id)}
                      className="p-1 cursor-pointer opacity-50 hover:opacity-100"
                      width={27}
                      height={27}
                    />
                  </m.div>
                );
              })
            ) : (
              <p className="text-gray-500">
                You haven't add any ingredients yet. Click Enter when you're done with one
              </p>
            )}
          </m.div>
          <Input
            inputValue={directionsValue}
            onFocus={() => setIsDirectionsFocus(true)}
            onBlur={() => setIsDirectionsFocus(false)}
            onKeyDown={(e) => addInstOrDirection(e)}
            setInputValue={setDirectionsValue}
            placeholder="Enter directions for recipe"
          >
            Directions
          </Input>
          <div className="bg-zinc-100 max-h-[150px] overflow-y-scroll flex flex-col gap-1 rounded-lg py-2 px-4">
            <Reorder.Group axis="y" values={directions} onReorder={setDirections}>
              {directions.length ? (
                directions.map((direction) => {
                  return (
                    <Reorder.Item
                      onDragEnd={() => changeOrder()}
                      key={direction.id}
                      value={direction}
                    >
                      <div
                        className="relative justify-between ml-4 pl-1 flex cursor-grab active:cursor-grabbing items-center h-8 select-none flex-shrink-0"
                        key={direction.id}
                      >
                        <span className="absolute -left-4 opacity-50 text-sm flex w-2.5 justify-end">
                          {direction.order}
                        </span>
                        <span>{direction.value}</span>
                        <XMarkIcon
                          onClick={() => deleteDirection(direction.id)}
                          className="p-1 cursor-pointer opacity-50 hover:opacity-100"
                          width={27}
                          height={27}
                        />
                      </div>
                    </Reorder.Item>
                  );
                })
              ) : (
                <p className="text-gray-500">
                  You haven't add any directions yet. Click Enter when you're done with one
                </p>
              )}
            </Reorder.Group>
          </div>
        </div>
      </div>
      <Button onClick={() => createRecipe()} className="mt-8 mb-8">
        Create recipe
      </Button>
      <CategoriesModal
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        isModalOpen={isCategoriesModalOpen}
        setIsModalOpen={setIsCategoriesModalOpen}
      />
    </>
  );
};

export default RecipeForm;
