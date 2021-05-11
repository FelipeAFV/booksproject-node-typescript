
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Author } from "./Author";
import { Review } from "./Review";


@Entity("books")
export class Book {

    @PrimaryGeneratedColumn({name: "book_id"})
    id: number;

    @Column({name: "title"})
    title: string;

    @Column({name: "publisher"})
    publisher: string;

    @ManyToOne(type => Author, {eager: true})
    @JoinColumn({name: "author_id"})
    author: Author;

    @ManyToOne(type => Review, {eager: true})
    @JoinColumn({name: "review_id"})
    review: Author;


}