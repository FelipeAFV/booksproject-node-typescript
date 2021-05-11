import UserService from "../services/user-service";
import bcrypt from "bcrypt";
import {UserRole} from "../enums/user-role";
const jwt = require('jsonwebtoken');
import DATA from "../data";
import { Request, Response } from "express";

class AuthController {

    async register(req: Request, res: Response) {
        let {username, password, role} = req.body;


 

    // bcrypt.genSalt(10)
    //     .then((salt) => {
    //         console.log(`Salt: ${salt}`);
    //         bcrypt.hash(password, salt)
    //         .then((hash) => {
    //             console.log(`Hashed password ${hash} `, typeof hash);
    //             const user = User.create({username, hash})
    //             .then((user) => {
    //                 console.log(user);
    //                 const token = jwt.sign({username: user.username}, 'secretKey');
    //                 res.status(200).json({token});
    //             })
    //         })
    //     }).catch((err) => {console.log(err)})
        bcrypt.genSalt(10)
            .then((salt) => {
                console.log(`Salt: ${salt}`)
                return bcrypt.hash(password, salt);})
            .then( async (hash) => {
                console.log(`Hashed password ${hash} `, typeof hash);
                const user =  await UserService.create({username: username, password: hash, role: role || UserRole.USER});
                return Promise.resolve(user);})
            .then((user) => {
                console.log(user);
                const token = jwt.sign({username: user.username, userRole: user.role}, DATA.TOKEN_SECRET);
                res.status(200).json({token});
            })
            .catch((err) => { res.status(500).send(`Error in user registration ${err}`)});

    // password = await bcrypt.hash(password, 10, function (err, hash) {
    //     if (err) {
    //         res.status(401).send('Error in user registration');
    //     } 
    // });
        // console.log(`Password ${password}`);

        // const user = new User();
        // user.password = password;
        // user.username = username;
        // await UserService.create(user);
        // console.log(user);
        // try {
        //     /** Se almacena usuario en la base de datos */
        //     // await user.save();
        // } catch (error) {
        //     /*** Codigo que se ejecuta en caso de que la promesa llame a reject()*/
        //     return res.status(501).json({message: 'A server error has ocurred'})
        // }
        // /**
        //  * Se genera el token para el usuario recién registrado, junto con un 
        //  * PAYLOAD que es cargado en el token para almacenar sus datos
        //  */
        // const token = jwt.sign({username: user.username}, config.TOKEN_SECRET);
        // res.status(200).json({token});
    }

    async login(req: Request, res: Response) {
        const {username, password} = req.body;

        const user = await UserService.getByConditions({username: username});
        
        /** User not registered */
        if (!user) return res.status(401).send('User not registered');

        const isPasswordCorrect =  await bcrypt.compare(password, user.password);
        
        /** User registered -> Checking for password */
        if (!isPasswordCorrect) return res.status(401).send('Wrong password');
        
        /**
         * Generate token to frontend
         */
        const token = jwt.sign({id: user.id, username: user.username, role: user.role}, DATA.TOKEN_SECRET, { expiresIn:'3h'});
        /**Set cookie with JWT */
        console.log('Settin cookie')
        /**Http only avoid cookie reading from script, only for
         * http methods
         */
        res.cookie('JWT', token ,{
            httpOnly: true
        });
        // res.status(200).header("authorization", token).json(token);

        const userWithoutPassword = { username: user.username, role: user.role };
        return res.json(userWithoutPassword);
        
    }

    async logout(req: Request, res: Response) {
        res.clearCookie('JWT');
    res.status(200).send({message: 'logout from server'});
    }
}

export default new AuthController();


// exports.register = async (req: Request, res: Response) => {

//     let {username, password} = req.body;

 

//     // bcrypt.genSalt(10)
//     //     .then((salt) => {
//     //         console.log(`Salt: ${salt}`);
//     //         bcrypt.hash(password, salt)
//     //         .then((hash) => {
//     //             console.log(`Hashed password ${hash} `, typeof hash);
//     //             const user = User.create({username, hash})
//     //             .then((user) => {
//     //                 console.log(user);
//     //                 const token = jwt.sign({username: user.username}, 'secretKey');
//     //                 res.status(200).json({token});
//     //             })
//     //         })
//     //     }).catch((err) => {console.log(err)})
//     // bcrypt.genSalt(10)
//     //     .then((salt) => {
//     //         console.log(`Salt: ${salt}`)
//     //         return bcrypt.hash(password, salt);})
//     //     .then( (hash) => {
//     //         console.log(`Hashed password ${hash} `, typeof hash);
//     //         const user =  User.create({username, hash});
//     //         return Promise.resolve(user);})
//     //     .then((user) => {
//     //         console.log(user);
//     //         const token = jwt.sign({username: user.username}, 'secretKey');
//     //         res.status(200).json({token});
//     //     })
//     //     .catch((err) => { res.status(500).send(`Error in user registration ${err}`)});

//     // password = await bcrypt.hash(password, 10, function (err, hash) {
//     //     if (err) {
//     //         res.status(401).send('Error in user registration');
//     //     } 
//     // });
//     console.log(`Password ${password}`);

//     const user = new User();
//     user.password = password;
//     user.username = username;
//     await getRepository(User).save(user);
//     console.log(user);
//     try {
//         /** Se almacena usuario en la base de datos */
//         // await user.save();
//     } catch (error) {
//         /*** Codigo que se ejecuta en caso de que la promesa llame a reject()*/
//         return res.status(501).json({message: 'A server error has ocurred'})
//     }
//     /**
//      * Se genera el token para el usuario recién registrado, junto con un 
//      * PAYLOAD que es cargado en el token para almacenar sus datos
//      */
//     const token = jwt.sign({username: user.username}, config.TOKEN_SECRET);
//     res.status(200).json({token});
// }

// exports.login = async (req: Request, res: Response) => {
//     const {username, password} = req.body;
//     const user = await getRepository<User>(User).findOne({username: username, password: password});
    
//     /** User not registered */
//     if (!user)  {
//         return res.status(401).send('User not registered');

//     /** User registered -> Checking for password */
//     }else{

//         if (user.password !== password) return res.status(401).send('Wrong password');
        
//         /**
//          * Generate token to frontend
//          */
//         const token = jwt.sign({username: user.username, userId: user.id}, config.TOKEN_SECRET, { expiresIn:'3h'});
//         /**Set cookie with JWT */
//         console.log('Settin cookie')
//         /**Http only avoid cookie reading from script, only for
//          * http methods
//          */
//         res.cookie('JWT', token ,{
//             httpOnly: true
//         });
//         // res.status(200).header("authorization", token).json(token);

//         const userWithoutPassword = { username: user.username, role: user.role };
//         return res.json(userWithoutPassword);
//     }
// } 

// exports.logout = (req: Request, res: Response) => {
//     res.clearCookie('JWT');
//     res.status(200).send({message: 'logout from server'});
// } 