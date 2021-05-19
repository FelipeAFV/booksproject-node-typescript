import jwt , {VerifyErrors} from "jsonwebtoken";
import DATA from "../../data";
import { PayloadData } from "../../model/interfaces/token-payload";

class JwtService {

    // verifyToken(token: string): PayloadData | undefined {
    //     let verifyResult;
    //     jwt.verify(token, 'secret', (err, payload) => {
    //         if (err) verifyResult = undefined;
    //         else verifyResult = payload; 
    //         return verifyResult;
    //     })
        
    // }

    verifyToken(token: string):  Promise<PayloadData | object> {
        let verifyResult;

        return new Promise<PayloadData | object >((resolve, reject) => {
            
            try {
                const payload: PayloadData = <PayloadData> jwt.verify(token, DATA.TOKEN_SECRET);
                return resolve(payload);
            } catch(err) {
                console.log(err);
                return reject(err);
            }
            // jwt.verify(token, 'secret', (err, payload) => {
            // if (err) return  reject(err);
            // if (!payload) return reject(undefined);
            // return resolve(payload);

               
            // })

        })
    }

    generateAccessToken(payload: PayloadData): string {
        return jwt.sign(payload, DATA.TOKEN_SECRET, {expiresIn: '5m'});
    }

    generateRefreshToken(payload: PayloadData): string {
        return jwt.sign(payload, DATA.TOKEN_SECRET, {expiresIn: '12h'});
    }
}

export default new JwtService();