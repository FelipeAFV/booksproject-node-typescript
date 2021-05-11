
import { Router } from "express";
const router = Router();

import BookController from "../controllers/book-controller";

import RoleAuthMiddleware  from "../middlewares/role-auth";

router.route('/').get(BookController.getBooks);

router.route('/').post(BookController.createBook);

router.route('/:bookId').get(BookController.getBookById);
 
router.route('/:bookId').delete(RoleAuthMiddleware.checkRole(['ADMIN']), BookController.deleteBookById);

router.route('/').put(RoleAuthMiddleware.checkRole(['ADMIN']), BookController.updateBook);



export default router;