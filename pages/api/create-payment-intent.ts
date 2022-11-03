import { NextApiRequest, NextApiResponse } from "next";
import { getOrder } from "../../db/functions/getOrder";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const order = JSON.parse(await getOrder(req.body.orderId));

  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: Math.round(
      (order.orderTotalPrice +
        order.orderTotalPrice * Number(process.env.NEXT_PUBLIC_TAX_RATE)) *
        100
    ),
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
