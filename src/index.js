import express from "express";
import cors from 'cors'
import { verifyAuth } from "./config/jwt.js";
import AuthController from "./app/controllers/AuthController.js";
import UserController from "./app/controllers/UserController.js";

const router = express();

const port = process.env.SERVER_PORT || 8080

router.use(express.json());
router.use(cors())

router.get('/', (req, res, next) => res.status(200).json({ hello: 'world!' }))
router.post('/user', UserController.create)
router.post('/auth', AuthController.Auth)
router.use(verifyAuth) // my auth middleware
router.get('/user/:id', UserController.show)
router.put('/user/:id', UserController.update)

router.listen(port, (req, res, next) => console.log(`RUNNING ON HTTP://LOCALHOST:${port}`));