import {Router} from 'express';
import userController from '../controllers/user-controller';
const router = Router();

router.route('/userData').get(userController.getUserData);

export default router;
