import type { NextApiRequest, NextApiResponse } from "next";
import formidable from "formidable";
import { v2 as cloudinary } from "cloudinary";
import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from "../../auth/[...nextauth]";

type Data = {
  status: string;
  image?: any;
};

export const config = {
  api: {
    bodyParser: false,
  },
};

cloudinary.config(process.env.CLOUDINARY_URL || "");

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  //Check the session in the endpoint because nextauth middleware doesn't allow multipart
  const session = await unstable_getServerSession(req, res, authOptions);

  if (session && req.method === "POST") {
    const image = await parseFile(req);

    return res.status(200).json({
      status: "Images uploaded",
      image,
    });
  }
  return res
    .status(401)
    .json({ status: "Method not supported or user unauthorized" });
}

const parseFile = (req: NextApiRequest) => {
  return new Promise((resolve, reject) => {
    const form = new formidable.IncomingForm();

    form.parse(req, async (error, fields, files) => {
      if (error) {
        return reject(error);
      }
      const filePath = await uploadImage(files.file);
      resolve(filePath);
    });
  });
};

const uploadImage = async (file: any) => {
  const { secure_url } = await cloudinary.uploader.upload(file.filepath);
  return secure_url;
};
