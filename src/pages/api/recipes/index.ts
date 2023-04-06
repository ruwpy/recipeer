import { NextApiResponse, NextApiRequest } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import { Recipe } from "@/types";
import { prisma } from "../../../../prisma/client";

interface RecipeApiRequest extends NextApiRequest {
  body: { recipeData: Recipe; imageUrl: string };
}

export interface RecipeApiResponse {
  recipes: Recipe[];
  recipesLength: number;
}

const handler = async (req: RecipeApiRequest, res: NextApiResponse<RecipeApiResponse | {}>) => {
  const { page } = req.query;

  if (req.method === "GET") {
    const session = await getServerSession(req, res, authOptions);
    if (!session) return res.status(401).json({ message: "Unauthorized" });

    const prismaUser = await prisma.user.findFirst({
      where: { email: session.user?.email },
    });

    try {
      if (prismaUser) {
        const recipes = await prisma.recipe.findMany({
          skip: (Number(page) - 1) * 8,
          take: 8,
          where: {
            authorId: prismaUser.id,
          },
          orderBy: {
            createdAt: "desc",
          },
          include: {
            author: true,
          },
        });
        const allRecipes = await prisma.recipe.findMany({
          where: {
            authorId: prismaUser.id,
          },
        });

        res.status(200).json({ recipes, recipesLength: allRecipes.length });
      }
    } catch (error) {
      res.status(403).json({ error: "Error has occured whilst making a request" });
    }
  }

  if (req.method === "POST") {
    const session = await getServerSession(req, res, authOptions);
    if (!session) return res.status(401).json({ message: "Unauthorized" });

    const prismaUser = await prisma.user.findFirst({
      where: { email: session.user?.email },
    });
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

    console.log(imageUrl);

    const categoriesIdArray = categories
      ? categories.map((category) => {
          return {
            id: category.id,
          };
        })
      : [];

    try {
      if (prismaUser) {
        const result = await prisma.recipe.create({
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
                id: prismaUser.id,
              },
            },
            categories: {
              connect: [...categoriesIdArray],
            },
          },
        });

        res.status(200).json(result);
      }
    } catch (error) {
      console.log(error);

      res.status(403).json({ error: "Error has occured whilst making a request" });
    }
  }
};

export default handler;
