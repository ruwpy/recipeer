import { NextApiResponse, NextApiRequest } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import { Category } from "@/types";
import { prisma } from "../../../../prisma/client";

interface CategoryApiRequest extends NextApiRequest {
  body: { categoryData: Category };
}

const handler = async (req: CategoryApiRequest, res: NextApiResponse<Category[] | {}>) => {
  if (req.method === "GET") {
    const session = await getServerSession(req, res, authOptions);
    if (!session) return res.status(401).json({ message: "Unauthorized" });

    const prismaUser = await prisma.user.findFirst({
      where: { email: session.user?.email },
    });

    try {
      if (prismaUser) {
        const categories = await prisma.category.findMany({
          where: {
            userId: prismaUser.id,
          },
        });

        res.status(200).json(categories);
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
      categoryData: { name },
    } = req.body;

    try {
      if (prismaUser) {
        const category = await prisma.category.create({
          data: {
            name: name,
            user: {
              connect: {
                id: prismaUser.id,
              },
            },
          },
        });

        res.status(200).json(category);
      }
    } catch (error) {
      res.status(403).json({ error: "Error has occured whilst making a request" });
    }
  }
};

export default handler;
