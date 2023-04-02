export interface Recipe {
  id?: string;
  createdAt?: Date;
  updatedAt?: Date;
  title?: string;
  ingridients?: Ingredient[];
  directions?: Direction[];
  cookingTime?: number;
  authorId?: string;
}

export interface Ingredient {
  id: string;
  value: string;
}

export interface Direction {
  id: string;
  value: string;
  order: number;
}

export interface Category {
  id: string;
  name: string;
  recipes?: Recipe[];
}
