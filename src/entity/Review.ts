import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Book } from "./Book";


@Entity("reviews")
export class Review {

    @PrimaryGeneratedColumn({name: 'review_id'})
    id: number;

    @Column({name: 'description'})
    description: string;

    @OneToOne( type => Book)
    @JoinColumn({name: 'book_id'})
    book: number;
}