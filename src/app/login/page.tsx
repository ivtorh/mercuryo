"use client";

//importar dependências
import { useState } from "react";

export default function LoginPage() {
    //estado para armazenar o email e a senha
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    //função para lidar com o envio do formulário de login
    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        //tentar fazer login
        try {
            // Simular uma chamada de API para login
            const res = await fetch("/api/login", {
                method: "POST",
                headers: { "content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            //verificar se a resposta é ok
            const data = await res.json();
            alert(data.message || "Login bem-sucedido!");
        } catch {
            alert("Erro ao fazer login. Tente novamente.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center"> 
            <div className="container-left">
                {/* este lado é para a imagem de bg */}
            </div>

            <div className="container-right flex flex-col items-center justify-center p-8">
                {/* este lado é para o formulário de login */}
                <form onSubmit={handleLogin} className="login-form">
                    <h2 className="form-title">Login</h2>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="input-field"
                    />
                    <input
                        type="password"
                        placeholder="Senha"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="input-field"
                    />
                    <button type="submit" disabled={loading} className="submit-button">
                        {loading ? "Entrando..." : "Entrar"}
                    </button>
                </form>
            </div>
        </div>
    );
};    