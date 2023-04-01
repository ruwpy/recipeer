import { Category } from "@/types";
import axios from "axios";
import { create } from "zustand";

interface CategoryStore {
  categories: Category[];
  addCategory: (category: Category) => void;
  getCategories: () => void;
}

const useCategoryStore = create<CategoryStore>()((set) => ({
  categories: [],
  addCategory: (category) => {
    set((state) => ({ categories: [...state.categories, category] }));
  },
  getCategories: async () => {
    const { data }: { data: Category[] } = await axios.get("/api/category/getCategories");
    if (data) {
      set(() => ({ categories: data }));
    }
  },
}));

export default useCategoryStore;
