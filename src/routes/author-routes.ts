import {Router} from 'express';
import AuthorController from "../controllers/author-controller";

const router = Router();

router.route('/').get(AuthorController.getAllAuthors);

export default router;