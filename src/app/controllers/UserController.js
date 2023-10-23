import { hashSync } from "bcrypt";
import { User } from "../database/Models/User.js";

export default new class UserController {
    async create(req, res) {
        const { name, email, password, passwordConfirm } = req.body;

        if (!(req.body)) {
            return res.status(500).send({
                status: 'fail',
                message: 'Username, email, and password are required'
            })
        }

        if (!(password == passwordConfirm)) {
            return res.status(500).send({
                status: 'fail',
                message: 'The passwords must be equals'
            })
        }

        try {
            let user = new User({
                name: name,
                email: email,
                password: hashSync(password, 10)
            })

            if (await user == 'duplicate key value violates unique constraint "users_email_key"') {
                return res.status(500).send({
                    status: 'fail',
                    message: 'this email already exists'
                })
            }

            res.status(200).send({
                status: 'success',
                message: 'user added with success',
            })
        } catch (error) {
            console.log(error);
            res.status(500).send({
                status: 'fail',
                message: error.message
            })
        }
    }

    update(req, res, next) {
        return req.params.id
    }
    
    show(req, res, next) {
        return req.params.id
    }
}