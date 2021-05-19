import { Response } from "express";
import DATA from "../../data";

class CookieService {

    async setJwtCookie(res: Response, token: string) {
        res.cookie(DATA.JWT_COOKIE, token ,{
            httpOnly: true
        });
    }
}

export default new CookieService();