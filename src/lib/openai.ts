// lib/openai.ts
import OpenAI from "openai";

// Verifica se a variável de ambiente está definida
if (!process.env.OPENAI_API_KEY) {
    throw new Error("OPENAI_API_KEY não configurada em .env.local");
}

// Cria uma instância do cliente OpenAI com a chave da API
export const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});
