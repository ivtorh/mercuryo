import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";

//Rota para criar uma sessão de checkout do Stripe
export async function POST(req: Request) {
    const { items } = await req.json();
    //Cria a sessão de checkout com os itens recebidos
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: items.map((item: any) => ({
        //Configura os dados de preço para cada item
        price_data: {
            currency: "brl",
            product_data: { name: item.name },
            unit_amount: Math.round(item.price * 100),
        },
        quantity: item.quantity,
    })),
        //Define as URLs de sucesso e cancelamento
        mode: "payment",
        success_url: "http://localhost:3000/sucesso",
        cancel_url: "http://localhost:3000/erro",
    });
    //Retorna a URL da sessão de checkout criada
    return NextResponse.json({ url: session.url });
}
