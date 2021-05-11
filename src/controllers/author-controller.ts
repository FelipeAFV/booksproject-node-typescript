import { Request, Response } from "express";
import { getRepository} from 'typeorm';
import { Author } from "../entity/Author";
import AuthorService from "../services/author-service";

export class AuthorController {

    async getAllAuthors(req: Request, res: Response) {
        const authors = await AuthorService.getAll();
        res.status(200).json(authors);
    }
}

export default new AuthorController();