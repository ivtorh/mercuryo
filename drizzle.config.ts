import 'dotenv/config';
import { defineConfig } from "drizzle-kit";

//configuração do drizzle-kit para migrations
export default defineConfig({
    out: "./src/lib/drizzle/migrations", // pasta onde as migrations serão geradas
    schema: "./src/lib/drizzle/schema.ts", 
    dialect: "postgresql", 
    dbCredentials: { 
        url: process.env.DATABASE_URL!,
    },
});
