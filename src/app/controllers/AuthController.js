import { compareSync } from "bcrypt"
import { generateAuth } from "../../config/jwt.js"
import { User } from "../database/Models/User.js"

export default new class AuthController {
    async Auth(req, res, next) {

        const { email, password } = req.body

        console.log(email);

        try {

            const data = new User
            let users = await data.showAll()
            let user

            user = users.find((user) => user.email == email)

            if (!user) {
                return res.status(404).json({
                    status: 'not found',
                    message: 'user not found'
                })
            }

            if (!(compareSync(password, user['password']))) {
                return res.status(403).json({
                    status: 'fail',
                    message: 'password dont match'
                })
            }

            var pay = {
                user: { "sub": user.id, "name": user.name, "email": user.email }
            }

            return res.status(200).send({
                status: 'success',
                message: 'User found',
                data: {
                    user: {
                        id: user.id,
                        name: user.name,
                        email: user.email
                    },
                    token: generateAuth(pay)
                }
            })
        } catch (error) {
            res.status(500).send({
                status: 'error',
                message: error.message
            })
        }
    }
}