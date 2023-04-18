import { NextApiResponse, NextApiRequest } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { Category } from "@/types";
import { db } from "@/lib/db";

interface CategoryApiRequest extends NextApiRequest {
  body: { categoryData: Category };
}

const handler = async (req: CategoryApiRequest, res: NextApiResponse<Category[] | {}>) => {
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return res.status(403).end();
  }

  const { user } = session;

  if (req.method === "GET") {
    try {
      if (user) {
        const categories = await db.category.findMany({
          where: {
            userId: user.id,
          },
        });

        res.status(200).json(categories);
      }
    } catch (error) {
      res.status(403).json({ error: "Error has occured whilst making a request" });
    }
  }

  if (req.method === "POST") {
    const {
      categoryData: { name },
    } = req.body;

    try {
      const category = await db.category.create({
        data: {
          name: name,
          user: {
            connect: {
              id: user.id,
            },
          },
        },
      });

      res.status(200).json(category);
    } catch (error) {
      res.status(403).json({ error: "Error has occured whilst making a request" });
    }
  }
};

export default handler;
