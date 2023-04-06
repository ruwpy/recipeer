import { Prisma } from "@prisma/client";

export interface Recipe {
  id?: string;
  createdAt?: Date;
  updatedAt?: Date;
  title: string;
  description?: string;
  categories?: Category[];
  ingredients: Ingredient[];
  directions: Direction[];
  preparationTime: number;
  amountOfServings: number;
  cookingTime: number;
  authorId?: string;
}

export interface Ingredient extends Prisma.InputJsonObject {
  id: string;
  value: string;
}

export interface Direction extends Prisma.InputJsonObject {
  id: string;
  value: string;
  order: number;
}

export interface Category extends Prisma.InputJsonObject {
  id: string;
  name: string;
  recipes?: Recipe[];
  userId?: string;
}
