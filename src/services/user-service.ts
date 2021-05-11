import { User } from "../entity/User";
import { CRUD } from "./CRUD";
import { GenericService } from "./generic-service";

class UserService extends GenericService<User> {

    constructor() {
        super(User);
    }

}

export default new UserService();