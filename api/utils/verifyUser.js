import jwt from 'jsonwebtoken'
import {errorHandler} from './error.js'

export const verifyToken = (req, res, next) => {
    console.log('req:', req.cookies)
    const token = req.cookies.access_token;
    if (!token) {
        return next(errorHandler(401, 'Unauthorrized!'))
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return next(errorHandler(401, 'Error-Unauthorrized!'))
        }
        req.user = user // add user to the request object
        next()
    })
}