import express from "express";
import cors from 'cors'
import { compareSync, hashSync } from 'bcrypt'
import { generateAuth, verifyAuth } from "./config/jwt.js";
import { User } from "./database/user.js";

const router = express();

const port = process.env.SERVER_PORT || 8080

router.use(express.json());
router.use(cors())

router.get('/', (req, res, next) => {

})

router.post('/user', async (req, res) => {
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

    const user = new User;

    try {
        let data = await user.create({
            name: name,
            email: email,
            password: hashSync(password, 10)
        })

        res.status(200).send({
            status: 'success',
            message: 'user added with success',
        })
    } catch (error) {
        console.log(error);
        res.status(200).send({
            status: 'fail',
            message: error.message
        })
    }
})


router.post('/auth', async (req, res, next) => {

    const { email, password } = req.body

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
            message: 'something is wrong'
        })
    }
})

router.use(verifyAuth) // my auth middleware

router.get('/users', async (req, res, next) => {
    try {
        const data = new User
        let users = await data.showAll()
        return res.status(200).json({
            status: 'success',
            message: 'User collection returned',
            users: users
        })
        // res.status(200).json({users: users})
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: 'error',
            message: 'something is wrong'
        })
    }
})

router.get('/callback', async (req, res, next) => {

})


router.listen(port, (req, res, next) => console.log(`RUNNING ON HTTP://LOCALHOST:${port}`));