import express from "express";
import cors from 'cors'
import { verifyAuth } from "./config/jwt.js";

const router = express();

const port = process.env.SERVER_PORT || 8080

router.use(express.json());
router.use(cors())

router.get('/', (req, res, next) => {
    // req.headers['authorization']
    return res.status(200).send({ status: 'ok' })
})

router.use(verifyAuth)

router.get('/callback', (req, res, next) => {

})

router.get('/auth', (req, res, next) => {
    res.json('sucesso')
    console.log('vc tá aqui: ', req.user['name']);
})

router.listen(port, (req, res, next) => console.log(`RUNNING ON HTTP://LOCALHOST:${port}`));