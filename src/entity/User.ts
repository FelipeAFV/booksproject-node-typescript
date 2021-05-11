import {Entity, PrimaryGeneratedColumn, Column, PrimaryColumn} from "typeorm";

@Entity("users")
export class User {

    @PrimaryGeneratedColumn({ name: "user_id"})
    id?: number;

    @Column({ name: "username"})
    username: string ;

    @Column({name: "password"})
    password: string ;

    @Column({name: "role"})
    role: string ;

}