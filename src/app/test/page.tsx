"use client";
import { useState } from "react";

export default function TestOpenAI() {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState("");

  async function handleTest() {
    const res = await fetch("/api/openai/recommendations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query,
        items: [
          { id: "1", name: "Smartwatch" },
          { id: "2", name: "Notebook gamer" },
        ],
      }),
    });
    const data = await res.json();
    setResult(JSON.stringify(data, null, 2));
  }

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Teste OpenAI API</h1>
      <input
        type="text"
        placeholder="Digite algo..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={handleTest}>Enviar</button>
      <pre>{result}</pre>
    </div>
  );
}
