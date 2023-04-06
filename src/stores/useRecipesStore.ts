import { Recipe } from "@/types";
import { create } from "zustand";

interface CategoryStore {
  recipes: Recipe[];
  setRecipes: (recipes: Recipe[]) => void;
  isLoading: boolean;
}

const useRecipeStore = create<CategoryStore>()((set) => ({
  recipes: [],
  isLoading: true,
  setRecipes: (recipes) => {
    set({ recipes: recipes, isLoading: false });
  },
}));

export default useRecipeStore;
