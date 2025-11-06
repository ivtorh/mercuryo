import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

// 🚨 O endpoint precisa do corpo "raw", não JSON normal
export const config = {
    api: {
        bodyParser: false,
    },
};

export async function POST(req: NextRequest) {
    const body = await req.text(); // lê o corpo como texto puro
    const sig = req.headers.get("stripe-signature") as string;

    try {
        const event = stripe.webhooks.constructEvent(
        body,
        sig,
        process.env.STRIPE_WEBHOOK_SECRET!
    );

    // Tratar eventos específicos:
    switch (event.type) {
        case "checkout.session.completed":
        const session = event.data.object;
        console.log("✅ Pagamento concluído:", session);
        break;
        default:
        console.log(`Evento não tratado: ${event.type}`);
    }

    return NextResponse.json({ received: true });
    } catch (err: any) {
        console.error("❌ Erro no webhook:", err.message);
        return NextResponse.json({ error: err.message }, { status: 400 });
    }
}
