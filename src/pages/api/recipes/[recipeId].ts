import { NextApiResponse, NextApiRequest } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import { Recipe } from "@/types";
import { prisma } from "../../../../prisma/client";

const handler = async (req: NextApiRequest, res: NextApiResponse<Recipe | {}>) => {
  const { recipeId } = req.query;

  if (req.method === "GET") {
    const session = await getServerSession(req, res, authOptions);
    if (!session) return res.status(401).json({ message: "Unauthorized" });

    const prismaUser = await prisma.user.findFirst({
      where: { email: session.user?.email },
    });

    console.log(recipeId);

    try {
      if (prismaUser && typeof recipeId === "string") {
        const recipe = await prisma.recipe.findFirstOrThrow({
          where: {
            id: recipeId,
          },
        });

        res.status(200).json(recipe);
      }
    } catch (error) {
      res.status(403).json({ error: "Error has occured whilst making a request" });
    }
  }
};

export default handler;
