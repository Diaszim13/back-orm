import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Photo } from "./Photo";

@Entity()
export class Peca {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    tipo!: string;

    @OneToMany(() => Photo, (photo) => photo.peca)
    photo!: Photo[];
}