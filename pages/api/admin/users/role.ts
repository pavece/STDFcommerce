import type { NextApiRequest, NextApiResponse } from "next";
import { connect, disconnect } from "../../../../db/db";
import { UserModel } from "../../../../models/userModel";
import { IUser } from "../../../../interfaces/userInterface";

type Data = {
  status: string;
  users?: IUser[];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method == "PUT") {
    const userId = req.body.userId;
    const newRole = req.body.newRole;

    try {
      await connect();
      await UserModel.findByIdAndUpdate(userId, { role: newRole });
      const users = JSON.stringify(await UserModel.find());
      await disconnect();

      return res
        .status(200)
        .json({
          status: `The user has been updated to: ${newRole}`,
          users: JSON.parse(users),
        });
    } catch (error) {
      await disconnect();
      return res
        .status(500)
        .json({ status: "Some error ocurred while updating the users" });
    }
  }
  return res.status(405).json({status: "Method not allowed"})
}
