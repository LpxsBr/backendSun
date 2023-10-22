import { sql } from "./database.js"

export class User {

    async create({ ...props }) {
        const { name, email, password } = props

        const sendUser = await sql`
            insert into users
                (name, email, password)
            values(
                ${name}, ${email}, ${password}
            )
        `;

        return sendUser;
    }

    async showAll() {
        const users = await sql`select * from users`

        return users
    }

}