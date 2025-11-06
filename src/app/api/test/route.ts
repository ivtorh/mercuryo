import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { users } from "@/lib/drizzle/schema";

export async function GET() {
    try {
        // Inserir um usuário de teste
        await db.insert(users).values({
            name: "Vitor Teste",
            email: "vitor@teste.com",
            password: "123456",
        });

        // Consultar todos os usuários
        const allUsers = await db.select().from(users);

        return NextResponse.json({ success: true, users: allUsers });
    } catch (error) {
        console.error("Erro ao conectar com o banco:", error);
        return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
    }
}
