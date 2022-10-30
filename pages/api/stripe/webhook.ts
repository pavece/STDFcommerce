import type { NextApiRequest, NextApiResponse } from "next";

import { buffer } from "micro";
import Stripe from "stripe";
import { payOrder } from "../../../db/functions/payOrder";

type Data = {
  message: string;
};

const endpointSecret = process.env.STRIPE_WEBHOOK_KEY || "";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2022-08-01",
});

export const config = { api: { bodyParser: false } };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "POST":
      const buf = await buffer(req);
      const sig = req.headers["stripe-signature"];

      let event;

      try {
        event = stripe.webhooks.constructEvent(
          buf,
          sig as string,
          endpointSecret
        );
      } catch (err) {
        res.status(400).json({ message: `Webhook Error: ${err}` });
        return;
      }

      switch (event.type) {
        case "payment_intent.succeeded":
          const paymentIntent: any = event.data.object;
          await payOrder(paymentIntent.metadata.orderId);
          res.status(200).json({ message: "Payment filled" });
          break;
        default:
          console.log(`Unhandled event type ${event.type}`);
      }
      break;
    default:
      res.status(430).json({ message: "Method now allowed" });
  }
}
