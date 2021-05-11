import { Request, Response, NextFunction } from "express";
import UserService from "../services/user-service";

class RoleAuthMiddleware {

    checkRole(userRoles: string[]) {
        return async (req: Request, res: Response, next: NextFunction) => {
            const userId = req.userInfo.userId;
            const user = await UserService.getById(userId);
    
            if (!user) res.status(401).json({message: 'Unauthorized user'});
           
                
            // const roleFound = userRoles.find((role) => {role === user.role });
            // console.log(roleFound);
            if (user && userRoles.includes(user.role)) {
                console.log('User authorized');
                next();
            } else {
                res.status(403).json({message: 'Role not sufficient'});
            }
            
        }
    }
}

// const checkRole = (userRoles: string[]) => {

//     return async (req: Request, res: Response, next: NextFunction) => {
//         const userId = req.userInfo.userId;
//         const user = await getRepository(User).findOne(userId);

//         if (!user) {
//             res.status(401).json({message: 'Unauthorized user'});
//         } else {
            
//             const roleFound = userRoles.find((role) => {role === user.role });
//             console.log(roleFound);
//             if (userRoles.includes(user.role)) {
//                 console.log('User authorized');
//                 next();
//             } else {
//                 res.status(403).json({message: 'Role not sufficient'});
//             }
//         }
//     }
// }

export default new RoleAuthMiddleware();