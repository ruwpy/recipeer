import { NextApiResponse, NextApiRequest } from "next";
import { S3 } from "aws-sdk";
import { nanoid } from "nanoid";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export interface S3ApiResponse {
  uploadImageUrl: string;
}

const handler = async (req: NextApiRequest, res: NextApiResponse<S3ApiResponse | {}>) => {
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return res.status(403).end();
  }

  if (req.method === "GET") {
    try {
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
    } catch (error) {
      res.status(403).json({ error: "Error has occured whilst making a request" });
    }
  }
};

export default handler;
