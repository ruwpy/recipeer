import { NextApiResponse, NextApiRequest } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import { Category } from "@/types";
import { prisma } from "../../../../prisma/client";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<Category[] | {}>
) => {
  if (req.method === "GET") {
    const session = await getServerSession(req, res, authOptions);
    if (!session) return res.status(401).json({ message: "Unauthorized" });

    const prismaUser = await prisma.user.findFirst({
      where: { email: session.user?.email },
    });

    try {
      if (prismaUser) {
        const result = await prisma.category.findMany({
          where: {
            userId: prismaUser.id,
          },
        });

        res.status(200).json(result);
      }
    } catch (error) {
      res
        .status(403)
        .json({ error: "Error has occured whilst making a request" });
    }
  }
};

export default handler;
