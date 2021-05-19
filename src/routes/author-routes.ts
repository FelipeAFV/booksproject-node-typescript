import {Router} from 'express';
import AuthorController from "../controllers/author-controller";
import RoleAuthMiddleware  from "../middlewares/role-auth";

const router = Router();

router.route('/').get(AuthorController.getAllAuthors);
router.route('/').put(RoleAuthMiddleware.checkRole(['ADMIN']), AuthorController.createAuthor);
router.route('/:authorId').delete(RoleAuthMiddleware.checkRole(['ADMIN']), AuthorController.deleteAuthor);

export default router;