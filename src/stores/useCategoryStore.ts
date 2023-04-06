import { Category } from "@/types";
import { create } from "zustand";

interface CategoryStore {
  categories: Category[];
  addCategory: (category: Category) => void;
  setCategories: (categories: Category[]) => void;
  isLoading: boolean;
}

const useCategoryStore = create<CategoryStore>()((set) => ({
  categories: [],
  isLoading: true,
  addCategory: (category) => {
    set((state) => ({ categories: [...state.categories, category] }));
  },
  setCategories: (categories) => {
    set({ categories: categories, isLoading: false });
  },
}));

export default useCategoryStore;
