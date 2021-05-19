import { Request, Response, NextFunction } from "express";

const jwt = require('jsonwebtoken');
import DATA from "../data";
import { PayloadData } from "../model/interfaces/token-payload";
import jwtService from "../services/auth/jwt-service";
import JwtService from "../services/auth/jwt-service";

class AuthMiddleware {

    async checkAuth(req: Request, res: Response, next: NextFunction) {
        const {JWT} = req.cookies;
        if (JWT) {

            console.log(JWT);
            // const userData = jwt.verify(JWT, config.TOKEN_SECRET);

            jwtService.verifyToken(JWT)
                .then( (payload: PayloadData | object) => {
                    req.userInfo = <PayloadData> payload;
                    
                    console.log(req.userInfo);
                    console.log(`User athenticated ${req.userInfo}`);
                    req.username = req.userInfo.username;
                    next();
                })
                .catch((err) => {
                    console.log(err);
                    res.status(403).json({message: 'Invalid token'});
                });


            // jwt.verify(JWT, DATA.TOKEN_SECRET, (err:any, payload: PayloadData) => {
            //     if (err) {
            //         res.status(403).json({message: 'Invalid token'});
            //     } else {
            //         req.userInfo = payload;
                    
            //         console.log(req.userInfo);
            //         console.log(`User athenticated ${req.userInfo}`);
            //         req.username = req.userInfo.username;
            //         next();
            //     }
            // });
        
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


