import { Prisma, User } from "@prisma/client";

export interface Recipe {
  amountOfServings: number;
  author?: User;
  authorId?: string;
  categories?: Category[];
  cookingTime: number;
  createdAt?: Date;
  description?: string;
  directions: Direction[];
  id?: string;
  imageUrl?: string;
  ingredients: Ingredient[];
  preparationTime: number;
  title: string;
  updatedAt?: Date;
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
