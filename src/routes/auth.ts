import { Router } from "express";
const router = Router();
import AuthController from '../controllers/auth-controller';



router.route('/login').post(AuthController.login);

router.route('/register').post(AuthController.register);

router.route('/logout').all(AuthController.logout);

export default router;