import { NextApiResponse, NextApiRequest } from "next";
import { Recipe } from "@/types";
import { db } from "@/lib/db";

const handler = async (req: NextApiRequest, res: NextApiResponse<Recipe | {}>) => {
  const { recipeId } = req.query;

  if (req.method === "GET") {
    try {
      if (typeof recipeId === "string") {
        const recipe = await db.recipe.findFirstOrThrow({
          where: {
            id: recipeId,
          },
          include: {
            author: true,
          },
        });

        res.status(200).json(recipe);
      }
    } catch (error) {
      res.status(404).json({ error: "Recipe was not found" });
    }
  }
};

export default handler;
