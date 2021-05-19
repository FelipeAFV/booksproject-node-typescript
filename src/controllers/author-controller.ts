import { Request, Response } from "express";
import { getRepository} from 'typeorm';
import { Author } from "../entity/Author";
import authorService from "../services/author-service";
import AuthorService from "../services/author-service";

export class AuthorController {

    async getAllAuthors(req: Request, res: Response) {
        const authors = await AuthorService.getAll();
        res.status(200).json(authors);
    }

    async createAuthor(req: Request, res: Response) {
        const author = await authorService.create(req.body);
        res.status(200).json({message: 'success', authorCreated: author});
    }

    async deleteAuthor(req: Request, res: Response) {
        const rowsAffected = await authorService.deleteById(Number.parseInt(req.params.authorId));
        res.status(200).json({message: 'delete executed', rowsAffected: rowsAffected});
    }
}

export default new AuthorController();