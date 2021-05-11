import { Request, Response, NextFunction } from "express";

const jwt = require('jsonwebtoken');
import DATA from "../data";

class AuthMiddleware {

    async checkAuth(req: Request, res: Response, next: NextFunction) {
        const {JWT} = req.cookies;
        if (JWT) {

            console.log(JWT);
            // const userData = jwt.verify(JWT, config.TOKEN_SECRET);

            jwt.verify(JWT, DATA.TOKEN_SECRET, (err:any, payload: any) => {
                if (err) {
                    res.status(403).json({message: 'Invalid token'});
                } else {
                    req.userInfo = payload;
                    
                    console.log(req.userInfo);
                    console.log(`User athenticated ${req.userInfo}`);
                    req.username = req.userInfo.username;
                    next();
                }
            });
        
        } else {
            res.status(403).json({message: 'Token not provided'});
        }

    // if (!req.headers.authorization) {
    //     return res.status(401).send('Unauthorizad user');
    // } 
    // userToken = req.headers.authorization;
    // if (userToken.startsWith('Bearer ')) {
    //     userToken = userToken.slice(7, token.length).trimLeft();
    // }
    // if (!userToken) {
    //     return res.status(401).send('Unauthorizad user');
        
    // }
    // jwt.verify(userToken, config.TOKEN_SECRET, (err, payload) => {
    //     if (err) {
    //         res.status(403).json({message: 'Invalid token'});
    //     } else {
    //         req.userInfo = payload;
    //         console.log(req.userInfo);
    //         next();
    //     }
    // });
    // req.userId = payload._id;
    

    }
}

export default new AuthMiddleware();

// const checkAuth = (req: Request, res: Response, next: NextFunction) => {
//     const {JWT} = req.cookies;
//     if (JWT) {

//         console.log(JWT);
//         // const userData = jwt.verify(JWT, config.TOKEN_SECRET);

//         jwt.verify(JWT, config.TOKEN_SECRET, (err:any, payload: any) => {
//             if (err) {
//                 res.status(403).json({message: 'Invalid token'});
//             } else {
//                 req.userInfo = payload;
                
//                 console.log(req.userInfo);
//                 console.log(`User athenticated ${req.userInfo}`);
//                 req.username = req.userInfo.username;
//                 next();
//             }
//         });
        
//     } else {
//         res.status(403).json({message: 'Token not provided'});
//     }

//     // if (!req.headers.authorization) {
//     //     return res.status(401).send('Unauthorizad user');
//     // } 
//     // userToken = req.headers.authorization;
//     // if (userToken.startsWith('Bearer ')) {
//     //     userToken = userToken.slice(7, token.length).trimLeft();
//     // }
//     // if (!userToken) {
//     //     return res.status(401).send('Unauthorizad user');
        
//     // }
//     // jwt.verify(userToken, config.TOKEN_SECRET, (err, payload) => {
//     //     if (err) {
//     //         res.status(403).json({message: 'Invalid token'});
//     //     } else {
//     //         req.userInfo = payload;
//     //         console.log(req.userInfo);
//     //         next();
//     //     }
//     // });
//     // req.userId = payload._id;
    

// }


