import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Book } from "./Book";

@Entity("authors")
export class Author {

    @PrimaryGeneratedColumn({name: "author_id"})
    id: number;

    @Column({name: "first_name"})
    firstname: string;

    @Column({name: "last_name"})
    lastname: string;

    @Column({name: "birthdate"})
    birthdate: string;

    @Column({name: "nationality"})
    nationality: string;

    @OneToMany(type => Book, book => book.author)
    books: Book[];


}