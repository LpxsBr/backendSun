import express from "express";
import cors from 'cors'
import { compareSync, hashSync } from 'bcrypt'
import { generateAuth, verifyAuth } from "./config/jwt.js";
import { User } from "./app/database/Models/User.js";
import AuthController from "./app/controllers/AuthController.js";
import UserController from "./app/controllers/UserController.js";

const router = express();

const port = process.env.SERVER_PORT || 8080

router.use(express.json());
router.use(cors())

router.get('/', (req, res, next) => {

})

router.post('/user', UserController.create)
router.post('/auth', AuthController.Auth)
router.use(verifyAuth) // my auth middleware
router.get('/user/:id', UserController.show)
router.put('/user/:id', UserController.update)

router.get('/callback', async (req, res, next) => {

})


router.listen(port, (req, res, next) => console.log(`RUNNING ON HTTP://LOCALHOST:${port}`));