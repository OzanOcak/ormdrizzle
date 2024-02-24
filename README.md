    npm run migration:generate

in schema.ts

    import { pgTable, serial, text, varchar} from 'drizzle-orm/pg-core';
    export const users =  pgTable("users",{
    id: serial("id").primaryKey(),
    fullName:text("full name"),
    phone:varchar("phone",{length:256}),
    });

in the package.json

    "migration:generate": "drizzle-kit generate:pg --schema=./src/db/schema.ts",

then run

    npm run migration:generate

this create sql file under drizzle folder
create migrate.ts under db folder

    import { Pool } from "pg";
    import { drizzle } from "drizzle-orm/node-postgres";
    import { migrate } from "drizzle-orm/node-postgres/migrator";
    import "dotenv/config";

    const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    });

    const db = drizzle(pool);

    async function main() {
      console.log("migration started...");
      await migrate(db, { migrationsFolder: "drizzle" });
      console.log("migration ended...");
      process.exit(0);
    }

    main().catch((err) => {
    console.log(err);
    process.exit(0);
    });

in the package.json

    npm run mitigate

    "migrate": "drizzle-kit generate:pg --schema=./src/db/schema.ts && node -r esbuild-register src/db/migrate.ts",

if we alter the table and generate migration, this will create new sql query under drizzle folder
