import { config } from "dotenv"
config()

export const port = process.env.SERVER_PORT
export const secret = process.env.SECRET