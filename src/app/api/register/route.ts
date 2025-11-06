// src/app/api/auth/register/route.ts
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const data = await request.json();
        return NextResponse.json({ message: "Usuário registrado!", data });
    } catch (error) {
        return NextResponse.json({ error: "Erro interno" }, { status: 500 });
    }
}
