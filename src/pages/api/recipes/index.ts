import { NextApiResponse, NextApiRequest } from "next";
import { Recipe } from "@/types";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

interface RecipeApiRequest extends NextApiRequest {
  body: { recipeData: Recipe; imageUrl: string };
}

export interface RecipeApiResponse {
  recipes: Recipe[];
  recipesLength: number;
}

const handler = async (req: RecipeApiRequest, res: NextApiResponse<RecipeApiResponse | {}>) => {
  const { page } = req.query;
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return res.status(403).end();
  }

  const { user } = session;

  if (req.method === "GET") {
    try {
      const recipes = await db.recipe.findMany({
        skip: (Number(page) - 1) * 6,
        take: 6,
        where: {
          authorId: user.id,
        },
        orderBy: {
          createdAt: "desc",
        },
        include: {
          author: true,
        },
      });
      const allRecipes = await db.recipe.findMany({
        where: {
          authorId: user.id,
        },
      });

      res.status(200).json({ recipes, recipesLength: allRecipes.length });
    } catch (error) {
      res.status(403).json({ error: "Error has occured whilst making a request" });
    }
  }

  if (req.method === "POST") {
    const {
      recipeData: {
        amountOfServings,
        categories,
        cookingTime,
        description,
        directions,
        ingredients,
        preparationTime,
        title,
      },
      imageUrl,
    } = req.body;

    const categoriesIdArray = categories
      ? categories.map((category) => {
          return {
            id: category.id,
          };
        })
      : [];

    try {
      const result = await db.recipe.create({
        data: {
          amountOfServings,
          cookingTime,
          description,
          directions,
          imageUrl,
          ingredients,
          preparationTime,
          title,
          author: {
            connect: {
              id: user.id,
            },
          },
          categories: {
            connect: [...categoriesIdArray],
          },
        },
      });

      res.status(200).json(result);
    } catch (error) {
      res.status(403).json({ error: "Error has occured whilst making a request" });
    }
  }
};

export default handler;
