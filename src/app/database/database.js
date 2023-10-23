import postgres from "postgres";
import { db, dbHost, dbPassword, dbUser } from "../../config/env.js";

export const sql = postgres({
    database: db,
    host: dbHost,
    username: dbUser,
    password: dbPassword,
    ssl: "require"
})

// console.log(sql);

// export default db;