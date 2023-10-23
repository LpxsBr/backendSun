import { sql } from '../database.js'

export class User {

    #name
    #email
    #password
    #token

    constructor(props) {
        if (props) {
            let name = props.name
            let email = props.email
            let password = props.password
            let token = props.token

            return this.create({ name, email, password, token })
        }
    }

    async create({ ...props }) {
        const { name, email, password } = props
        try {
            // console.log('ok');
            await sql`
                insert into users
                    (name, email, password)
                values(
                    ${name}, ${email}, ${password}
                )
            `;

        } catch (error) {
            return error.message
        }

    }

    async showAll() {
        const users = await sql`select * from users`

        return users
    }

}