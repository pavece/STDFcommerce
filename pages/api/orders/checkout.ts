import type { NextApiRequest, NextApiResponse } from "next";
import { connect, disconnect } from "../../../db/db";
import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import { ICartProduct } from "../../../interfaces/cartProduct";
import { IShippingAddress } from "../../../context/cartContext/cartContext";
import { OrderModel } from "../../../models/ordersModel";

type Data =
  | {
      orderId: string;
    }
  | { error: string };

interface IUserOrder {
  products: ICartProduct[];
  address: IShippingAddress;
}

const generateOrder = async (
  req: NextApiRequest,
  res: NextApiResponse,
  session: any
) => {
  const email = session.user.email;
  const body = req.body;

  const address = {
    fullName: body.address.name + " " + body.address.surname,
    address: body.address.addressLine1,
    zipCode: body.address.zipCode,
    phone: body.address.phoneNumber,
  };

  await connect();

  const newOrder = new OrderModel({
    paid: false,
    orderAuthorEmail: email,
    orderContent: body.products,
    orderTotalPrice: 100,
    orderAuthorAddress: address,
  });

  await newOrder.save();
  await disconnect();

  res.status(200).json({ orderId: newOrder._id });
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const session = await unstable_getServerSession(req, res, authOptions);
  switch (req.method) {
    case "POST":
      await generateOrder(req, res, session);
      break;
    default:
      res.status(405).json({ error: "Method not allowed" });
  }
}
