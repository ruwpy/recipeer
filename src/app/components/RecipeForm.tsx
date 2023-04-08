"use client";

import { Category, Direction, Ingredient } from "@/types";
import { ChangeEvent, KeyboardEvent, useRef, useState } from "react";
import { AnimatePresence, motion as m } from "framer-motion";
import Button from "./common/Button";
import Input from "./common/Input";
import CategoriesModal from "./layout/Modal/CategoriesModal";
import CreateRecipeSuccessModal from "./layout/Modal/CreateRecipeSuccessModal";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { Reorder } from "framer-motion";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { Recipe } from "@/types";
import { nanoid } from "nanoid";
import Loading from "./Loading";

const RecipeForm = () => {
  // form states
  const [recipeName, setRecipeName] = useState("");
  const [description, setDesctiption] = useState("");
  const [preparationTime, setPreparationTime] = useState("");
  const [cookingTime, setCookingTime] = useState("");
  const [amountOfServings, setAmountOfServings] = useState("");
  const [ingredientsValue, setIngredientsValue] = useState("");
  const [directionsValue, setDirectionsValue] = useState("");
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [directions, setDirections] = useState<Direction[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);

  // image state
  const [image, setImage] = useState<File | null>();
  const [imagePreview, setImagePreview] = useState("");
  const imageInputRef = useRef<any>(null);

  // misc states
  const [isCategoriesModalOpen, setIsCategoriesModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isIngredientFocus, setIsIngredientFocus] = useState(false);
  const [isDirectionsFocus, setIsDirectionsFocus] = useState(false);
  const [isCreateRecipeLoading, setIsCreateRecipeLoading] = useState(false);

  // on success states
  const [recipeTitleOnSuccess, setRecipeTitleOnSuccess] = useState("");
  const [recipeIdOnSuccess, setRecipeIdOnSuccess] = useState("");

  const recipeData: Recipe = {
    amountOfServings: Number.isNaN(amountOfServings) ? 0 : +amountOfServings,
    categories: selectedCategories,
    cookingTime: Number.isNaN(cookingTime) ? 0 : +cookingTime,
    description: description,
    directions: directions,
    imageUrl: "",
    ingredients: ingredients,
    preparationTime: Number.isNaN(preparationTime) ? 0 : +preparationTime,
    title: recipeName,
  };

  const createRecipeMutation = useMutation({
    mutationFn: async ({ recipeData, imageUrl }: { recipeData: Recipe; imageUrl: string }) => {
      return await axios.post("/api/recipes", { recipeData, imageUrl });
    },
    onError: (error) => {
      console.log(error);
    },
    onSuccess: ({ data }: { data: Recipe }) => {
      setIsSuccessModalOpen(true);
      setRecipeTitleOnSuccess(data.title);
      setRecipeIdOnSuccess(data.id!);

      // clear all the inputs
      setIsCreateRecipeLoading(false);
      setRecipeName("");
      setDesctiption("");
      setPreparationTime("");
      setCookingTime("");
      setAmountOfServings("");
      setIngredients([]);
      setDirections([]);
      setIngredientsValue("");
      setDirectionsValue("");
      setSelectedCategories([]);
    },
  });

  const createRecipe = async () => {
    setIsCreateRecipeLoading(true);
    let imageUrl: string = "";

    if (image) {
      const imageUploadUrl = (await axios.get("/api/s3")).data as string;
      axios.put(imageUploadUrl, image, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      imageUrl = imageUploadUrl.split("?")[0];
    }

    createRecipeMutation.mutate({ recipeData, imageUrl });
  };

  const selectImage = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files as FileList;

    setImagePreview(URL.createObjectURL(selectedFile?.[0]));
    setImage(selectedFile?.[0]);
  };

  const addInstOrDirection = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key == "Enter") {
      if (isIngredientFocus) {
        if (!ingredientsValue) return;
        setIngredients([
          ...ingredients,
          {
            id: nanoid(),
            value: ingredientsValue,
          },
        ]);
        setIngredientsValue("");
      } else if (isDirectionsFocus) {
        if (!directionsValue) return;
        setDirections([
          ...directions,
          {
            id: nanoid(),
            value: directionsValue,
            order: directions.length + 1,
          },
        ]);
        setDirectionsValue("");
      }
    }
  };

  const changeOrder = () => {
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

  const clearImage = () => {
    setImage(null);
    setImagePreview("");
    imageInputRef.current.value = "";
  };

  return (
    <>
      <div className="flex flex-col gap-6 mt-10 md:flex-row md:gap-12">
        <div className="flex flex-col gap-4 flex-1">
          <Input
            inputValue={recipeName}
            setInputValue={setRecipeName}
            placeholder="Enter recipe name"
            max={64}
          >
            Recipe name
          </Input>
          <Input
            inputValue={description}
            setInputValue={setDesctiption}
            placeholder="Enter recipe description"
            max={256}
          >
            Description
          </Input>
          <div className="flex gap-2">
            <Button
              className="flex gap-2 items-center"
              onClick={() => setIsCategoriesModalOpen(true)}
            >
              Categories
            </Button>
            <label className="px-4 py-2 flex items-center gap-2 border border-gray-200 hover:bg-gray-100 rounded-lg cursor-pointer">
              Select image
              <input
                ref={imageInputRef}
                className="hidden"
                type="file"
                accept="image/*"
                onChange={(e) => selectImage(e)}
              />
            </label>
            {imagePreview && (
              <div onClick={() => clearImage()} className="relative cursor-pointer">
                <img className="w-10 h-10 object-cover rounded-lg" src={imagePreview} />
                <span className="absolute shadow-2xl -top-1 -right-1 bg-gray-100 rounded-sm">
                  <XMarkIcon height={18} width={18} />
                </span>
              </div>
            )}
          </div>
          <Input
            inputValue={preparationTime}
            setInputValue={setPreparationTime}
            placeholder="Enter preparation time (in minutes)"
            max={12}
          >
            Preparation time
          </Input>
          <Input
            inputValue={cookingTime}
            setInputValue={setCookingTime}
            placeholder="Enter cooking time (in minutes)"
            max={12}
          >
            Cooking time
          </Input>
          <Input
            inputValue={amountOfServings}
            setInputValue={setAmountOfServings}
            placeholder="Enter amount of servings"
            max={12}
          >
            Amount of servings
          </Input>
        </div>
        <div className="flex flex-col gap-4 flex-1">
          <Input
            inputValue={ingredientsValue}
            onFocus={() => setIsIngredientFocus(true)}
            onBlur={() => setIsIngredientFocus(false)}
            onKeyDown={(e) => addInstOrDirection(e)}
            setInputValue={setIngredientsValue}
            placeholder="Enter ingredients for recipe"
            max={64}
          >
            Ingredients
          </Input>
          <m.div className="bg-zinc-100 max-h-[150px] overflow-y-scroll flex flex-col gap-1 rounded-lg py-2 px-4 mb-4">
            {ingredients.length ? (
              ingredients.map((ingredient) => {
                return (
                  <m.div
                    layout
                    className="flex relative justify-between before:content-['·'] flex-nowrap before:absolute min-h-[30px] before:-left-4 before:text-3xl before:opacity-50 items-center ml-4 flex-shrink-0"
                    key={ingredient.id}
                  >
                    <span className="break-all h-fit">{ingredient.value}</span>
                    <XMarkIcon
                      onClick={() => deleteIngredient(ingredient.id)}
                      className="p-1 cursor-pointer opacity-50 hover:opacity-100 flex-shrink-0"
                      width={27}
                      height={27}
                    />
                  </m.div>
                );
              })
            ) : (
              <p className="text-gray-500">
                You haven't add any ingredients yet. Press Enter when you're done with one
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
            max={256}
          >
            Directions
          </Input>
          <div className="bg-zinc-100 max-h-[150px] overflow-y-scroll flex flex-nowrap flex-col gap-1 rounded-lg py-2 px-4">
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
                        className="relative justify-between ml-4 pl-1 flex cursor-grab active:cursor-grabbing min-h-[30px] items-center flex-shrink-0"
                        key={direction.id}
                      >
                        <span className="absolute h-fit -left-4 opacity-50 text-sm flex w-2.5 justify-end">
                          {direction.order}
                        </span>
                        <span className="break-all h-fit">{direction.value}</span>
                        <XMarkIcon
                          onClick={() => deleteDirection(direction.id)}
                          className="p-1 cursor-pointer opacity-50 hover:opacity-100 flex-shrink-0"
                          width={27}
                          height={27}
                        />
                      </div>
                    </Reorder.Item>
                  );
                })
              ) : (
                <p className="text-gray-500">
                  You haven't add any directions yet. Press Enter when you're done with one
                </p>
              )}
            </Reorder.Group>
          </div>
        </div>
      </div>
      <Button
        buttonStyle="accent"
        disabled={isCreateRecipeLoading}
        onClick={() => createRecipe()}
        className="mt-8 mb-8 md:fixed bottom-10"
      >
        Create recipe
      </Button>
      <CategoriesModal
        selectedCategories={selectedCategories}
        setSelectedCategories={setSelectedCategories}
        isModalOpen={isCategoriesModalOpen}
        setIsModalOpen={setIsCategoriesModalOpen}
      />
      <CreateRecipeSuccessModal
        recipeId={recipeIdOnSuccess}
        recipeTitle={recipeTitleOnSuccess}
        isModalOpen={isSuccessModalOpen}
        setIsModalOpen={setIsSuccessModalOpen}
      />
      <AnimatePresence mode="wait">
        <m.div animate="animate" initial="initial" exit="initial">
          {isCreateRecipeLoading && <Loading />}
        </m.div>
      </AnimatePresence>
    </>
  );
};

export default RecipeForm;
