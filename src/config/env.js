import { config } from "dotenv"
config()

export const port = process.env.SERVER_PORT
export const secret = process.env.SECRET
export const db = process.env.DB
export const dbHost = process.env.DB_HOST
export const dbUser = process.env.DB_USER
export const dbPassword = process.env.DB_PASSWORD
export const dbEndpointId = process.env.DB_ENDPOINT_ID