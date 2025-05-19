console.log("✅ Entrato nella route API");
import Stripe from "stripe";
import { NextResponse } from "next/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-04-30.basil",
});

export async function POST(request: Request) {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "PAY $1 AND SEE",
            },
            unit_amount: 100,
          },
          quantity: 1,
        },
      ],
      success_url: "https://d205-79-33-211-162.ngrok-free.app/success",
      cancel_url: "https://d205-79-33-211-162.ngrok-free.app/",
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Errore API checkout:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
