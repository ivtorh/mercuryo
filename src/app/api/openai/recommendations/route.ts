// app/api/openai/recommendations/route.ts
import { NextResponse } from "next/server";
import { openai } from "../../../../lib/openai";

export async function POST(req: Request) {
  try {
    const { query, items } = await req.json();

    if (!query) {
      return NextResponse.json(
        { error: "campo 'query' é obrigatório" },
        { status: 400 }
      );
    }

    // Monta prompt simples: você pode evoluir para mensagens do Chat/Responses API
    const prompt = `
        Você é um sistema de recomendação de produtos para uma loja de e-commerce chamada Mercuryo.
        Usuário perguntou: "${query}"
        Produtos disponíveis: ${JSON.stringify(items ?? [])}
        Retorne 3 recomendações com {id, name, reason} em JSON.`;

    // Usa a Responses API (ou Chat completions conforme preferência)
    const response = await openai.responses.create({
      model: "gpt-4o-mini", // ou "gpt-4o" / "gpt-3.5-turbo" conforme sua conta
      input: prompt,
      // max tokens e outros parâmetros aqui, se desejar
    });

    // A API Responses retorna uma estrutura; extraímos o texto gerado
    const text = response.output?.[0]?.content?.[0]?.text ?? null;

    // Tenta parsear JSON do texto (mantenha tratamento de erro)
    let recommendations = null;
    try {
      recommendations = text ? JSON.parse(text) : null;
    } catch {
      // Se o modelo não retornou JSON puro, devolve o texto bruto
      return NextResponse.json({ sucesso: true, raw: text });
    }

    return NextResponse.json({ sucesso: true, recommendations });
    // Fim do try principal
  } catch (err: any) {
    // Tratamento de erro geral
    console.error("Erro OpenAI:", err);
    return NextResponse.json(
      { error: err?.message ?? "Erro desconhecido" },
      { status: 500 }
    );
  }
}
