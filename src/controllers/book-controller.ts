import { Request, Response } from "express";
import { Book } from "../entity/Book";

import BookService from "../services/book-service";
import { CRUD } from "../services/CRUD";

class BookController { 

    async getBooks(req:Request, res:Response)  {
        console.log(`User ${req.username} requesting data...`);
        const books = await BookService.getAll();
        console.log(books);
        res.status(200).send(books);
    }

    async getBookById(req: Request, res: Response) {
        const bookId: number = Number.parseInt(req.params.bookId);
        const book = await BookService.getById(bookId);
        res.status(200).send(book);
    }  
    
    async deleteBookById(req: Request, res: Response) {
        const bookId: number = Number.parseInt(req.params.bookId);
        const rowsAffected = await BookService.deleteById(bookId);
        res.status(200).json({message: `Rows affected ${rowsAffected}`});
    }

    async updateBook(req: Request, res: Response) {
        const book: Book = req.body;
        const bookUpdated = await BookService.update(book.id, book);
        res.status(200).json(bookUpdated);
    }

    async createBook(req: Request, res: Response) {
        const book: Book = req.body;
        const bookSaved: Book = await BookService.create(book);
        res.status(200).json(bookSaved);

    }
}

export default new BookController();

// exports.findAll = async (req: MyRequest, res: Response) => {
//     console.log(`User ${req.username} requesting data...`);
//     const books = await getRepository(Book).find();
//     console.log(books);
//     res.status(200).send(books);
// }

// exports.findOneById = async (req: Request, res: Response) => {

//     const bookId = req.params.bookId;
//     const book = await getRepository(Book).findOne(bookId);
//     res.status(200).send(book);
// }

// exports.update = async (req: Request, res: Response) => {
//     const {id, title, publisher} = req.body;
//     // const user = await Book.update({title: title, publisher: publisher},
//     //     {where: {id: id}});
//     // res.status(200).json(user);
// }


// exports.deleteById = async (req: Request, res: Response) => {
//     // const bookId = req.params.bookId;
//     // Book.destroy({where: {id: bookId}})
//     //     .then( (data: any) => {
//     //         /**Here data is a number, true or false, depending if the 
//     //          * book is delete or not exist, the data will be either
//     //          * 1 or 0
//     //          */
//     //         if (data) {
//     //             return res.status(200).send({message: `Book deleted successfully ${data}`});
//     //         } else {
//     //             return res.status(200).send({message: `Book with id ${bookId} not exist ${data}`});

//     //         }
//     //     }
//     //     )
//     //     .catch( (err: any) => {
//     //         console.log(err);
//     //         console.log(err.message);
//     //         return res.status(500).send({message: `Error deleting book ${err.message}`});
//     //     }
//     //     );
// }