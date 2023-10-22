import jwt from "jsonwebtoken";
import { secret } from "./env.js";

export const verifyAuth = (req, res, next) => {
    var auth = req.headers['authorization']

    if (!auth) {
        return res.status(404).json('No token found')
    }

    auth = auth.replace('Bearer ', '')

    jwt.verify(auth, secret, (err, decoded) => {
        if (err) {
            return res.status(403).json('unauthorized')
        }

        req.user = decoded.user

        next()
    })
}

export const generateAuth = (payload) => {
    const options = {
        expiresIn: 24 * 60 * 60 * 1000
    }
    return jwt.sign(payload, secret, options)
}

// var pay = {
//     user: {
//         "sub": 1,
//         "name": 'anselmo',
//         "admin": false
//     }
// }
// console.log(generateAuth(pay))