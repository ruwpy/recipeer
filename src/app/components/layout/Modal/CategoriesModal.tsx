import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import Modal, { ModalProps } from "./Modal";
import Button from "../../common/Button";
import { XMarkIcon, CheckIcon } from "@heroicons/react/24/solid";
import { Category } from "@/types";
import Input from "../../common/Input";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import useCategoryStore from "@/stores/useCategoryStore";
import { nanoid } from "nanoid";
import { AnimatePresence } from "framer-motion";
import { motion as m } from "framer-motion";
import { appearVariants } from "../../Recipes";

interface CategoriesModalProps extends ModalProps {
  selectedCategories: Category[];
  setSelectedCategories: Dispatch<SetStateAction<Category[]>>;
}

export default function CategoriesModal({
  setSelectedCategories,
  selectedCategories,
  isModalOpen,
  setIsModalOpen,
}: CategoriesModalProps) {
  const { addCategory, categories, setCategories, isLoading } = useCategoryStore();
  const [unacceptedCategories, setUnacceptedCategories] = useState<Category[]>([]);
  const [categoryInputValue, setCategoryInputValue] = useState("");

  useQuery(
    ["categories"],
    async () => {
      return (await axios.get<Category[]>("api/categories")).data;
    },
    {
      onSuccess: (data) => {
        setCategories(data);
      },
    }
  );

  const createCategoryInput = () => {
    if (unacceptedCategories.length) return;

    setUnacceptedCategories([...unacceptedCategories, { id: nanoid(), name: "", recipes: [] }]);
  };

  const selectCategories = (inputCategory: Category) => {
    if (selectedCategories.includes(inputCategory)) {
      setSelectedCategories(
        selectedCategories.filter((category) => category.id !== inputCategory.id)
      );
    } else {
      setSelectedCategories([...selectedCategories, inputCategory]);
    }
  };

  const createCategoryMutation = useMutation({
    mutationFn: async (categoryData: Category) => {
      return await axios.post("/api/categories", { categoryData });
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
      <AnimatePresence mode="wait">
        <m.div animate="animate" exit="exit" initial="initial">
          {isLoading ? (
            <m.p variants={appearVariants} className="mb-6">
              Loading...
            </m.p>
          ) : (
            <m.div variants={appearVariants} className="mb-6">
              {categories.length ? (
                <div className="flex overflow-y-scroll max-h-[300px] flex-col gap-2">
                  {categories.map((category) => {
                    return (
                      <div
                        key={category.id}
                        onClick={() => selectCategories(category)}
                        className="w-full border border-gray-200 transition-colors hover:bg-gray-100 p-2 cursor-pointer rounded-lg flex items-center gap-2"
                      >
                        <input
                          checked={selectedCategories?.includes(category)}
                          onChange={() => null}
                          type="checkbox"
                          className="w-4 h-4"
                        />
                        {category.name}
                      </div>
                    );
                  })}
                </div>
              ) : null}
              {unacceptedCategories.length
                ? unacceptedCategories.map((category, index) => {
                    return (
                      <div className="flex items-center mt-2 gap-1" key={index}>
                        <Input
                          inputValue={categoryInputValue}
                          setInputValue={setCategoryInputValue}
                          placeholder="Enter category name"
                        >
                          Category name
                        </Input>
                        <Button
                          className="h-[33.6px] self-end"
                          onClick={() => createCategory(category)}
                        >
                          <CheckIcon width={20} height={20} />
                        </Button>
                        <Button
                          className="h-[33.6px] self-end"
                          onClick={() => {
                            setCategoryInputValue("");
                            setUnacceptedCategories([]);
                          }}
                        >
                          <XMarkIcon width={20} height={20} />
                        </Button>
                      </div>
                    );
                  })
                : null}
              {!categories.length && !unacceptedCategories.length && (
                <p className="text-center opacity-70">You have no categories</p>
              )}
            </m.div>
          )}
        </m.div>
      </AnimatePresence>

      <div className="flex justify-end">
        <Button buttonStyle="accent" onClick={() => createCategoryInput()} className="w-full">
          Create category
        </Button>
      </div>
    </Modal>
  );
}
