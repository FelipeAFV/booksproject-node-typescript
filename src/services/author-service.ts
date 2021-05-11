import { Author } from "../entity/Author";
import { CRUD } from "./CRUD";
import { EntityTarget, getRepository, ObjectType } from "typeorm";
import { GenericService } from "../services/generic-service";

class AuthorService extends GenericService<Author> {

    // entity: EntityTarget<Author> = Author;
    constructor() {
        super(Author);
    }


}

export default new AuthorService(); 