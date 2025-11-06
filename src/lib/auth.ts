import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { db } from "@/lib/db";
import { users } from "@/lib/drizzle/schema";
import bcrypt from "bcrypt";

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
        name: "Credentials",
        credentials: {
            email: { label: "Email", type: "text" },
            password: { label: "Password", type: "password" },
        },
        async authorize(credentials) {
            if (!credentials?.email || !credentials?.password) return null;

            // Buscar usuário no banco
            const result = await db.select().from(users).where(users.email.eq(credentials.email));

            const user = result[0];
            if (!user) return null;

            // Validar senha
            const validPassword = await bcrypt.compare(credentials.password, user.password);
            if (!validPassword) return null;

            return { id: user.id.toString(), name: user.name, email: user.email };
        },
        }),
    ],
    pages: {
        signIn: "/login",
    },
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
};
