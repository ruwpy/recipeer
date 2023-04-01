import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import Modal, { ModalProps } from "./Modal";
import Button from "../../common/Button";
import { XMarkIcon, CheckIcon } from "@heroicons/react/24/solid";
import { Category } from "@/types";
import Input from "../../common/Input";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import useCategoryStore from "@/stores/useCategoryStore";

interface CategoriesModalProps extends ModalProps {
  selectedCategory: Category | undefined;
  setSelectedCategory: Dispatch<SetStateAction<Category | undefined>>;
}

export default function CategoriesModal({
  setSelectedCategory,
  selectedCategory,
  isModalOpen,
  setIsModalOpen,
}: CategoriesModalProps) {
  const { addCategory, categories, getCategories } = useCategoryStore();
  const [unacceptedCategories, setUnacceptedCategories] = useState<Category[]>([]);
  const [categoryInputValue, setCategoryInputValue] = useState("");

  const createCategoryInput = () => {
    if (unacceptedCategories.length) return;

    setUnacceptedCategories([
      ...unacceptedCategories,
      { id: String(Date.now()), name: "", recipes: [] },
    ]);
  };

  useEffect(() => {
    getCategories();
  }, []);

  const createCategoryMutation = useMutation({
    mutationFn: async (categoryData: Category) => {
      return await axios.post("/api/category/createCategory", { categoryData });
    },
    onError: (error) => {
      console.log(error);
    },
    onSuccess: ({ data }: { data: Category }) => {
      setUnacceptedCategories([]);
      addCategory(data);
    },
  });

  const createCategory = (category: Category) => {
    if (!categoryInputValue) return;
    const categoryData: Category = {
      id: category.id,
      name: categoryInputValue,
      recipes: [],
    };

    createCategoryMutation.mutate(categoryData);
  };

  return (
    <Modal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} className="p-4 w-80">
      <div className="flex justify-between items-center mb-6">
        <span className="text-lg">Categories</span>
        <span className="inline-block cursor-pointer" onClick={() => setIsModalOpen(false)}>
          <XMarkIcon width={25} height={25} />
        </span>
      </div>
      <div className="mb-6 flex flex-col gap-2">
        {categories.length
          ? categories.map((category) => {
              return (
                <div
                  onClick={() => setSelectedCategory(category)}
                  className="w-full border border-gray-200 hover:bg-gray-100 p-2 cursor-pointer rounded-lg flex items-center gap-2"
                >
                  <input
                    checked={category.id === selectedCategory?.id}
                    type="checkbox"
                    className="w-4 h-4"
                  />
                  {category.name}
                </div>
              );
            })
          : null}
        {unacceptedCategories.length
          ? unacceptedCategories.map((category, index) => {
              return (
                <div className="flex items-center" key={index}>
                  <Input
                    inputValue={categoryInputValue}
                    setInputValue={setCategoryInputValue}
                    placeholder="Enter category name"
                  >
                    Category name
                  </Input>
                  <div className="cursor-pointer" onClick={() => createCategory(category)}>
                    <CheckIcon width={20} height={20} />
                  </div>
                </div>
              );
            })
          : null}
        {!categories.length && !unacceptedCategories.length && (
          <p className="text-center opacity-70">You have no categories</p>
        )}
      </div>
      <div className="flex justify-end">
        <Button onClick={() => createCategoryInput()} className="w-full">
          Create category
        </Button>
      </div>
    </Modal>
  );
}
