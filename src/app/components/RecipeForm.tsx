"use client";

import { Category, Direction, Ingredient, Recipe } from "@/types";
import { useState } from "react";
import Button from "./common/Button";
import Input from "./common/Input";
import CategoriesModal from "./layout/Modal/CategoriesModal";

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
  const [selectedCategory, setSelectedCategory] = useState<Category>();
  const [isCategoriesModalOpen, setIsCategoriesModalOpen] = useState<boolean>(false);

  const createRecipe = () => {
    return null;
  };

  return (
    <>
      <div className="flex gap-6">
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
            <Button
              className="flex gap-2 items-center"
              onClick={() => setIsCategoriesModalOpen(true)}
            >
              Add image
            </Button>
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
            setInputValue={setIngredientsValue}
            placeholder="Enter ingredients for recipe"
          >
            Ingredients
          </Input>
          <div className="bg-zinc-100 rounded-lg py-2 px-4 text-gray-500 mb-4">
            {ingredients.length ? (
              <p></p>
            ) : (
              <p>You haven't add any ingredients yet. Click Enter when you're done with one</p>
            )}
          </div>
          <Input
            inputValue={directionsValue}
            setInputValue={setDirectionsValue}
            placeholder="Enter directions for recipe"
          >
            Directions
          </Input>
          <div className="bg-zinc-100 rounded-lg py-2 px-4 text-gray-500">
            {ingredients.length ? (
              <p></p>
            ) : (
              <p>You haven't add any directions yet. Click Enter when you're done with one</p>
            )}
          </div>
        </div>
      </div>
      <Button onClick={() => createRecipe()} className="mt-8">
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
