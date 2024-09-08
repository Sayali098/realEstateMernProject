import { errorHandler } from "./error.js";
import jwt from 'jsonwebtoken'

export const verifyToken = (req, res, next) => {
    console.log("Cookies:", req.cookies);
    const token = req.cookies["access-token"]; 
    // access-token

    if (!token) {
        console.error("No token found");
        return next(errorHandler(401, 'unauthorized'));
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            console.error("Token verification failed", err);
            return next(errorHandler(403, 'forbidden'));
        }

        console.log("Verified User:", user);
        req.user = user;
        next();
    });
};


// export const verifyToken = (req, res, next) => {
//     console.log("Cookies:", req.cookies);
//     const token = req.cookies.access_token;

//     if (!token) {
//         console.error("No token found");
//         return next(errorHandler(401, 'unauthorized'));
//     }

//     jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
//         if (err) {
//             console.error("Token verification failed", err);
//             return next(errorHandler(403, 'forbidden'));
//         }

//         console.log("Verified User:", user);
//         req.user = user;
//         next();
//     });
// };
