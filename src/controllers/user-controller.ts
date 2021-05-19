import { NextFunction, Request, Response} from 'express';
const jwt = require('jsonwebtoken');
import DATA from "../data";

class UserController {

    async getUserData(req: Request, res: Response) {

        const {JWT} = req.cookies;
        jwt.verify(JWT, DATA.TOKEN_SECRET, (err:any, payload: any) => {
            if (err) {
                res.status(403).json({message: 'Invalid token'});
            } else {
                const {userRole} = payload;
                console.log('USuarios registrado');
                req.username = req.userInfo.username;
                res.status(200).json(payload);
            }
        });
    }

   
}

export default new UserController();