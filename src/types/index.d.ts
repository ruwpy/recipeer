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
  name: string;
  quantity: string;
}

export interface Direction {
  id: string;
  direction: string;
}

export interface Category {
  id: string;
  name: string;
  recipes?: Recipe[];
}
