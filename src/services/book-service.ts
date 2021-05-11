import { Book } from '../entity/Book';
import {CRUD} from './CRUD';
import {getRepository} from 'typeorm';
import { GenericService } from './generic-service';

class BookService extends GenericService<Book> {

    constructor() {
        super(Book);
    }

}

export default new BookService();