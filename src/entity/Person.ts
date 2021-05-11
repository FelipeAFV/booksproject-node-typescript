import { Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Person {
    @PrimaryGeneratedColumn()
    id: number;
}