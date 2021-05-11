import { createConnection, getConnectionOptions} from "typeorm";
import { User } from "./entity/User";


createConnection().then(async (conn) => {
    console.log('Connection successful');
    const userRepo = conn.getRepository(User);
    const user = await  userRepo.createQueryBuilder().getMany();
    console.log(user);
    await conn.close();
}).catch((err) => {
    console.log('Connection error');
    console.log(err);
});