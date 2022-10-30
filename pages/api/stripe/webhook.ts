import type { NextApiRequest, NextApiResponse } from "next";

import { buffer } from "micro";
import Stripe from "stripe";

type Data = {
  message: string;
};

const endpointSecret =
  "whsec_c58a31f1771a74465b4d53c5c4a8bd3566a89cd486f85daceb969b4e44b28973";

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

      // Handle the event
      switch (event.type) {
        case "payment_intent.succeeded":
          const paymentIntent = event.data.object;
          // Then define and call a function to handle the event payment_intent.succeeded
          console.log(paymentIntent);
          res.status(500).json({ message: "Payment filled" });
          //TODO: implement function to update the order paid status based on the event returned and the order id
          break;
        // ... handle other event types
        default:
          console.log(`Unhandled event type ${event.type}`);
      }
      break;
    default:
      res.status(430).json({ message: "Method now allowed" });
  }
}
