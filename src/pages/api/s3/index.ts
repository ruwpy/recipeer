import { NextApiResponse, NextApiRequest } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import { Recipe } from "@/types";
import { prisma } from "../../../../prisma/client";
import { S3 } from "aws-sdk";
import { nanoid } from "nanoid";

export interface S3ApiResponse {
  uploadImageUrl: string;
}

const handler = async (req: NextApiRequest, res: NextApiResponse<S3ApiResponse | {}>) => {
  if (req.method === "GET") {
    const session = await getServerSession(req, res, authOptions);
    if (!session) return res.status(401).json({ message: "Unauthorized" });

    const prismaUser = await prisma.user.findFirst({
      where: { email: session.user?.email },
    });

    try {
      if (prismaUser) {
        const s3 = new S3({
          region: process.env.S3_REGION,
          endpoint: process.env.S3_URL,
          credentials: {
            accessKeyId: process.env.S3_ACCESS_KEY!,
            secretAccessKey: process.env.S3_SECRET_ACCESS_KEY!,
          },
          signatureVersion: "v4",
        });

        const gerenateUploadURL = async () => {
          const params = {
            Bucket: "2e7781a6-recipeer",
            Key: nanoid() + ".png",
            Expires: 60,
          };

          const uploadURL = await s3.getSignedUrlPromise("putObject", params);
          return uploadURL;
        };

        const uploadImageUrl = await gerenateUploadURL();

        res.status(200).json(uploadImageUrl);
      }
    } catch (error) {
      res.status(403).json({ error: "Error has occured whilst making a request" });
    }
  }
};

export default handler;
