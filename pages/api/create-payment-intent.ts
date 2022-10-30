import { NextApiRequest, NextApiResponse } from "next";
import { bodyStreamToNodeStream } from "next/dist/server/body-streams";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { items } = req.body;

  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: 10000,
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
