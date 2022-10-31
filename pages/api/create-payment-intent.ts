import { NextApiRequest, NextApiResponse } from "next";
import { getCartPrices } from "../../db/functions/getCartPrice";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { cart } = req.body;

  const totalPrice = await getCartPrices(cart);

  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: totalPrice * 100,
    currency: "eur",
    metadata: {
      orderId: req.body.orderId,
    },
    automatic_payment_methods: {
      enabled: true,
    },
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
}
