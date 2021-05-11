import { DeleteResult, EntityTarget, getRepository, ObjectType } from "typeorm";
import { Author } from "../entity/Author";
import { User } from "../entity/User";
import { CRUD } from "./CRUD";

export class GenericService<T> implements CRUD<T>  {

    entity: EntityTarget<T>;

    constructor(entity: EntityTarget<T>) {
        this.entity = entity;
    }
    
    async getAll() {
        return getRepository(this.entity).find();
    }

    async getById( entityId: number) {
        return getRepository(this.entity).findOne(entityId);
    }

    async getByConditions(conditions: any) {
        return getRepository(this.entity).findOne(conditions);
    }

    async deleteById(entityId: number) {
        const deleteResult: DeleteResult = await getRepository(this.entity).delete(entityId);
        return Promise.resolve(deleteResult.affected);
    }

    async update(entityId: number, entity: T) {
        return getRepository(this.entity).update(entityId, entity);
    }

    async create(entity: T) {
        return getRepository(this.entity).save(entity);
    }
}