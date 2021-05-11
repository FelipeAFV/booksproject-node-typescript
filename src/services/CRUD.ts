export interface CRUD<T> {

    getAll: () => Promise<T[]>; 
    getById: (id:number) => Promise<T | undefined>;
    deleteById: (id:number) => Promise<any>;
    update: (id:number, entity:T) => Promise<any>;
    create: (entity:T) => Promise<T>;

}