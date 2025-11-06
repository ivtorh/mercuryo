import { z } from "zod";

//Esquema de validação para registro de usuário
export const registerSchema = z.object({
    name: z.string().min(3),
    email: z.string().email(),
    password: z.string().min(6),
});

const body = await request.json();
const parsedBody = registerSchema.safeParse(body);

if (!parsedBody.success) {
    return new Response(JSON.stringify({ errors: parsedBody.error.errors }), { status: 400 });
}

// Continue com o processamento se os dados forem válidos
const validData = parsedBody.data;
console.log("Dados válidos:", validData);

